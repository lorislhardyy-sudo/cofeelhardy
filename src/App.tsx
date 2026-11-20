/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { About } from './components/About';
import { CartDrawer } from './components/CartDrawer';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { HouseCoffeeSection } from './components/HouseCoffeeSection';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#231915]">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <MenuSection />
          <HouseCoffeeSection />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
