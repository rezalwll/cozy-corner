import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/products";
import { useCart } from "@/lib/cart";
import { toFa } from "@/lib/format";
import { Logo } from "./Logo";
import { SearchOverlay } from "./SearchOverlay";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, setOpen } = useCart();

  const navLinkClass =
    "whitespace-nowrap py-2 text-[13px] font-medium text-ink transition-colors hover:text-brand";

  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="bg-ink py-2 text-center text-[11px] text-white/90">
        خرید آسان، ارسال سریع | فروشگاه پوشاک مردانه الون استایل
      </div>

      <div className="border-b border-border">
        <div className="container-site grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Logo />
          </div>

          <nav className="hidden items-center justify-center gap-6 lg:flex">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/product-category/$category"
                params={{ category: c.slug }}
                className={navLinkClass}
                activeProps={{ className: "text-brand" }}
              >
                {c.name}
              </Link>
            ))}
            <Link to="/shop" className={navLinkClass}>
              همه محصولات
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} aria-label="جستجو">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/my-account" aria-label="حساب کاربری" className="hidden sm:block">
              <User className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="سبد خرید"
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-2 -left-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                  {toFa(count)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenuOpen(false)}>
          <aside
            className="flex h-full w-[80vw] max-w-xs flex-col bg-background shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Logo />
              <button onClick={() => setMenuOpen(false)} aria-label="بستن منو">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col divide-y divide-border">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/product-category/$category"
                  params={{ category: c.slug }}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3.5 text-sm font-medium"
                >
                  {c.name}
                </Link>
              ))}
              <Link to="/shop" onClick={() => setMenuOpen(false)} className="px-4 py-3.5 text-sm font-medium">
                همه محصولات
              </Link>
              <Link to="/my-account" onClick={() => setMenuOpen(false)} className="px-4 py-3.5 text-sm font-medium">
                حساب کاربری
              </Link>
              <Link to="/order-tracking" onClick={() => setMenuOpen(false)} className="px-4 py-3.5 text-sm font-medium">
                پیگیری سفارش
              </Link>
            </nav>
          </aside>
          <div className="flex-1 bg-black/50" />
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
