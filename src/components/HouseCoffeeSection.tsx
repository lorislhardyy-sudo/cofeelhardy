import { useState } from 'react';
import { Check, RefreshCw, ShoppingBag } from 'lucide-react';
import {
  formatEur,
  getSubscriptionPrice,
  PurchaseType,
  SUBSCRIPTION_DISCOUNT_LABEL,
  useCart,
} from '../context/CartContext';
import {
  CoffeeGrind,
  CoffeeWeight,
  HOUSE_COFFEES,
  HouseCoffeeProduct,
} from '../data/coffeeData';
import { BotanicalCorner, BrandLogo, CoffeeBranchDivider } from './CoffeeDecor';
import { ImageWithFallback } from './ImageWithFallback';

const WEIGHT_OPTIONS: CoffeeWeight[] = ['250g', '500g', '1kg'];
const GRIND_OPTIONS: { value: CoffeeGrind; label: string }[] = [
  { value: 'En grains', label: 'En grains' },
  { value: 'Moulu Espresso', label: 'Espresso' },
  { value: 'Moulu Filtre', label: 'Filtre' },
];

interface SelectionState {
  weight: CoffeeWeight;
  grind: CoffeeGrind;
  purchaseType: PurchaseType;
}

export function HouseCoffeeSection() {
  const { addItem } = useCart();
  const [selections, setSelections] = useState<Record<string, SelectionState>>({
    'assemblage-maison': {
      weight: '250g',
      grind: 'En grains',
      purchaseType: 'one-time',
    },
    'reserve-royale': {
      weight: '250g',
      grind: 'En grains',
      purchaseType: 'one-time',
    },
  });
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const updateSelection = (
    coffeeId: string,
    patch: Partial<SelectionState>
  ) => {
    setSelections((prev) => ({
      ...prev,
      [coffeeId]: {
        ...prev[coffeeId],
        ...patch,
      },
    }));
  };

  const handleAddToCart = (coffee: HouseCoffeeProduct) => {
    const sel = selections[coffee.id] ?? {
      weight: '250g',
      grind: 'En grains',
      purchaseType: 'one-time',
    };
    const regularPrice = coffee.prices[sel.weight];
    const unitPrice =
      sel.purchaseType === 'subscription'
        ? getSubscriptionPrice(regularPrice)
        : regularPrice;

    addItem({
      coffeeId: coffee.id,
      name: coffee.name,
      image: coffee.image,
      weight: sel.weight,
      grind: sel.grind,
      purchaseType: sel.purchaseType,
      unitPrice,
      regularUnitPrice: regularPrice,
    });

    setJustAddedId(coffee.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === coffee.id ? null : curr));
    }, 1500);
  };

  return (
    <section
      id="cafes-maison"
      className="relative overflow-hidden bg-coffee-roast border-b border-[#3A271D]"
    >
      <BotanicalCorner
        variant="dark"
        className="hidden lg:block absolute -top-4 -right-4 rotate-90 opacity-65"
      />
      <BotanicalCorner
        variant="dark"
        className="hidden lg:block absolute -bottom-4 -left-4 -rotate-90 opacity-65"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <p className="text-sm font-medium text-[#D7A876] tracking-wide mb-2">
            Cafés Maison · 18 rue&nbsp;Royale
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FAF4EC]">
            Nos sachets à l’unité ou par&nbsp;abonnement
          </h2>
          <p className="text-base text-[#DDD0C3] mt-2.5">
            En grains ou moulus à la demande. Abonnement mensuel à{' '}
            {SUBSCRIPTION_DISCOUNT_LABEL}, sans&nbsp;engagement.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {HOUSE_COFFEES.map((coffee) => {
            const sel = selections[coffee.id] ?? {
              weight: '250g',
              grind: 'En grains',
              purchaseType: 'one-time',
            };
            const regularPrice = coffee.prices[sel.weight];
            const isSub = sel.purchaseType === 'subscription';
            const currentPrice = isSub
              ? getSubscriptionPrice(regularPrice)
              : regularPrice;
            const isAdded = justAddedId === coffee.id;

            return (
              <article
                key={coffee.id}
                className="bg-[#FAF4EC] rounded-2xl overflow-hidden border border-[#DFD1BF] flex flex-col"
              >
                {/* Packaging Photograph (Logo stamped directly on the pouch) */}
                <div className="aspect-[4/3] overflow-hidden bg-[#EFE9E0] border-b border-[#E5DDD3]">
                  <ImageWithFallback
                    src={coffee.image}
                    alt={coffee.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Product Details & Controls */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3D5A45] tracking-wide">
                      <BrandLogo variant="light" className="w-4 h-4" />
                      <span>COFFEE LHARDY · {coffee.origin}</span>
                    </p>

                    <div className="mt-1.5 flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#231915]">
                        {coffee.name}
                      </h3>
                      <div className="text-right shrink-0">
                        {isSub && (
                          <span className="text-xs text-[#8C7F74] line-through tabular-nums mr-2">
                            {formatEur(regularPrice)}
                          </span>
                        )}
                        <span className="text-xl sm:text-2xl font-semibold text-[#5E3A22] tabular-nums whitespace-nowrap">
                          {formatEur(currentPrice)}
                        </span>
                        {isSub && (
                          <span className="text-xs font-medium text-[#5A4D44] ml-1">
                            / mois
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#5A4D44] mt-2">
                      {coffee.notes}
                    </p>
                  </div>

                  {/* Purchase Mode, Format, Grind & CTA */}
                  <div className="space-y-3">
                    {/* One-time vs Monthly Subscription Selector */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateSelection(coffee.id, {
                            purchaseType: 'one-time',
                          })
                        }
                        className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314] ${
                          !isSub
                            ? 'bg-[#3B2314] text-[#FAF4EC] border-[#3B2314]'
                            : 'bg-[#F2EAE0] text-[#5A4D44] border-[#DFD1BF] hover:text-[#231915] hover:border-[#B89D7F]'
                        }`}
                      >
                        Achat unique
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateSelection(coffee.id, {
                            purchaseType: 'subscription',
                          })
                        }
                        className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-colors duration-150 inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314] ${
                          isSub
                            ? 'bg-[#3D5A45] text-[#FAF8F5] border-[#3D5A45]'
                            : 'bg-[#F2EAE0] text-[#3D5A45] border-[#C7D8CA] hover:border-[#3D5A45]'
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Abonnement {SUBSCRIPTION_DISCOUNT_LABEL}</span>
                      </button>
                    </div>

                    {isSub && (
                      <p className="text-xs font-medium text-[#3D5A45]">
                        Livraison offerte chaque mois · Sans engagement
                      </p>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      {WEIGHT_OPTIONS.map((weight) => {
                        const active = sel.weight === weight;
                        return (
                          <button
                            key={weight}
                            type="button"
                            onClick={() =>
                              updateSelection(coffee.id, { weight })
                            }
                            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314] ${
                              active
                                ? 'bg-[#3B2314] text-[#FAF4EC] border-[#3B2314]'
                                : 'bg-[#F2EAE0] text-[#5A4D44] border-[#DFD1BF] hover:text-[#231915] hover:border-[#B89D7F]'
                            }`}
                          >
                            {weight === '1kg'
                              ? '1 kg'
                              : weight.replace('g', ' g')}
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {GRIND_OPTIONS.map((grind) => {
                        const active = sel.grind === grind.value;
                        return (
                          <button
                            key={grind.value}
                            type="button"
                            onClick={() =>
                              updateSelection(coffee.id, { grind: grind.value })
                            }
                            className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314] ${
                              active
                                ? 'bg-[#3D5A45] text-[#FAF8F5] border-[#3D5A45]'
                                : 'bg-[#F2EAE0] text-[#5A4D44] border-[#DFD1BF] hover:text-[#231915] hover:border-[#8AA791]'
                            }`}
                          >
                            {grind.label}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(coffee)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm sm:text-base font-medium text-[#FAF4EC] bg-[#5E3A22] hover:bg-[#3B2314] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314]"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Ajouté au panier</span>
                        </>
                      ) : isSub ? (
                        <>
                          <RefreshCw className="w-4 h-4" aria-hidden="true" />
                          <span>
                            S’abonner · {formatEur(currentPrice)} / mois
                          </span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                          <span>
                            Ajouter au panier · {formatEur(currentPrice)}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <CoffeeBranchDivider className="mt-12 max-w-md mx-auto opacity-75" />
      </div>
    </section>
  );
}
