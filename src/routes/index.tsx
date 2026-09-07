import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { categories, newestProducts, productsByCategory } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الون استایل | فروشگاه پوشاک مردانه" },
      {
        name: "description",
        content:
          "خرید آنلاین پیراهن، شلوار، تیشرت، کفش و اکسسوری مردانه از فروشگاه الون استایل با ارسال سریع.",
      },
      { property: "og:title", content: "الون استایل | فروشگاه پوشاک مردانه" },
      {
        property: "og:description",
        content: "کالکشن جدید پوشاک مردانه الون استایل؛ کیفیت، قیمت منصفانه و ارسال سریع.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryGrid />

      <ProductSection
        title="جدیدترین‌ها"
        subtitle="نوترین انتخاب‌ها، مخصوص شما"
        products={newestProducts(4)}
      />

      {categories.slice(0, 5).map((c) => (
        <ProductSection
          key={c.slug}
          title={c.name}
          subtitle={c.description}
          products={productsByCategory(c.slug)}
          href={c.slug}
          bannerImage={c.image}
        />
      ))}
    </>
  );
}
