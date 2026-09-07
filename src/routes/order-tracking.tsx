import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { toFa } from "@/lib/format";

export const Route = createFileRoute("/order-tracking")({
  head: () => ({
    meta: [
      { title: "پیگیری سفارش | الون استایل" },
      { name: "description", content: "وضعیت سفارش خود را با کد پیگیری مشاهده کنید." },
      { property: "og:title", content: "پیگیری سفارش | الون استایل" },
      { property: "og:description", content: "پیگیری وضعیت سفارش در الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "found" | "error">("idle");

  return (
    <div className="container-site">
      <Breadcrumbs items={[{ label: "پیگیری سفارش" }]} />
      <h1 className="text-xl font-black text-ink">پیگیری سفارش</h1>
      <p className="mt-3 max-w-xl text-[13px] leading-7 text-muted-foreground">
        برای پیگیری سفارش، کد پیگیری و شماره موبایل ثبت‌شده هنگام خرید را وارد کنید. کد
        پیگیری در پیامک تأیید سفارش برای شما ارسال شده است.
      </p>

      <form
        className="mt-6 max-w-md space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setStatus(code.trim() === "EL-10248" ? "found" : "error");
        }}
      >
        <input
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="کد پیگیری، مثال: EL-10248"
          className="w-full border border-input px-3 py-2.5 text-[13px] outline-none focus:border-ink"
        />
        <input
          required
          placeholder="شماره موبایل"
          className="w-full border border-input px-3 py-2.5 text-[13px] outline-none focus:border-ink"
        />
        <button className="bg-brand px-6 py-2.5 text-sm font-bold text-white">
          پیگیری سفارش
        </button>
      </form>

      {status === "found" && (
        <div className="mt-6 max-w-md border border-border p-4 text-[13px]">
          <p className="font-bold text-ink">سفارش {toFa("EL-10248")}</p>
          <p className="mt-2 text-muted-foreground">وضعیت: ارسال شده با پست پیشتاز</p>
          <p className="mt-1 text-muted-foreground">تاریخ ثبت: {toFa("1404/06/12")}</p>
        </div>
      )}
      {status === "error" && (
        <p className="mt-6 text-[13px] text-brand">سفارشی با این مشخصات پیدا نشد.</p>
      )}
    </div>
  );
}
