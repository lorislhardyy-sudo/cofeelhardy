import { BRAND_CONTACT } from '../data/coffeeData';
import { BrandLogo } from './CoffeeDecor';

const FOOTER_LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#menu', label: 'La Carte' },
  { href: '#cafes-maison', label: 'Cafés Maison' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#1D1410] text-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3A2B24]">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a
              href="#accueil"
              className="inline-flex items-center gap-3 font-serif text-2xl font-semibold tracking-[0.06em] text-[#FAF8F5]"
            >
              <BrandLogo variant="dark" className="w-9 h-9" />
              <span>{BRAND_CONTACT.name}</span>
            </a>
            <p className="text-sm text-[#C8BEB4] mt-3 max-w-[40ch] leading-relaxed">
              Votre pause café rue&nbsp;Royale.
              <br />
              Cafés de spécialité, boissons maison et pâtisseries du&nbsp;matin.
            </p>
            <p className="text-sm text-[#A89A8E] mt-4">
              {BRAND_CONTACT.address}, {BRAND_CONTACT.district}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h2 className="font-sans text-sm font-medium text-[#FAF8F5] mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm text-[#C8BEB4]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#FAF8F5] transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h2 className="font-sans text-sm font-medium text-[#FAF8F5] mb-4">
              Informations
            </h2>
            <dl className="space-y-2.5 text-sm text-[#C8BEB4]">
              <div>
                <dt className="sr-only">Adresse</dt>
                <dd>
                  {BRAND_CONTACT.address}, {BRAND_CONTACT.district}
                </dd>
              </div>
              <div>
                <dt className="sr-only">Téléphone</dt>
                <dd>
                  <a
                    href={BRAND_CONTACT.phoneHref}
                    className="hover:text-[#FAF8F5] transition-colors duration-150 tabular-nums"
                  >
                    {BRAND_CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">E-mail</dt>
                <dd>
                  <a
                    href={BRAND_CONTACT.emailHref}
                    className="hover:text-[#FAF8F5] transition-colors duration-150 break-all"
                  >
                    {BRAND_CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Horaires</dt>
                <dd>{BRAND_CONTACT.hours}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A89A8E]">
          <p>© {new Date().getFullYear()} COFFEE LHARDY. Tous droits réservés.</p>
          <p>18 rue Royale, 75008 Paris, France</p>
        </div>
      </div>
    </footer>
  );
}
