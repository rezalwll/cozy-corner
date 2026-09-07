import { createFileRoute } from "@tanstack/react-router";
import { formatToman, toFa } from "@/lib/format";

export const Route = createFileRoute("/my-account/orders")({
  head: () => ({
    meta: [
      { title: "سفارش‌های من | الون استایل" },
      { name: "description", content: "لیست سفارش‌های ثبت‌شده در فروشگاه الون استایل." },
      { property: "og:title", content: "سفارش‌های من | الون استایل" },
      { property: "og:description", content: "پیگیری سفارش‌های ثبت‌شده در الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrdersPage,
});

const orders = [
  { id: "EL-10248", date: "1404/06/12", status: "ارسال شده", total: 2_680_000 },
  { id: "EL-10122", date: "1404/05/28", status: "تحویل شده", total: 1_490_000 },
  { id: "EL-10077", date: "1404/05/03", status: "لغو شده", total: 690_000 },
];

function OrdersPage() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border border-border text-[13px]">
        <thead className="bg-muted text-right">
          <tr>
            <th className="p-3 font-bold">شماره سفارش</th>
            <th className="p-3 font-bold">تاریخ</th>
            <th className="p-3 font-bold">وضعیت</th>
            <th className="p-3 font-bold">مبلغ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <td className="p-3">{toFa(o.id)}</td>
              <td className="p-3">{toFa(o.date)}</td>
              <td className="p-3">{o.status}</td>
              <td className="p-3">{formatToman(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
