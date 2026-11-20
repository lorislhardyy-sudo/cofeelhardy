import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND_CONTACT } from '../data/coffeeData';
import { BotanicalCorner } from './CoffeeDecor';

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-coffee-latte">
      <BotanicalCorner
        variant="light"
        className="hidden lg:block absolute -bottom-6 -left-6 -rotate-90 opacity-45"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#3D5A45] tracking-wide mb-2">
            Localisation &amp; Contact
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231915]">
            Nous rendre visite rue Royale
          </h2>
          <p className="text-base text-[#5A4D44] mt-3 leading-relaxed">
            Retrouvez COFFEE LHARDY au cœur du 8e arrondissement de&nbsp;Paris.
            <br />
            7/7 j de 8h à&nbsp;21h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Structured Contact Details */}
          <div className="lg:col-span-5 bg-[#FAF8F5] rounded-xl border border-[#DDD3C7] p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="pb-5 border-b border-[#E5DDD3] flex items-start gap-4">
                <MapPin
                  className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-sans text-xs font-medium text-[#6E6259] tracking-wide">
                    Adresse
                  </h3>
                  <p className="text-base font-medium text-[#231915] mt-1">
                    {BRAND_CONTACT.address}
                  </p>
                  <p className="text-sm text-[#5A4D44] mt-0.5">
                    {BRAND_CONTACT.district}
                  </p>
                </div>
              </div>

              <div className="pb-5 border-b border-[#E5DDD3] flex items-start gap-4">
                <Phone
                  className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-sans text-xs font-medium text-[#6E6259] tracking-wide">
                    Téléphone
                  </h3>
                  <a
                    href={BRAND_CONTACT.phoneHref}
                    className="inline-block text-base font-medium text-[#231915] hover:text-[#8C6239] transition-colors duration-150 mt-1 tabular-nums"
                  >
                    {BRAND_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="pb-5 border-b border-[#E5DDD3] flex items-start gap-4">
                <Mail
                  className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-sans text-xs font-medium text-[#6E6259] tracking-wide">
                    E-mail
                  </h3>
                  <a
                    href={BRAND_CONTACT.emailHref}
                    className="inline-block text-base font-medium text-[#231915] hover:text-[#8C6239] transition-colors duration-150 mt-1 break-all"
                  >
                    {BRAND_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock
                  className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-sans text-xs font-medium text-[#6E6259] tracking-wide">
                    Horaires d’ouverture
                  </h3>
                  <p className="text-base font-medium text-[#231915] mt-1">
                    {BRAND_CONTACT.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BRAND_CONTACT.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-[#FAF8F5] bg-[#3B2314] hover:bg-[#2A180D] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314]"
              >
                <span>Obtenir l’itinéraire</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[340px] sm:min-h-[420px] rounded-xl overflow-hidden border border-[#DDD3C7] bg-[#EFE9E0]">
              <iframe
                title="Carte Google Maps — 18 rue Royale, 75008 Paris, France"
                src={BRAND_CONTACT.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
