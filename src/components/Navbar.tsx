import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BrandLogo } from './CoffeeDecor';

const NAV_LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'La Carte' },
  { href: '#cafes-maison', label: 'Cafés Maison' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#F7F1E8]/95 backdrop-blur-sm border-b border-[#DFD1BF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark + Emblem */}
        <a
          href="#accueil"
          className="inline-flex items-center gap-2.5 font-serif text-xl sm:text-2xl font-semibold tracking-[0.06em] text-[#231915] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B2314]"
        >
          <BrandLogo variant="light" className="w-8 h-8 sm:w-9 sm:h-9" />
          <span>COFFEE LHARDY</span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A4D44]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#231915] border-b border-transparent hover:border-[#8C6239] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B2314]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (Panier) + mobile menu toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Ouvrir le panier (${totalCount} ${totalCount > 1 ? 'articles' : 'article'})`}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium text-[#FAF8F5] bg-[#3B2314] hover:bg-[#2A180D] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Panier</span>
            {totalCount > 0 && (
              <span className="tabular-nums font-semibold">({totalCount})</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#231915] hover:bg-[#EFE9E0] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2314]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigation mobile"
          className="md:hidden bg-[#FAF8F5] border-t border-[#E5DDD3] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-base font-medium text-[#231915] hover:bg-[#F2EDE6] rounded-lg transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
