import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShopTemplate } from "@/components/shop/ShopTemplate";
import { getCategory, productsByCategory } from "@/data/products";

export const Route = createFileRoute("/product-category/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "دسته‌بندی یافت نشد | الون استایل" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.name} | الون استایل`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <ShopTemplate
      title={category.name}
      description={category.description}
      products={productsByCategory(category.slug)}
      crumbs={[{ label: "فروشگاه" }, { label: category.name }]}
    />
  );
}
