import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="container-site mt-6">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/product-category/$category"
            params={{ category: c.slug }}
            className="group block"
          >
            <div className="overflow-hidden bg-muted">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={800}
                height={1000}
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-center text-[12px] font-medium text-ink">{c.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
