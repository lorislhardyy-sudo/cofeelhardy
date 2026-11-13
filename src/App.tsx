/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#231915]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
