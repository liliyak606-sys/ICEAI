import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { useI18n } from '../context/i18n';

const FeatureListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3">
    <svg className="flex-shrink-0 h-6 w-6 text-cyan-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span dangerouslySetInnerHTML={{ __html: children as string }} />
  </li>
);

const ProblemSection: React.FC = () => {
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const isLeftVisible = useOnScreen(leftCardRef, '-100px');
  const isRightVisible = useOnScreen(rightCardRef, '-100px');
  const { t } = useI18n();

  return (
    <section id="what" className="py-20 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white">{t('whatIsIce.title')}</h2>
        <p className="mt-4 text-xl text-gray-400">{t('whatIsIce.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div 
          ref={leftCardRef}
          className={`group bg-gray-900/50 p-8 rounded-xl border border-gray-800 glow-effect transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-500 ${isLeftVisible ? 'animate-fade-in-left' : 'opacity-0 -translate-x-5'}`}
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="p-3 bg-cyan-900/50 rounded-lg mb-4 border border-cyan-400/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-3xl font-space-grotesk font-bold text-white transition-colors group-hover:text-cyan-300">{t('whatIsIce.guardian.title')}</h3>
            <p className="text-gray-400">{t('whatIsIce.guardian.subtitle')}</p>
          </div>
          <ul className="space-y-4 text-gray-300">
            {t<string[]>('whatIsIce.guardian.features').map((feature, index) => (
                <FeatureListItem key={index}>{feature}</FeatureListItem>
            ))}
          </ul>
        </div>

        <div 
          ref={rightCardRef}
          className={`group bg-gray-900/50 p-8 rounded-xl border border-gray-800 glow-effect transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-500 ${isRightVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-5'}`}
          style={{ animationDelay: '150ms' }}
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="p-3 bg-purple-900/50 rounded-lg mb-4 border border-purple-400/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-900">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="text-3xl font-space-grotesk font-bold text-white transition-colors group-hover:text-purple-300">{t('whatIsIce.assistant.title')}</h3>
            <p className="text-gray-400">{t('whatIsIce.assistant.subtitle')}</p>
          </div>
          <p className="text-center mb-4">{t('whatIsIce.assistant.description')}</p>
          <div className="space-y-3 text-gray-300 bg-gray-900 border border-gray-700 p-4 rounded-lg">
              {t<string[]>('whatIsIce.assistant.examples').map((example, index) => (
                  <p key={index} className="italic">"{example}"</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;