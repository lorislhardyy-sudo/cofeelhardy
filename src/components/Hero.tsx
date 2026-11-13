import { ArrowRight } from 'lucide-react';
import { SHOP_PHOTOS } from '../data/coffeeData';
import { BotanicalCorner } from './CoffeeDecor';
import { ImageWithFallback } from './ImageWithFallback';

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-coffee-roast border-b border-[#3A271D]"
    >
      <BotanicalCorner
        variant="dark"
        className="hidden sm:block absolute -top-4 -left-4 opacity-70"
      />
      <BotanicalCorner
        variant="dark"
        className="hidden lg:block absolute -bottom-4 -right-4 rotate-180 opacity-60"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Primary CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center py-2 lg:py-8">
            <p className="text-sm font-medium text-[#D7A876] tracking-wide mb-4">
              Champs-Élysées · 75008 Paris
            </p>

            <h1 className="font-serif text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-[#FAF4EC] mb-5">
              Bienvenue chez Coffee Lhardy
            </h1>

            <p className="text-base sm:text-lg text-[#DDD0C3] leading-relaxed max-w-[44ch] mb-8">
              Votre pause café au cœur des Champs-Élysées. Cafés de spécialité,
              boissons signatures et viennoiseries dorées dans une atmosphère
              chaleureuse et épurée.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-[#241610] bg-[#EFE3D2] hover:bg-[#FAF4EC] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EFE3D2]"
              >
                <span>Découvrir notre carte</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm sm:text-base font-medium text-[#FAF4EC] hover:text-white border border-[#5C4132] hover:border-[#D7A876] bg-[#2F1D15]/70 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EFE3D2]"
              >
                Adresse &amp; horaires
              </a>
            </div>
          </div>

          {/* Right Column: Main Interior Photograph */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[540px] rounded-xl overflow-hidden border border-[#4A3327] bg-[#1B100B]">
              <ImageWithFallback
                src={SHOP_PHOTOS.interiorBar}
                alt="Intérieur du salon COFFEE LHARDY sur les Champs-Élysées avec comptoir en bois cannelé et vitrine de viennoiseries"
                loading="eager"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
