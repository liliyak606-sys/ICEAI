import React, { useRef } from 'react';
import { useI18n } from '../context/i18n';
import { useOnScreen } from '../hooks/useOnScreen';

const ReasonCard: React.FC<{ title: string; description: string; icon: React.ReactNode; animationDelay?: string }> = ({ title, description, icon, animationDelay = '0s' }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');

    return (
        <div
            ref={ref}
            className={`bg-gray-900/40 p-6 rounded-xl border border-gray-800/80 transition-all duration-500 ease-out ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
            style={{ animationDelay }}
        >
            <div className="flex items-start gap-4">
                <div className="text-cyan-400 flex-shrink-0 mt-1">{icon}</div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                    <p className="text-gray-400">{description}</p>
                </div>
            </div>
        </div>
    );
};

const WhyNowSection: React.FC = () => {
    const { t } = useI18n();
    const reasons = t<any[]>('whyNow.reasons');
    const icons = [
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
    ];

    return (
        <section id="why-now" className="py-20 md:py-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white">{t('whyNow.title')}</h2>
                <p className="mt-4 text-lg text-gray-400">{t('whyNow.subtitle')}</p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {reasons.map((reason, index) => (
                    <ReasonCard
                        key={index}
                        title={reason.title}
                        description={reason.description}
                        icon={icons[index]}
                        animationDelay={`${index * 150}ms`}
                    />
                ))}
            </div>
        </section>
    );
};

export default WhyNowSection;