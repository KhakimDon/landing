import { Navbar } from "./components/navbar";
import { ScrollProgress } from "./components/scroll-progress";
import { Hero } from "./components/hero";
import { Stats } from "./components/stats";
import { Services } from "./components/services";
import { Geo } from "./components/geo";
import { Features } from "./components/features";
import { BanksMarquee } from "./components/banks-marquee";
import { Security } from "./components/security";
import { Comparison } from "./components/comparison";
import { Faq } from "./components/faq";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* Глобальная грейн-текстура поверх фона — добавляет «бумажную» глубину. */}
      <div
        aria-hidden
        className="bg-noise pointer-events-none fixed inset-0 z-[1] opacity-[0.07] mix-blend-overlay"
      />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <Stats />
        <Services />
        <Geo />
        <Features />
        <Security />
        <Comparison />
        <BanksMarquee />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
