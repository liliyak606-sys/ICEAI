
import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { useI18n } from '../context/i18n';

const TargetCard: React.FC<{ title: string; description: string; icon: React.ReactNode, animationDelay?: string }> = ({ title, description, icon, animationDelay = '0s' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');
    return (
        <div 
            ref={ref}
            className={`bg-gray-900/40 p-6 rounded-xl border border-gray-800/80 transform transition-all duration-500 ease-out ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
            style={{ animationDelay }}
        >
            <div className="flex items-center gap-4">
                <div className="text-purple-400">{icon}</div>
                <div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-gray-400">{description}</p>
                </div>
            </div>
        </div>
    );
};

const TechnologySection: React.FC = () => {
    const ctaRef = useRef<HTMLDivElement>(null);
    const isCtaVisible = useOnScreen(ctaRef, '-100px');
    const { t } = useI18n();
    const presentationUrl = t<string>('presentationUrl');

    const targets = t<any[]>('whoIsItFor.targets');
    const icons = [
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-5M3 4h5V9" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1" /></svg>
    ];

    return (
        <section>
            <div id="who-is-it-for" className="py-20 md:py-32">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white">{t('whoIsItFor.title')}</h2>
                    <p className="mt-4 text-lg text-gray-400">{t('whoIsItFor.description')}</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-6">
                    {targets.map((target, index) => (
                        <TargetCard 
                            key={index}
                            title={target.title}
                            description={target.description}
                            icon={icons[index]}
                            animationDelay={`${index * 150}ms`}
                        />
                    ))}
                </div>
            </div>
            <div id="revolution-cta" className="py-20 md:py-24">
                <div 
                    ref={ctaRef} 
                    className={`text-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 sm:p-10 md:p-16 rounded-2xl border border-gray-800 max-w-5xl mx-auto glow-effect transition-all duration-700 ease-out hover:scale-[1.02] hover:border-cyan-400/50 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                    <h2 className="font-space-grotesk text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight break-words">{t('revolutionCta.title')}</h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {t('revolutionCta.description')}
                    </p>
                    <div className="mt-10">
                        <a
                            href={presentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-cyan-500 text-white font-bold py-4 px-10 rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                        >
                            {t('revolutionCta.button')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnologySection;
