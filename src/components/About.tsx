import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SHOP_PHOTOS } from '../data/coffeeData';
import { BotanicalCorner } from './CoffeeDecor';
import { ImageWithFallback } from './ImageWithFallback';

export function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="apropos"
      className="relative overflow-hidden bg-coffee-crema border-b border-[#DDD0BE]"
    >
      <BotanicalCorner
        variant="light"
        className="hidden lg:block absolute -bottom-6 -right-6 rotate-180 opacity-45"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* Left Column: Concise 11-Year Story with Expandable Continuation */}
          <div className="sm:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#3D5A45] tracking-wide mb-3">
              À propos de la maison
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231915] leading-tight mb-5">
              Notre histoire, 11 ans de passion
            </h2>

            <div className="space-y-4 text-base text-[#5A4D44] leading-relaxed max-w-[54ch]">
              <p>
                Cela fait maintenant 11 ans que nous faisons ce métier avec la
                même envie : servir un vrai café de qualité, préparé avec soin
                et dans une ambiance chaleureuse.
              </p>

              {isExpanded && (
                <div className="space-y-4">
                  <p>
                    Tout a commencé par l’amour du grain bien torréfié et des
                    extractions précises. Pendant ces 11 années, nous avons
                    affiné notre savoir-faire tasse après tasse, au contact de
                    clients fidèles qui aiment prendre le temps d’un bon café.
                  </p>
                  <p>
                    Aujourd’hui au 18 rue Royale, COFFEE LHARDY réunit toute
                    cette expérience : des boissons préparées à la commande, du
                    matcha cérémoniel et des pâtisseries fraîches chaque matin,
                    sur place ou à emporter.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#3B2314] bg-[#EFE3D2] hover:bg-[#E5D4BD] border border-[#D4C0A8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314]"
              >
                <span>{isExpanded ? 'Réduire' : 'Afficher la suite'}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Barista Craftsmanship Photo */}
          <div className="sm:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[340px] rounded-xl overflow-hidden border border-[#E5DDD3] bg-[#EFE9E0]">
              <ImageWithFallback
                src={SHOP_PHOTOS.barista}
                alt="Barista préparant un espresso de spécialité chez Coffee Lhardy à Paris"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
