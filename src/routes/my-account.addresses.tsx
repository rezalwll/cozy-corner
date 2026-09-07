import { createFileRoute } from "@tanstack/react-router";
import { toFa } from "@/lib/format";

export const Route = createFileRoute("/my-account/addresses")({
  head: () => ({
    meta: [
      { title: "آدرس‌های من | الون استایل" },
      { name: "description", content: "مدیریت آدرس‌های ارسال سفارش در الون استایل." },
      { property: "og:title", content: "آدرس‌های من | الون استایل" },
      { property: "og:description", content: "مدیریت آدرس‌های ارسال در الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AddressesPage,
});

function AddressesPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[
        { title: "آدرس صورتحساب", body: "تهران، خیابان ولیعصر، کوچه ۱۲، پلاک ۴" },
        { title: "آدرس ارسال", body: "کرج، بلوار طالقانی، پلاک ۲۱، واحد ۳" },
      ].map((a) => (
        <div key={a.title} className="border border-border p-5 text-[13px] leading-7">
          <h2 className="mb-2 font-bold">{a.title}</h2>
          <p className="text-muted-foreground">{toFa(a.body)}</p>
          <button className="mt-4 border border-ink px-4 py-1.5 text-[12px] font-bold">
            ویرایش
          </button>
        </div>
      ))}
    </div>
  );
}
