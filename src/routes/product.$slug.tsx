import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Ruler } from "lucide-react";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategory, getProduct, productsByCategory } from "@/data/products";
import { formatToman, toFa } from "@/lib/format";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "محصول یافت نشد | الون استایل" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.product.name} | الون استایل`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.product.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [image, setImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "spec" | "reviews">("desc");
  const [error, setError] = useState("");

  const outOfStock = product.stock === 0;
  const related = productsByCategory(product.category).filter((p) => p.id !== product.id);

  const tabClass = (active: boolean) =>
    `px-4 py-3 text-[13px] font-medium ${
      active ? "border-b-2 border-brand text-ink" : "text-muted-foreground"
    }`;

  return (
    <div className="container-site">
      <Breadcrumbs
        items={[
          { label: getCategory(product.category)?.name ?? "" },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="bg-muted">
            <img
              src={product.images[image]}
              alt={product.name}
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setImage(i)}
                className={`w-20 border ${i === image ? "border-ink" : "border-border"}`}
              >
                <img src={img} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-lg font-black text-ink sm:text-xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            {product.salePrice && (
              <span className="text-[13px] text-muted-foreground line-through">
                {formatToman(product.price)}
              </span>
            )}
            <span className="text-xl font-black text-brand">
              {formatToman(product.salePrice ?? product.price)}
            </span>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-[13px] font-bold">رنگ: {color}</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  className={`h-8 w-8 rounded-full border-2 ${
                    color === c.name ? "border-ink" : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold">سایز</p>
              <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                <Ruler className="h-4 w-4" /> راهنمای سایز
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  disabled={outOfStock}
                  onClick={() => {
                    setSize(s);
                    setError("");
                  }}
                  className={`min-w-12 border px-3 py-2 text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    size === s ? "border-ink bg-ink text-white" : "border-input hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-input">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2"
                aria-label="کاهش تعداد"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 text-center text-[13px]">{toFa(qty)}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2"
                aria-label="افزایش تعداد"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              disabled={outOfStock}
              onClick={() => {
                if (!size) {
                  setError("لطفاً سایز مورد نظر را انتخاب کنید.");
                  return;
                }
                add({ productId: product.id, size, color, qty });
              }}
              className="flex-1 bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            </button>
          </div>
          {error && <p className="mt-2 text-[12px] text-brand">{error}</p>}

          <dl className="mt-6 space-y-1.5 border-t border-border pt-5 text-[12px] text-muted-foreground">
            <div className="flex gap-2">
              <dt>دسته‌بندی:</dt>
              <dd className="text-ink">{getCategory(product.category)?.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt>موجودی:</dt>
              <dd className="text-ink">
                {outOfStock ? "ناموجود" : `${toFa(product.stock)} عدد`}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex border-b border-border">
          <button className={tabClass(tab === "desc")} onClick={() => setTab("desc")}>
            توضیحات
          </button>
          <button className={tabClass(tab === "spec")} onClick={() => setTab("spec")}>
            مشخصات
          </button>
          <button className={tabClass(tab === "reviews")} onClick={() => setTab("reviews")}>
            دیدگاه‌ها
          </button>
        </div>

        <div className="py-6 text-[13px] leading-8 text-muted-foreground">
          {tab === "desc" && <p>{product.description}</p>}
          {tab === "spec" && (
            <ul className="max-w-lg divide-y divide-border">
              {product.specifications.map((s) => (
                <li key={s.label} className="flex justify-between py-2.5">
                  <span>{s.label}</span>
                  <span className="text-ink">{s.value}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === "reviews" && (
            <div className="max-w-lg">
              <p>هنوز دیدگاهی برای این محصول ثبت نشده است.</p>
              <form
                className="mt-5 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <input
                  required
                  placeholder="نام شما"
                  className="w-full border border-input px-3 py-2.5 text-[13px] outline-none focus:border-ink"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="دیدگاه شما"
                  className="w-full border border-input px-3 py-2.5 text-[13px] outline-none focus:border-ink"
                />
                <button className="bg-ink px-6 py-2.5 text-[13px] font-bold text-white">
                  ثبت دیدگاه
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-base font-black text-ink">محصولات مشابه</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
