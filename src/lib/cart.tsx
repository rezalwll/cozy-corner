import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export interface CartLine {
  productId: number;
  size: string;
  color: string;
  qty: number;
}

export interface CartLineView extends CartLine {
  product: Product;
  unitPrice: number;
  lineTotal: number;
  key: string;
}

interface CartContextValue {
  lines: CartLineView[];
  count: number;
  subtotal: number;
  discount: number;
  total: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (line: CartLine) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "eleven-cart";

const lineKey = (l: CartLine) => `${l.productId}-${l.size}-${l.color}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setRaw(JSON.parse(stored) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* ignore */
    }
  }, [raw]);

  const add = useCallback((line: CartLine) => {
    setRaw((prev) => {
      const idx = prev.findIndex((l) => lineKey(l) === lineKey(line));
      if (idx === -1) return [...prev, line];
      const next = [...prev];
      next[idx] = { ...prev[idx]!, qty: prev[idx]!.qty + line.qty };
      return next;
    });
    setOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setRaw((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setRaw((prev) =>
      prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.max(1, qty) } : l)),
    );
  }, []);

  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLineView[] = raw.flatMap((l) => {
      const product = products.find((p) => p.id === l.productId);
      if (!product) return [];
      const unitPrice = product.salePrice ?? product.price;
      return [
        {
          ...l,
          product,
          unitPrice,
          lineTotal: unitPrice * l.qty,
          key: lineKey(l),
        },
      ];
    });
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const total = lines.reduce((s, l) => s + l.lineTotal, 0);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      discount: subtotal - total,
      total,
      isOpen,
      setOpen,
      add,
      remove,
      setQty,
      clear,
    };
  }, [raw, isOpen, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
