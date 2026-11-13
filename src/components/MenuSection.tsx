import { useState } from 'react';
import { Coffee, Croissant, Leaf, Snowflake, Star, Utensils } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategoryId,
  SHOP_PHOTOS,
} from '../data/coffeeData';
import { CoffeeBranchDivider } from './CoffeeDecor';
import { ImageWithFallback } from './ImageWithFallback';

type CategoryId = Exclude<MenuCategoryId, 'all'>;

const CATEGORY_THEMES: Record<
  CategoryId,
  {
    accentText: string;
    cardBg: string;
    cardBorder: string;
    thumbBorder: string;
    priceColor: string;
    iconBg: string;
    tabActive: string;
  }
> = {
  'hot-coffees': {
    accentText: 'text-[#6E4427]',
    cardBg: 'bg-[#FBF6F0]',
    cardBorder: 'border-[#DFCBB5] hover:border-[#A67449]',
    thumbBorder: 'border-[#C9A886]',
    priceColor: 'text-[#5E3A22]',
    iconBg: 'bg-[#EFE1D1] text-[#5E3A22]',
    tabActive: 'bg-[#5E3A22] text-[#FAF4EC]',
  },
  'iced-coffees': {
    accentText: 'text-[#395C53]',
    cardBg: 'bg-[#F5F9F7]',
    cardBorder: 'border-[#C9DAD4] hover:border-[#5D8C80]',
    thumbBorder: 'border-[#A3C2B8]',
    priceColor: 'text-[#2F4F47]',
    iconBg: 'bg-[#E2EDE9] text-[#395C53]',
    tabActive: 'bg-[#395C53] text-[#FAF4EC]',
  },
  'signature-drinks': {
    accentText: 'text-[#3D5A45]',
    cardBg: 'bg-[#F4F8F4]',
    cardBorder: 'border-[#C7D8CA] hover:border-[#5D8768]',
    thumbBorder: 'border-[#9FBDAA]',
    priceColor: 'text-[#34503B]',
    iconBg: 'bg-[#E1ECE3] text-[#3D5A45]',
    tabActive: 'bg-[#3D5A45] text-[#FAF4EC]',
  },
  pastries: {
    accentText: 'text-[#8F5524]',
    cardBg: 'bg-[#FCF6EC]',
    cardBorder: 'border-[#E6CEAE] hover:border-[#C2864B]',
    thumbBorder: 'border-[#D7B284]',
    priceColor: 'text-[#7C481C]',
    iconBg: 'bg-[#F4E4CE] text-[#8F5524]',
    tabActive: 'bg-[#8F5524] text-[#FAF4EC]',
  },
  'food-breakfast': {
    accentText: 'text-[#55613B]',
    cardBg: 'bg-[#F7F8F2]',
    cardBorder: 'border-[#D3D9C3] hover:border-[#7B8B57]',
    thumbBorder: 'border-[#B6C09C]',
    priceColor: 'text-[#485331]',
    iconBg: 'bg-[#E9EDE0] text-[#55613B]',
    tabActive: 'bg-[#55613B] text-[#FAF4EC]',
  },
};

function CategoryIcon({ categoryId }: { categoryId: CategoryId }) {
  switch (categoryId) {
    case 'hot-coffees':
      return <Coffee className="w-4 h-4" aria-hidden="true" />;
    case 'iced-coffees':
      return <Snowflake className="w-4 h-4" aria-hidden="true" />;
    case 'signature-drinks':
      return <Leaf className="w-4 h-4" aria-hidden="true" />;
    case 'pastries':
      return <Croissant className="w-4 h-4" aria-hidden="true" />;
    case 'food-breakfast':
      return <Utensils className="w-4 h-4" aria-hidden="true" />;
  }
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');

  const visibleCategories =
    activeCategory === 'all'
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section id="menu" className="bg-coffee-latte border-b border-[#D9C8B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-medium text-[#3D5A45] tracking-wide mb-2">
              La Carte · Cafés, Herbes &amp; Gourmandises
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231915]">
              Cafés, Boissons Signatures &amp; Pâtisseries
            </h2>
          </div>

          <div className="text-sm text-[#5A4D44] max-w-[48ch] leading-relaxed space-y-1 lg:text-right">
            <p className="font-medium text-[#231915]">
              Préparé par nos baristas professionnels · Note de{' '}
              <span className="inline-flex items-center gap-1 font-semibold text-[#5E3A22] tabular-nums">
                4,9 / 5
                <Star
                  className="w-3.5 h-3.5 fill-[#B87D4B] text-[#B87D4B]"
                  aria-hidden="true"
                />
              </span>
            </p>
            <p className="text-xs text-[#6E6259]">
              Tarifs indicatifs en euros, confirmés sur place.
            </p>
          </div>
        </div>

        {/* Visual Showcase Strip using actual supplied product photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <figure className="rounded-xl overflow-hidden border border-[#D4C0A8] bg-[#FCF8F2]">
            <div className="aspect-[16/10] overflow-hidden bg-[#EFE9E0]">
              <ImageWithFallback
                src={SHOP_PHOTOS.latteTray}
                alt="Cappuccinos et latte art en tasses cannelées servis avec un cookie maison"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <figcaption className="px-5 py-3.5 text-sm text-[#5A4D44] border-t border-[#E5DDD3] flex items-center justify-between gap-4">
              <span className="font-medium text-[#5E3A22]">
                Cafés chauds &amp; latte art
              </span>
              <span className="text-xs text-[#6E6259] whitespace-nowrap">
                Sur place ou à emporter
              </span>
            </figcaption>
          </figure>

          <figure className="rounded-xl overflow-hidden border border-[#C7D8CA] bg-[#F7FAF7]">
            <div className="aspect-[16/10] overflow-hidden bg-[#EFE9E0]">
              <ImageWithFallback
                src={SHOP_PHOTOS.drinksAndPastries}
                alt="Matcha latte, boissons chaudes à emporter, brioche feuilletée, brownie et cookie"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <figcaption className="px-5 py-3.5 text-sm text-[#5A4D44] border-t border-[#D6E3D8] flex items-center justify-between gap-4">
              <span className="font-medium text-[#3D5A45]">
                Matcha, brioche feuilletée &amp; cookies
              </span>
              <span className="text-xs text-[#6E6259] whitespace-nowrap">
                Préparés chaque matin
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Catégories du menu"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-12 border-b border-[#D4C0A8]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314] ${
              activeCategory === 'all'
                ? 'bg-[#3B2314] text-[#FAF8F5]'
                : 'bg-[#FCF8F2]/80 text-[#5A4D44] hover:text-[#231915] hover:bg-[#FCF8F2]'
            }`}
          >
            Tout voir
          </button>

          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            const theme = CATEGORY_THEMES[category.id];
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314] ${
                  isActive
                    ? theme.tabActive
                    : 'bg-[#FCF8F2]/80 text-[#5A4D44] hover:text-[#231915] hover:bg-[#FCF8F2]'
                }`}
              >
                <CategoryIcon categoryId={category.id} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Categories & Items */}
        <div className="space-y-14">
          {visibleCategories.map((category, idx) => {
            const items = MENU_ITEMS.filter(
              (item) => item.category === category.id
            );
            const theme = CATEGORY_THEMES[category.id];

            return (
              <div key={category.id}>
                {idx > 0 && <CoffeeBranchDivider className="mb-12" />}

                <div className="flex items-start sm:items-center gap-3.5 mb-6">
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${theme.iconBg}`}
                  >
                    <CategoryIcon categoryId={category.id} />
                  </span>
                  <div>
                    <h3
                      className={`font-serif text-2xl sm:text-3xl font-semibold ${theme.accentText}`}
                    >
                      {category.label}
                    </h3>
                    <p className="text-sm text-[#5A4D44] mt-0.5">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-colors duration-150 flex items-center justify-between gap-4 ${theme.cardBg} ${theme.cardBorder}`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-20 h-20 sm:w-[88px] sm:h-[88px] shrink-0 rounded-lg overflow-hidden border-2 bg-[#EFE9E0] ${theme.thumbBorder}`}
                        >
                          <ImageWithFallback
                            src={item.image}
                            alt={item.imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-base font-medium text-[#231915]">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#5A4D44] mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right pl-2">
                        <span
                          className={`text-base font-semibold tabular-nums whitespace-nowrap ${theme.priceColor}`}
                        >
                          {item.priceEur}
                        </span>
                        <span className="block text-[11px] text-[#6E6259] mt-0.5 whitespace-nowrap">
                          indicatif
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
