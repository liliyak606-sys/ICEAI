import React from 'react';
import { useI18n } from '../context/i18n';
import { useOnScreen } from '../hooks/useOnScreen';

const IntelligenceCard: React.FC<{ title: string; description: string; icon: React.ReactNode; animationDelay?: string }> = ({ title, description, icon, animationDelay = '0s' }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');

    return (
        <div
            ref={ref}
            className={`group bg-gray-900/50 p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:border-purple-500 glow-effect ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
            style={{ animationDelay }}
        >
            <div className="text-purple-400 mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-purple-300">{title}</h3>
            <p className="text-gray-400 transition-colors group-hover:text-gray-200">{description}</p>
        </div>
    );
};

const BackedByIntelligenceSection: React.FC = () => {
  const { t } = useI18n();
  const principles = t<any[]>('backedByIntelligence.principles');
  const icons = [
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.874 5.094A5.5 5.5 0 0110.25 2.5h3.5a5.5 5.5 0 015.376 2.594M19.126 18.906A5.5 5.5 0 0113.75 21.5h-3.5a5.5 5.5 0 01-5.376-2.594M12 2.5v19M2.5 12h19" /></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM20 8v8" /></svg>
  ];

  return (
    <section id="intelligence" className="py-20 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white">{t('backedByIntelligence.title')}</h2>
        <p className="mt-4 text-lg text-gray-400">{t('backedByIntelligence.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
              <IntelligenceCard 
                key={index}
                title={principle.title}
                description={principle.description}
                icon={icons[index]}
                animationDelay={`${index * 150}ms`}
              />
          ))}
      </div>
    </section>
  );
};

export default BackedByIntelligenceSection;