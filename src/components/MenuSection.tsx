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
import {
  getItemAtmosphere,
  MenuPhotoAtmosphere,
} from './MenuPhotoAtmosphere';

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
    accentText: 'text-[#8A6114]',
    cardBg: 'bg-gradient-to-br from-[#F7E7B2] via-[#EED27A] to-[#E5C158]',
    cardBorder: 'border-[#B8891E] hover:border-[#8F650D]',
    thumbBorder: 'border-[#9C7216]',
    priceColor: 'text-[#3B2314]',
    iconBg: 'bg-[#EED27A] text-[#5E3A08]',
    tabActive: 'bg-[#9E731B] text-[#FAF4EC]',
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
              Préparé par nos baristas professionnels · Note&nbsp;de{' '}
              <span className="inline-flex items-center gap-1 font-semibold text-[#5E3A22] tabular-nums whitespace-nowrap">
                4,9 / 5
                <Star
                  className="w-3.5 h-3.5 fill-[#B87D4B] text-[#B87D4B]"
                  aria-hidden="true"
                />
              </span>
            </p>
            <p className="text-xs text-[#6E6259]">
              Tarifs indicatifs en euros, confirmés sur&nbsp;place.
            </p>
          </div>
        </div>

        {/* Visual Showcase using supplied product photo */}
        <div className="max-w-3xl mx-auto mb-12">
          <figure className="group rounded-xl overflow-hidden border border-[#C7D8CA] bg-[#F7FAF7]">
            <div className="menu-photo-frame relative aspect-[16/10] overflow-hidden bg-[#EFE9E0]">
              <div className="w-full h-full menu-photo-drift-a">
                <ImageWithFallback
                  src={SHOP_PHOTOS.drinksAndPastries}
                  alt="Matcha latte, boissons chaudes à emporter, brioche feuilletée, brownie et cookie"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <MenuPhotoAtmosphere mode="hot-drink" variantIndex={0} />
            </div>
            <figcaption className="px-5 py-3.5 text-sm sm:text-base text-[#3D5A45] font-medium border-t border-[#D6E3D8] text-center">
              Au comptoir, Jérémy, barista&nbsp;expert,
              <br />
              vous prépare votre café à la commande avec précision et&nbsp;savoir-faire.
            </figcaption>
          </figure>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Catégories du menu"
          className="flex items-center gap-2 overflow-x-auto pt-1 pb-3 mb-12 border-b border-[#D4C0A8]"
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
            const isSignature = category.id === 'signature-drinks';
            const theme = CATEGORY_THEMES[category.id];
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314] ${
                  isSignature
                    ? `gold-shimmer-card bg-gradient-to-br from-[#F7E7B2] via-[#EED27A] to-[#E5C158] text-[#3B2314] border ${
                        isActive
                          ? 'border-[#3B2314] ring-1 ring-[#3B2314] font-semibold'
                          : 'border-[#B8891E] hover:border-[#8F650D]'
                      }`
                    : isActive
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
                    <p className="text-sm text-[#5A4D44] mt-0.5 whitespace-pre-line">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {items.map((item, itemIdx) => {
                    const driftClass =
                      itemIdx % 2 === 0
                        ? 'menu-photo-drift-a'
                        : 'menu-photo-drift-b';
                    const driftDelayClass = `menu-drift-delay-${itemIdx % 5}`;
                    const enterDelayClass = `menu-enter-delay-${itemIdx % 6}`;

                    return (
                      <div
                        key={`${activeCategory}-${item.id}`}
                        className={`group menu-card-enter ${enterDelayClass} p-4 sm:p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 ${theme.cardBg} ${theme.cardBorder} ${
                          category.id === 'signature-drinks'
                            ? 'gold-shimmer-card'
                            : ''
                        }`}
                      >
                        <div
                          className={`menu-photo-frame relative w-full aspect-[4/3] sm:aspect-square sm:w-36 sm:h-36 lg:w-40 lg:h-40 shrink-0 rounded-lg overflow-hidden border-2 bg-[#EFE9E0] ${theme.thumbBorder}`}
                        >
                          <div
                            className={`w-full h-full ${driftClass} ${driftDelayClass}`}
                          >
                            <ImageWithFallback
                              src={item.image}
                              alt={item.imageAlt}
                              loading="lazy"
                              className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                            />
                          </div>
                          <MenuPhotoAtmosphere
                            mode={getItemAtmosphere(category.id, item.id)}
                            variantIndex={itemIdx}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3">
                            <h4 className="text-base sm:text-lg font-medium text-[#231915]">
                              {item.name}
                            </h4>
                            <span
                              className={`text-base sm:text-lg font-semibold tabular-nums whitespace-nowrap shrink-0 ${theme.priceColor}`}
                            >
                              {item.priceEur}
                            </span>
                          </div>
                          <p
                            className={`text-sm mt-1.5 leading-relaxed ${
                              category.id === 'signature-drinks'
                                ? 'text-[#3E2C1E]'
                                : 'text-[#5A4D44]'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
