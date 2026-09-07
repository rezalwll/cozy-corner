import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 py-4 text-[12px] text-muted-foreground">
      <Link to="/" className="hover:text-brand">
        خانه
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-ink">{item.label}</span>
        </span>
      ))}
    </nav>
  );
}
