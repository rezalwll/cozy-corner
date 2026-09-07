import { Link } from "@tanstack/react-router";
import { getCategory, type Product } from "@/data/products";
import { formatToman } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.salePrice != null;
  const outOfStock = product.stock === 0;

  return (
    <article className="group flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {onSale && !outOfStock && (
          <span className="absolute top-2 right-2 bg-brand px-2 py-1 text-[11px] font-bold text-white">
            تخفیف
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-2 text-center text-[12px] font-bold text-white">
            ناموجود
          </span>
        )}
      </Link>

      <div className="pt-3 text-center">
        <p className="text-[11px] text-muted-foreground">
          {getCategory(product.category)?.name}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[13px] font-medium text-ink">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-center gap-2">
          {onSale && (
            <span className="text-[12px] text-muted-foreground line-through">
              {formatToman(product.price)}
            </span>
          )}
          <span className="text-[13px] font-bold text-ink">
            {formatToman(product.salePrice ?? product.price)}
          </span>
        </div>
        {product.colors.length > 1 && (
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3.5 w-3.5 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
