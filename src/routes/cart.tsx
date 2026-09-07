import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { useCart } from "@/lib/cart";
import { formatToman, toFa } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید | الون استایل" },
      { name: "description", content: "سبد خرید شما در فروشگاه الون استایل." },
      { property: "og:title", content: "سبد خرید | الون استایل" },
      { property: "og:description", content: "سبد خرید فروشگاه الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal, discount, total } = useCart();

  return (
    <div className="container-site">
      <Breadcrumbs items={[{ label: "سبد خرید" }]} />
      <h1 className="text-xl font-black text-ink">سبد خرید</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">سبد خرید شما در حال حاضر خالی است.</p>
          <Link to="/shop" className="bg-brand px-6 py-2.5 text-sm font-bold text-white">
            بازگشت به فروشگاه
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <ul className="divide-y divide-border border-y border-border">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  <img
                    src={l.product.images[0]}
                    alt={l.product.name}
                    loading="lazy"
                    className="h-28 w-24 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/product/$slug"
                      params={{ slug: l.product.slug }}
                      className="line-clamp-2 text-[13px] font-medium"
                    >
                      {l.product.name}
                    </Link>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                      سایز {l.size} / رنگ {l.color}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-input">
                        <button
                          onClick={() => setQty(l.key, l.qty - 1)}
                          className="px-2.5 py-1.5"
                          aria-label="کاهش"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-[13px]">{toFa(l.qty)}</span>
                        <button
                          onClick={() => setQty(l.key, l.qty + 1)}
                          className="px-2.5 py-1.5"
                          aria-label="افزایش"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.key)}
                        className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-brand"
                      >
                        <Trash2 className="h-4 w-4" /> حذف
                      </button>
                    </div>
                  </div>
                  <span className="shrink-0 self-center text-[13px] font-bold">
                    {formatToman(l.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit border border-border p-5">
            <h2 className="mb-4 text-sm font-bold">جمع کل سبد خرید</h2>
            <dl className="space-y-3 text-[13px]">
              <div className="flex justify-between">
                <dt>جمع محصولات</dt>
                <dd>{formatToman(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-brand">
                <dt>تخفیف</dt>
                <dd>{formatToman(discount)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-bold">
                <dt>مبلغ قابل پرداخت</dt>
                <dd>{formatToman(total)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              className="mt-5 block bg-brand py-3 text-center text-sm font-bold text-white"
            >
              ادامه جهت تسویه حساب
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
