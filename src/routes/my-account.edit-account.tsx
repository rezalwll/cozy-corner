import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/my-account/edit-account")({
  head: () => ({
    meta: [
      { title: "جزئیات حساب | الون استایل" },
      { name: "description", content: "ویرایش اطلاعات حساب کاربری در الون استایل." },
      { property: "og:title", content: "جزئیات حساب | الون استایل" },
      { property: "og:description", content: "ویرایش اطلاعات حساب کاربری الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditAccountPage,
});

const fieldClass =
  "w-full border border-input px-3 py-2.5 text-[13px] outline-none focus:border-ink";

function EditAccountPage() {
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="max-w-md space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input defaultValue="محمدرضا" placeholder="نام" className={fieldClass} />
        <input defaultValue="احمدی" placeholder="نام خانوادگی" className={fieldClass} />
      </div>
      <input defaultValue="09120000000" placeholder="شماره موبایل" className={fieldClass} />
      <input type="email" placeholder="ایمیل" className={fieldClass} />
      <input type="password" placeholder="رمز عبور جدید" className={fieldClass} />
      <button className="bg-brand px-6 py-2.5 text-sm font-bold text-white">
        ذخیره تغییرات
      </button>
      {saved && <p className="text-[12px] text-ink">تغییرات با موفقیت ذخیره شد.</p>}
    </form>
  );
}
