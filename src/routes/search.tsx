import { createFileRoute } from "@tanstack/react-router";
import { ShopTemplate } from "@/components/shop/ShopTemplate";
import { products } from "@/data/products";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  head: () => ({
    meta: [
      { title: "جستجو | الون استایل" },
      { name: "description", content: "جستجو در محصولات پوشاک مردانه الون استایل." },
      { property: "og:title", content: "جستجو | الون استایل" },
      { property: "og:description", content: "جستجو در محصولات الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = q ? products.filter((p) => p.name.includes(q)) : [];

  return (
    <ShopTemplate
      title={q ? `نتایج جستجو برای «${q}»` : "جستجو"}
      description={results.length === 0 ? "محصولی مطابق با جستجوی شما پیدا نشد." : ""}
      products={results}
      crumbs={[{ label: "جستجو" }]}
    />
  );
}
