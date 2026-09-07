import { Link } from "@tanstack/react-router";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatToman } from "@/lib/format";

export function MiniCart() {
  const { isOpen, setOpen, lines, total } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" onClick={() => setOpen(false)}>
      <div className="flex-1 bg-black/50" />
      <aside
        className="flex h-full w-[86vw] max-w-sm flex-col bg-background shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="text-base font-bold">سبد خرید</h2>
          <button onClick={() => setOpen(false)} aria-label="بستن سبد خرید">
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="bg-brand px-5 py-2 text-sm font-bold text-white"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-4">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3 py-3">
                  <img
                    src={l.product.images[0]}
                    alt={l.product.name}
                    loading="lazy"
                    className="h-20 w-16 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{l.product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {l.size} / {l.color} × {l.qty}
                    </p>
                    <p className="mt-1 text-sm font-bold">{formatToman(l.lineTotal)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="border-t border-border px-4 py-4">
              <div className="mb-3 flex items-center justify-between text-sm font-bold">
                <span>جمع کل</span>
                <span>{formatToman(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="border border-ink py-2 text-center text-sm font-bold"
                >
                  سبد خرید
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="bg-brand py-2 text-center text-sm font-bold text-white"
                >
                  تسویه حساب
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
