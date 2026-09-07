import { Link } from "@tanstack/react-router";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="الون استایل">
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-sm text-[15px] font-black tracking-tight ${
          variant === "light" ? "bg-white text-ink" : "bg-ink text-white"
        }`}
      >
        11
      </span>
      <span
        className={`text-xl font-black tracking-[0.18em] ${
          variant === "light" ? "text-white" : "text-ink"
        }`}
      >
        ELEVEN
      </span>
    </Link>
  );
}
