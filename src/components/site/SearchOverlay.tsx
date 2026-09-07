import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { formatToman } from "@/lib/format";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  if (!open) return null;

  const results = term.trim()
    ? products.filter((p) => p.name.includes(term.trim())).slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="bg-background px-4 py-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container-site">
          <form
            className="flex items-center gap-2 border-b border-input pb-3"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
              navigate({ to: "/search", search: { q: term } });
            }}
          >
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="جستجوی محصولات..."
              className="min-w-0 flex-1 bg-transparent text-base outline-none"
            />
            <button type="button" onClick={onClose} aria-label="بستن جستجو">
              <X className="h-5 w-5 shrink-0 text-muted-foreground" />
            </button>
          </form>

          <div className="mt-4">
            {term.trim() && results.length === 0 && (
              <p className="py-6 text-center text-muted-foreground">
                محصولی با این عنوان پیدا نشد.
              </p>
            )}
            <ul className="divide-y divide-border">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    onClick={onClose}
                    className="flex items-center gap-3 py-3 hover:bg-muted"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="h-16 w-14 shrink-0 object-cover"
                    />
                    <span className="min-w-0 flex-1 truncate">{p.name}</span>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {formatToman(p.salePrice ?? p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
