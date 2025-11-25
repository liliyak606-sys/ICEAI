import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { useI18n } from '../context/i18n';

const SolutionCard: React.FC<{ title: string; description: string; icon: React.ReactNode, animationDelay?: string }> = ({ title, description, icon, animationDelay = '0s' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <div
      ref={ref}
      className={`group bg-gray-900/50 p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:border-cyan-400 glow-effect ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
      style={{ animationDelay }}
    >
      <div className="text-cyan-400 mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-cyan-300">{title}</h3>
      <p className="text-gray-400 transition-colors group-hover:text-gray-200">{description}</p>
    </div>
  );
};


const SolutionSection: React.FC = () => {
  const { t } = useI18n();
  const cards = t<any[]>('whyIce.cards');
  const icons = [
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ];

  return (
    <section id="why" className="py-20 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white">{t('whyIce.title')}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
            <SolutionCard
                key={index}
                title={card.title}
                description={card.description}
                icon={icons[index]}
                animationDelay={`${index * 150}ms`}
            />
        ))}
      </div>
    </section>
  );
};

export default SolutionSection;