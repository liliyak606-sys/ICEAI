
import React from 'react';
import { useI18n } from '../context/i18n';

const Footer: React.FC = () => {
  const { t } = useI18n();
  const videoUrl = "https://raw.githubusercontent.com/liliyak606-sys/ICEAI/main/videofooter.mp4";

  return (
    <footer className="relative border-t border-gray-800 overflow-hidden">
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
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="relative z-20 container max-w-7xl mx-auto px-6 md:px-8 py-16 text-center">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white">{t('footer.title')}</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-400">
            {t('footer.description')}
          </p>
          <div className="mt-8">
            <a
              href="https://wa.me/972504834744"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
            >
              {t('footer.cta_contact')}
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800/50 text-gray-500 text-sm">
              <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;