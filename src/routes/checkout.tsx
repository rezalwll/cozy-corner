import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { useCart } from "@/lib/cart";
import { formatToman, toFa } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "تسویه حساب | الون استایل" },
      { name: "description", content: "تکمیل اطلاعات و ثبت سفارش در فروشگاه الون استایل." },
      { property: "og:title", content: "تسویه حساب | الون استایل" },
      { property: "og:description", content: "ثبت سفارش در فروشگاه الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const fieldClass =
  "w-full border border-input px-3 py-2.5 text-[13px] outline-none focus:border-ink";

function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-xl font-black text-ink">سفارش شما ثبت شد</h1>
        <p className="mt-3 text-[13px] text-muted-foreground">
          کد پیگیری سفارش: {toFa("EL-10248")}
        </p>
        <Link to="/shop" className="mt-6 inline-block bg-brand px-6 py-2.5 text-sm font-bold text-white">
          ادامه خرید
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site">
      <Breadcrumbs items={[{ label: "تسویه حساب" }]} />
      <h1 className="text-xl font-black text-ink">تسویه حساب</h1>

      {lines.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          برای تکمیل خرید ابتدا محصولی به سبد خرید اضافه کنید.
        </p>
      ) : (
        <form
          className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]"
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            setDone(true);
          }}
        >
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-sm font-bold">اطلاعات صورتحساب</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required placeholder="نام" className={fieldClass} />
                <input required placeholder="نام خانوادگی" className={fieldClass} />
                <input required placeholder="شماره موبایل" className={fieldClass} />
                <input type="email" placeholder="ایمیل (اختیاری)" className={fieldClass} />
                <input required placeholder="استان" className={fieldClass} />
                <input required placeholder="شهر" className={fieldClass} />
                <input required placeholder="کد پستی" className={fieldClass} />
                <input required placeholder="نشانی کامل" className={`${fieldClass} sm:col-span-2`} />
                <textarea rows={3} placeholder="توضیحات سفارش" className={`${fieldClass} sm:col-span-2`} />
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold">روش پرداخت</h2>
              <label className="flex items-center gap-2 border border-input px-3 py-3 text-[13px]">
                <input type="radio" name="pay" defaultChecked className="accent-[var(--brand)]" />
                پرداخت اینترنتی از طریق درگاه بانکی
              </label>
            </section>
          </div>

          <aside className="h-fit border border-border p-5">
            <h2 className="mb-4 text-sm font-bold">سفارش شما</h2>
            <ul className="divide-y divide-border text-[13px]">
              {lines.map((l) => (
                <li key={l.key} className="flex justify-between gap-2 py-2.5">
                  <span className="min-w-0 truncate">
                    {l.product.name} × {toFa(l.qty)}
                  </span>
                  <span className="shrink-0">{formatToman(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-[13px] font-bold">
              <span>مبلغ قابل پرداخت</span>
              <span>{formatToman(total)}</span>
            </div>
            <button className="mt-5 w-full bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
              ثبت سفارش
            </button>
          </aside>
        </form>
      )}
    </div>
  );
}
