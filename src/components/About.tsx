import { SHOP_PHOTOS } from '../data/coffeeData';
import { BotanicalCorner, CoffeeBranchDivider } from './CoffeeDecor';
import { ImageWithFallback } from './ImageWithFallback';

export function About() {
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
          {/* Left Column: Simple & Authentic Story */}
          <div className="sm:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#3D5A45] tracking-wide mb-3">
              À propos de la maison
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231915] leading-tight mb-6">
              L’art du café de spécialité à deux pas des Champs-Élysées
            </h2>

            <div className="space-y-4 text-base text-[#5A4D44] leading-relaxed max-w-[60ch]">
              <p>
                COFFEE LHARDY est un coffee shop moderne situé au 8 rue des
                Champs-Élysées. Nous vous accueillons dans un lieu calme et
                chaleureux, idéal pour faire une vraie pause café à Paris.
              </p>
              <p>
                Nous préparons chaque boisson devant vous avec du café de
                spécialité et du matcha fouetté à la main, accompagnés de
                viennoiseries et pâtisseries fraîches chaque matin, sur place ou
                à emporter.
              </p>
            </div>

            <CoffeeBranchDivider className="mt-8 mb-6" />

            {/* Clean Hairline-Separated Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <p className="font-serif text-lg font-semibold text-[#5E3A22]">
                  Grains sélectionnés
                </p>
                <p className="text-sm text-[#6E6259] mt-1">
                  Extraction espresso et filtres maîtrisés
                </p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#3D5A45]">
                  Pâtisseries du jour
                </p>
                <p className="text-sm text-[#6E6259] mt-1">
                  Viennoiseries pur beurre et cookies maison
                </p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#8C5A32]">
                  Paris 8e
                </p>
                <p className="text-sm text-[#6E6259] mt-1">
                  Sur place au comptoir ou à emporter
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Barista Craftsmanship Photo */}
          <div className="sm:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[380px] rounded-xl overflow-hidden border border-[#E5DDD3] bg-[#EFE9E0]">
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
