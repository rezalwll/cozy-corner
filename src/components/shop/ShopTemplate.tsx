import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { allColors, allSizes, maxPrice, type Product } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { formatToman, toFa } from "@/lib/format";

type Sort = "default" | "newest" | "price-asc" | "price-desc";

const PAGE_SIZE = 8;

interface Props {
  title: string;
  description?: string;
  products: Product[];
  crumbs: Crumb[];
}

export function ShopTemplate({ title, description, products, crumbs }: Props) {
  const [sort, setSort] = useState<Sort>("default");
  const [price, setPrice] = useState(maxPrice);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [onlySale, setOnlySale] = useState(false);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const filtered = useMemo(() => {
    let list = products.filter((p) => (p.salePrice ?? p.price) <= price);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (colors.length)
      list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    if (onlySale) list = list.filter((p) => p.salePrice != null);

    const priceOf = (p: Product) => p.salePrice ?? p.price;
    if (sort === "price-asc") list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "price-desc") list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
    if (sort === "newest")
      list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [products, price, sizes, colors, onlySale, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const filters = (
    <div className="space-y-7">
      <section>
        <h3 className="mb-3 text-[13px] font-bold text-ink">فیلتر قیمت</h3>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={100_000}
          value={price}
          onChange={(e) => {
            setPrice(Number(e.target.value));
            setPage(1);
          }}
          className="w-full accent-[var(--brand)]"
        />
        <p className="mt-2 text-[12px] text-muted-foreground">تا {formatToman(price)}</p>
      </section>

      <section>
        <h3 className="mb-3 text-[13px] font-bold text-ink">سایز</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSizes((prev) => toggle(prev, s));
                setPage(1);
              }}
              className={`min-w-10 border px-2.5 py-1.5 text-[12px] transition-colors ${
                sizes.includes(s)
                  ? "border-ink bg-ink text-white"
                  : "border-input text-ink hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[13px] font-bold text-ink">رنگ</h3>
        <ul className="space-y-2">
          {allColors.map((c) => (
            <li key={c.name}>
              <label className="flex cursor-pointer items-center gap-2 text-[12px]">
                <input
                  type="checkbox"
                  checked={colors.includes(c.name)}
                  onChange={() => {
                    setColors((prev) => toggle(prev, c.name));
                    setPage(1);
                  }}
                  className="accent-[var(--brand)]"
                />
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <label className="flex cursor-pointer items-center gap-2 text-[12px]">
          <input
            type="checkbox"
            checked={onlySale}
            onChange={() => {
              setOnlySale((v) => !v);
              setPage(1);
            }}
            className="accent-[var(--brand)]"
          />
          فقط محصولات تخفیف‌دار
        </label>
      </section>
    </div>
  );

  return (
    <div className="container-site">
      <Breadcrumbs items={crumbs} />
      <h1 className="text-xl font-black text-ink sm:text-2xl">{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl text-[13px] leading-7 text-muted-foreground">
          {description}
        </p>
      )}

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-60 shrink-0 lg:block">{filters}</aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between gap-3 border-y border-border py-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 text-[12px] font-medium lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              فیلترها
            </button>
            <p className="hidden text-[12px] text-muted-foreground lg:block">
              نمایش {toFa(visible.length)} از {toFa(filtered.length)} محصول
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-input bg-background px-2 py-1.5 text-[12px] outline-none"
            >
              <option value="default">مرتب‌سازی پیش‌فرض</option>
              <option value="newest">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
          </div>

          <ProductGrid products={visible} columns={3} />

          {pageCount > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-9 w-9 border text-[13px] ${
                    n === current
                      ? "border-ink bg-ink text-white"
                      : "border-input text-ink hover:border-ink"
                  }`}
                >
                  {toFa(n)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setDrawerOpen(false)}>
          <aside
            className="h-full w-[82vw] max-w-xs overflow-y-auto bg-background p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold">فیلترها</h2>
              <button onClick={() => setDrawerOpen(false)} aria-label="بستن فیلترها">
                <X className="h-5 w-5" />
              </button>
            </div>
            {filters}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-8 w-full bg-brand py-2.5 text-sm font-bold text-white"
            >
              نمایش نتایج
            </button>
          </aside>
          <div className="flex-1 bg-black/50" />
        </div>
      )}
    </div>
  );
}
