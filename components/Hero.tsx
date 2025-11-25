
import React from 'react';
import { useI18n } from '../context/i18n';

const Hero: React.FC = () => {
  const { t } = useI18n();
  const logoUrl = "https://raw.githubusercontent.com/liliyak606-sys/ICEAI/ce9c883b5a1f0d75e25ce08be74d3b7c0454f9ea/logoice.svg";
  const videoUrl = "https://raw.githubusercontent.com/liliyak606-sys/ICEAI/main/bg.mp4";

  const scrollToCTA = () => {
    const element = document.getElementById('revolution-cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center py-20 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-[#010409]/70 z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#010409] to-transparent z-10"></div>
      
      <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-8">
        <img 
            src={logoUrl} 
            alt="ICE AI Logo" 
            className="h-48 md:h-72 mx-auto mb-8 animate-fade-in-down"
            style={{ filter: 'brightness(1.5) contrast(1.2)' }}
        />
        <h1 className="font-space-grotesk font-bold leading-tight animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          <span className="block text-7xl md:text-9xl text-cyan-400 text-glow-cyan tracking-tighter mb-2">
            {t('hero.title_line1')}
          </span>
          <span className="block text-4xl md:text-6xl text-white font-medium">
            {t('hero.title_line2')}
          </span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s', whiteSpace: 'pre-line' }}>
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={scrollToCTA}
            className="w-full sm:w-auto bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            {t('hero.cta.download')}
          </button>
          <a
            href="https://wa.me/972504834744"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-transparent border border-gray-600 text-gray-300 font-bold py-3 px-8 rounded-lg hover:border-cyan-400 hover:text-white transition-all duration-300"
          >
            {t('hero.cta.contact')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;