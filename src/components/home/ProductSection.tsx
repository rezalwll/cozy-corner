import { Link } from "@tanstack/react-router";
import type { CategorySlug, Product } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

interface Props {
  title: string;
  subtitle?: string;
  products: Product[];
  href?: CategorySlug;
  bannerImage?: string;
}

export function ProductSection({ title, subtitle, products, href, bannerImage }: Props) {
  return (
    <section className="container-site mt-12">
      <div className="relative flex items-center justify-center overflow-hidden bg-ink px-4 py-6">
        {bannerImage && (
          <img
            src={bannerImage}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-y-0 right-0 h-full w-24 object-cover opacity-40 sm:w-40"
          />
        )}
        <div className="relative text-center">
          <h2 className="text-lg font-black text-white sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-[12px] text-white/70">{subtitle}</p>}
          {href && (
            <Link
              to="/product-category/$category"
              params={{ category: href }}
              className="mt-3 inline-block bg-brand px-4 py-1.5 text-[11px] font-bold text-white"
            >
              مشاهده محصولات
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
