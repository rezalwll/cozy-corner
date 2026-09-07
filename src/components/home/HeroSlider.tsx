import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const slides = [
  {
    image: hero1,
    title: "کالکشن جدید کفش و کتونی",
    subtitle: "هر قدم امضای استایل تو",
    href: "shoes" as const,
  },
  {
    image: hero2,
    title: "کالکشن پیراهن و شلوار",
    subtitle: "استایل مردانه، بدون تلاش اضافی",
    href: "shirts" as const,
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="container-site mt-4">
      <div className="relative overflow-hidden bg-ink">
        {slides.map((s, i) => (
          <div
            key={s.title}
            className={`transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              width={1920}
              height={640}
              className="h-[220px] w-full object-cover sm:h-[320px] lg:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 px-6 sm:px-12">
              <p className="text-[11px] tracking-[0.35em] text-white/70">NEW</p>
              <h2 className="max-w-md text-xl font-black text-white sm:text-3xl lg:text-4xl">
                {s.title}
              </h2>
              <p className="text-[12px] text-white/80 sm:text-sm">{s.subtitle}</p>
              <Link
                to="/product-category/$category"
                params={{ category: s.href }}
                className="mt-2 border border-white px-5 py-2 text-[12px] font-bold tracking-widest text-white transition-colors hover:bg-white hover:text-ink"
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setIndex(i)}
              aria-label={`اسلاید ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
