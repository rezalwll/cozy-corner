import shirt1 from "@/assets/p-shirt-1.jpg";
import shirt2 from "@/assets/p-shirt-2.jpg";
import tshirt1 from "@/assets/p-tshirt-1.jpg";
import tshirt2 from "@/assets/p-tshirt-2.jpg";
import pants1 from "@/assets/p-pants-1.jpg";
import pants2 from "@/assets/p-pants-2.jpg";
import shoe1 from "@/assets/p-shoe-1.jpg";
import shoe2 from "@/assets/p-shoe-2.jpg";
import acc1 from "@/assets/p-acc-1.jpg";
import acc2 from "@/assets/p-acc-2.jpg";

export type CategorySlug =
  | "shirts"
  | "pants"
  | "tshirts"
  | "shoes"
  | "accessories"
  | "sets";

export interface Category {
  slug: CategorySlug;
  name: string;
  image: string;
  description: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: CategorySlug;
  images: string[];
  price: number;
  salePrice?: number;
  sizes: string[];
  colors: ColorOption[];
  stock: number;
  isNew?: boolean;
  description: string;
  specifications: { label: string; value: string }[];
}

export const categories: Category[] = [
  {
    slug: "shirts",
    name: "پیراهن مردانه",
    image: shirt1,
    description: "استایل مردانه، بدون تلاش اضافی. پیراهن‌های نخی و جذب با دوخت تمیز.",
  },
  {
    slug: "pants",
    name: "شلوار مردانه",
    image: pants1,
    description: "شلوار بگ، کارگو و جین با پارچه‌های باکیفیت و فیت روز.",
  },
  {
    slug: "tshirts",
    name: "تیشرت و پلوشرت مردانه",
    image: tshirt1,
    description: "تیشرت اورسایز، رکابی و پلوشرت با پنبه درجه یک.",
  },
  {
    slug: "shoes",
    name: "کفش و کتونی مردانه",
    image: shoe1,
    description: "کتونی‌های اسپرت و روزمره با کیفیت اورجینال.",
  },
  {
    slug: "accessories",
    name: "اکسسوری مردانه",
    image: acc1,
    description: "کمربند، عینک، ساعت و اکسسوری‌های تکمیل‌کننده استایل.",
  },
  {
    slug: "sets",
    name: "ست مردانه",
    image: tshirt2,
    description: "ست‌های کامل مردانه، هماهنگ‌شده توسط تیم استایل الون.",
  },
];

const sizesClothing = ["S", "M", "L", "XL", "XXL"];
const sizesShoes = ["۴۰", "۴۱", "۴۲", "۴۳", "۴۴"];

const black = { name: "مشکی", hex: "#111111" };
const white = { name: "سفید", hex: "#f5f5f5" };
const cream = { name: "کرم", hex: "#e5d6bd" };
const navy = { name: "سرمه‌ای", hex: "#1e2a44" };
const olive = { name: "سبز", hex: "#9aa88f" };
const brown = { name: "قهوه‌ای", hex: "#7a4a24" };

export const products: Product[] = [
  {
    id: 1,
    slug: "pirahan-sade-sabz",
    name: "پیراهن ساده مردانه مدل لینن سبز",
    category: "shirts",
    images: [shirt1, shirt2],
    price: 1_980_000,
    salePrice: 1_490_000,
    sizes: sizesClothing,
    colors: [olive, white, black],
    stock: 8,
    isNew: true,
    description:
      "پیراهن آستین بلند مردانه با پارچه لینن نخی، فیت رگولار و یقه کلاسیک. مناسب استفاده روزمره و مهمانی.",
    specifications: [
      { label: "جنس", value: "لینن نخی" },
      { label: "فیت", value: "رگولار" },
      { label: "یقه", value: "کلاسیک" },
      { label: "قد آستین", value: "بلند" },
    ],
  },
  {
    id: 2,
    slug: "pirahan-rah-rah-meshki",
    name: "پیراهن راه‌راه مردانه مشکی سفید",
    category: "shirts",
    images: [shirt2, shirt1],
    price: 2_190_000,
    sizes: sizesClothing,
    colors: [black, white],
    stock: 5,
    isNew: true,
    description:
      "پیراهن راه‌راه مردانه با طرح عمودی، دوخت تمیز و پارچه خنک. انتخابی مناسب برای استایل شهری.",
    specifications: [
      { label: "جنس", value: "ویسکوز" },
      { label: "فیت", value: "اورسایز" },
      { label: "طرح", value: "راه‌راه" },
    ],
  },
  {
    id: 3,
    slug: "tishirt-oversize-meshki",
    name: "تیشرت اورسایز مردانه مشکی",
    category: "tshirts",
    images: [tshirt1, tshirt2],
    price: 890_000,
    salePrice: 690_000,
    sizes: sizesClothing,
    colors: [black, white, cream],
    stock: 20,
    isNew: true,
    description: "تیشرت اورسایز پنبه‌ای با یقه گرد ریب و دوخت دو سوزنه.",
    specifications: [
      { label: "جنس", value: "پنبه ۱۰۰٪" },
      { label: "فیت", value: "اورسایز" },
      { label: "یقه", value: "گرد" },
    ],
  },
  {
    id: 4,
    slug: "rakabi-sefid",
    name: "رکابی مردانه ریب سفید",
    category: "tshirts",
    images: [tshirt2, tshirt1],
    price: 490_000,
    sizes: sizesClothing,
    colors: [white, black],
    stock: 0,
    description: "رکابی ریب مردانه با کشسانی بالا، مناسب زیرپوش و استایل تابستانی.",
    specifications: [
      { label: "جنس", value: "پنبه ریب" },
      { label: "فیت", value: "بادی" },
    ],
  },
  {
    id: 5,
    slug: "shalvar-jean-bag-abi",
    name: "شلوار جین بگ مردانه آبی روشن",
    category: "pants",
    images: [pants1, pants2],
    price: 2_490_000,
    salePrice: 1_990_000,
    sizes: sizesClothing,
    colors: [navy, black],
    stock: 12,
    isNew: true,
    description: "شلوار جین بگ با شستشوی روشن، پارچه سنگین و فرم‌پذیری عالی.",
    specifications: [
      { label: "جنس", value: "جین ۱۰۰٪ پنبه" },
      { label: "فیت", value: "بگ" },
      { label: "قد", value: "بلند" },
    ],
  },
  {
    id: 6,
    slug: "shalvar-cargo-meshki",
    name: "شلوار کارگو مردانه مشکی",
    category: "pants",
    images: [pants2, pants1],
    price: 1_890_000,
    sizes: sizesClothing,
    colors: [black, cream],
    stock: 9,
    description: "شلوار کارگو با جیب‌های بغل، کمر کش‌دار و پارچه کتان ضخیم.",
    specifications: [
      { label: "جنس", value: "کتان" },
      { label: "فیت", value: "رگولار" },
      { label: "تعداد جیب", value: "۶" },
    ],
  },
  {
    id: 7,
    slug: "katoni-saghdar-abi",
    name: "کتونی ساق‌دار مردانه سفید آبی",
    category: "shoes",
    images: [shoe1, shoe2],
    price: 3_490_000,
    salePrice: 2_990_000,
    sizes: sizesShoes,
    colors: [white, navy],
    stock: 6,
    isNew: true,
    description: "کتونی ساق‌دار مردانه با رویه چرم طبیعی و زیره ترموپلاستیک.",
    specifications: [
      { label: "جنس رویه", value: "چرم" },
      { label: "زیره", value: "TPR" },
      { label: "کاربرد", value: "روزمره" },
    ],
  },
  {
    id: 8,
    slug: "katoni-saghdar-ghermez",
    name: "کتونی ساق‌دار مردانه سفید قرمز",
    category: "shoes",
    images: [shoe2, shoe1],
    price: 3_290_000,
    sizes: sizesShoes,
    colors: [white, { name: "قرمز", hex: "#9b1b1b" }],
    stock: 4,
    description: "کتونی ساق‌دار با ترکیب رنگ سفید و قرمز، مناسب استایل اسپرت.",
    specifications: [
      { label: "جنس رویه", value: "چرم مصنوعی" },
      { label: "زیره", value: "لاستیک" },
    ],
  },
  {
    id: 9,
    slug: "kamarband-charm-ghahvei",
    name: "کمربند چرم مردانه قهوه‌ای",
    category: "accessories",
    images: [acc1, acc2],
    price: 790_000,
    salePrice: 590_000,
    sizes: ["۱۰۵", "۱۱۰", "۱۱۵"],
    colors: [brown, black],
    stock: 15,
    description: "کمربند چرم طبیعی با سگک فلزی ضدزنگ و دوخت دستی.",
    specifications: [
      { label: "جنس", value: "چرم طبیعی" },
      { label: "عرض", value: "۳.۵ سانتی‌متر" },
    ],
  },
  {
    id: 10,
    slug: "eynak-aftabi-meshki",
    name: "عینک آفتابی مردانه مشکی",
    category: "accessories",
    images: [acc2, acc1],
    price: 990_000,
    sizes: ["فری‌سایز"],
    colors: [black],
    stock: 11,
    isNew: true,
    description: "عینک آفتابی با فریم استات و لنز پلاریزه ضد UV۴۰۰.",
    specifications: [
      { label: "فریم", value: "استات" },
      { label: "لنز", value: "پلاریزه UV400" },
    ],
  },
  {
    id: 11,
    slug: "set-tishirt-shalvar-meshki",
    name: "ست تیشرت و شلوار مردانه مشکی",
    category: "sets",
    images: [tshirt1, pants2],
    price: 2_690_000,
    salePrice: 2_290_000,
    sizes: sizesClothing,
    colors: [black, cream],
    stock: 7,
    isNew: true,
    description: "ست کامل تیشرت اورسایز و شلوار کارگو، هماهنگ‌شده توسط تیم استایل الون.",
    specifications: [
      { label: "تعداد قطعات", value: "۲" },
      { label: "جنس", value: "پنبه و کتان" },
    ],
  },
  {
    id: 12,
    slug: "set-pirahan-shalvar-krem",
    name: "ست پیراهن و شلوار مردانه کرم",
    category: "sets",
    images: [shirt1, pants1],
    price: 3_190_000,
    sizes: sizesClothing,
    colors: [cream, white],
    stock: 3,
    description: "ست پیراهن لینن و شلوار پارچه‌ای، مناسب فصل گرم.",
    specifications: [
      { label: "تعداد قطعات", value: "۲" },
      { label: "جنس", value: "لینن" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function newestProducts(count = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, count);
}

export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
export const allColors = Array.from(
  new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values(),
);
export const maxPrice = Math.max(...products.map((p) => p.salePrice ?? p.price));
