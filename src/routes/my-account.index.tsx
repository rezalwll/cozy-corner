import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/my-account/")({
  head: () => ({
    meta: [
      { title: "حساب کاربری | الون استایل" },
      { name: "description", content: "ورود و مدیریت حساب کاربری در فروشگاه الون استایل." },
      { property: "og:title", content: "حساب کاربری | الون استایل" },
      { property: "og:description", content: "ورود و ثبت‌نام در فروشگاه الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountDashboard,
});

const fieldClass =
  "w-full border border-input px-3 py-2.5 text-[13px] outline-none focus:border-ink";

function AccountDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  if (loggedIn) {
    return (
      <div className="text-[13px] leading-8">
        <p>
          سلام <span className="font-bold">محمدرضا</span> عزیز، به پیشخوان حساب کاربری خوش
          آمدید.
        </p>
        <p className="mt-2 text-muted-foreground">
          از این بخش می‌توانید سفارش‌ها، آدرس‌ها و اطلاعات حساب خود را مدیریت کنید.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/my-account/orders" className="border border-ink px-5 py-2 font-bold">
            سفارش‌های من
          </Link>
          <button onClick={() => setLoggedIn(false)} className="px-5 py-2 text-brand">
            خروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <div className="mb-5 flex gap-6 border-b border-border">
        <button
          onClick={() => setMode("login")}
          className={`pb-3 text-[13px] font-bold ${
            mode === "login" ? "border-b-2 border-brand text-ink" : "text-muted-foreground"
          }`}
        >
          ورود
        </button>
        <button
          onClick={() => setMode("register")}
          className={`pb-3 text-[13px] font-bold ${
            mode === "register" ? "border-b-2 border-brand text-ink" : "text-muted-foreground"
          }`}
        >
          ثبت‌نام
        </button>
      </div>

      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setLoggedIn(true);
        }}
      >
        <input required placeholder="شماره موبایل یا ایمیل" className={fieldClass} />
        <input required type="password" placeholder="رمز عبور" className={fieldClass} />
        {mode === "register" && (
          <input required type="password" placeholder="تکرار رمز عبور" className={fieldClass} />
        )}
        <button className="w-full bg-brand py-2.5 text-sm font-bold text-white">
          {mode === "login" ? "ورود" : "ثبت‌نام"}
        </button>
      </form>
    </div>
  );
}
