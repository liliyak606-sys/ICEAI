import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ProductSection from './components/ProductSection';
import TechnologySection from './components/TechnologySection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import { I18nProvider } from './context/i18n';
import InvestmentSection from './components/InvestmentSection';
import AnimatedCounter from './components/AnimatedCounter';

const AppContent: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#010409] text-gray-300 grainy-overlay overflow-x-hidden">
      <div 
        className="mouse-follower-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      <div className="animated-background">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <main className="container max-w-7xl mx-auto px-6 md:px-8">
          {/* Section: Why Now? */}
          <InvestmentSection /> 
          {/* Section: What it does */}
          <ProblemSection />
          {/* Section: Breakthrough */}
          <AnimatedCounter />
          {/* Section: Why ICE */}
          <SolutionSection />
          {/* Section: Backed By Intelligence */}
          <ProductSection />
          {/* Section: Trust & Team */}
          <TeamSection />
          {/* Section: Who It's For & Presentation CTA */}
          <TechnologySection />
        </main>
        <Footer />
      </div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};

export default App;