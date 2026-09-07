import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { toFa } from "@/lib/format";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-ink text-white/80">
      <div className="container-site grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-md text-[13px] leading-7">
            الون استایل، فروشگاه تخصصی پوشاک مردانه. تلاش ما ارائه محصولات باکیفیت با
            قیمت منصفانه و ارسال سریع به سراسر ایران است.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">دسته‌بندی‌ها</h3>
          <ul className="space-y-2.5 text-[13px]">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/product-category/$category"
                  params={{ category: c.slug }}
                  className="hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">دسترسی سریع</h3>
          <ul className="space-y-2.5 text-[13px]">
            <li>
              <Link to="/cart" className="hover:text-white">سبد خرید</Link>
            </li>
            <li>
              <Link to="/my-account" className="hover:text-white">حساب کاربری</Link>
            </li>
            <li>
              <Link to="/my-account/orders" className="hover:text-white">سفارش‌های من</Link>
            </li>
            <li>
              <Link to="/order-tracking" className="hover:text-white">پیگیری سفارش</Link>
            </li>
          </ul>
          <p className="mt-5 text-[13px] leading-7">
            تلفن: {toFa("021-88000000")}
            <br />
            نشانی: تهران، خیابان ولیعصر
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-[12px]">
        تمامی حقوق برای فروشگاه الون استایل محفوظ است. © {toFa(1404)}
      </div>
    </footer>
  );
}
