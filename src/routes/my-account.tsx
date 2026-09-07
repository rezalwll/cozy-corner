import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";

export const Route = createFileRoute("/my-account")({
  component: AccountLayout,
});

const items = [
  { to: "/my-account", label: "پیشخوان", exact: true },
  { to: "/my-account/orders", label: "سفارش‌ها" },
  { to: "/my-account/addresses", label: "آدرس‌ها" },
  { to: "/my-account/edit-account", label: "جزئیات حساب" },
] as const;

function AccountLayout() {
  return (
    <div className="container-site">
      <Breadcrumbs items={[{ label: "حساب کاربری" }]} />
      <h1 className="text-xl font-black text-ink">حساب کاربری</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside>
          <nav className="flex flex-wrap gap-2 border border-border p-2 lg:flex-col lg:gap-0 lg:p-0">
            {items.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                activeOptions={{ exact: "exact" in i }}
                activeProps={{ className: "bg-ink text-white" }}
                className="px-4 py-2.5 text-[13px] lg:border-b lg:border-border"
              >
                {i.label}
              </Link>
            ))}
            <button className="px-4 py-2.5 text-right text-[13px] text-brand">
              خروج از حساب
            </button>
          </nav>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
