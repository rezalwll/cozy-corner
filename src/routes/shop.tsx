import { createFileRoute } from "@tanstack/react-router";
import { ShopTemplate } from "@/components/shop/ShopTemplate";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "فروشگاه | الون استایل" },
      { name: "description", content: "همه محصولات پوشاک مردانه الون استایل در یک صفحه." },
      { property: "og:title", content: "فروشگاه | الون استایل" },
      { property: "og:description", content: "همه محصولات پوشاک مردانه الون استایل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ShopTemplate
      title="فروشگاه"
      description="همه محصولات پوشاک مردانه الون استایل."
      products={products}
      crumbs={[{ label: "فروشگاه" }]}
    />
  ),
});
