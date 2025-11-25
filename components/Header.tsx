
import React, { useState, useEffect } from 'react';
import { useI18n } from '../context/i18n';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();
  const logoUrl = "https://raw.githubusercontent.com/liliyak606-sys/ICEAI/ce9c883b5a1f0d75e25ce08be74d3b7c0454f9ea/logoice.svg";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);
  
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'why-now', key: 'whyNow' },
    { id: 'what', key: 'what' },
    { id: 'why', key: 'why' },
    { id: 'team', key: 'team' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/70 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
        <nav className="container max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-4 relative z-50">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <img src={logoUrl} alt="ICE AI Logo" className="h-8" style={{ filter: 'brightness(1.5) contrast(1.2)' }} />
              <span className="font-space-grotesk text-xl font-bold text-white text-glow-cyan">ICE AI</span>
              </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                {t(`header.nav.${item.key}`)}
              </button>
            ))}
          </div>
          
          {/* Desktop Action Buttons */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-4">
              <LanguageSwitcher />
              <a href="https://wa.me/972504834744" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 border border-gray-700 text-white py-2 px-5 rounded-lg hover:bg-gray-700 hover:border-cyan-400 transition-all duration-300">
                  {t('header.contact')}
              </a>
          </div>

          {/* Mobile/Tablet Burger Menu Button */}
          <div className="flex lg:hidden items-center justify-end">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 focus:outline-none transition-transform active:scale-95"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile/Tablet Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#010409]/95 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-5'
        }`}
      >
        <div className="flex flex-col items-center w-full px-8 gap-8">
          <div className="flex flex-col items-center gap-6 w-full">
            {navItems.map((item, index) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="text-2xl font-space-grotesk font-medium text-white hover:text-cyan-400 transition-colors duration-300 w-full text-center py-2"
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                {t(`header.nav.${item.key}`)}
              </button>
            ))}
          </div>
          
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2"></div>

          {/* Mobile Language Switcher */}
          <div className="scale-125">
            <LanguageSwitcher />
          </div>
          
          <a 
            href="https://wa.me/972504834744" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full max-w-xs bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-cyan-500/30 text-white py-4 px-8 rounded-xl hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 text-center font-bold text-lg mt-4"
          >
             {t('header.contact')}
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
