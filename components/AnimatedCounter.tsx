import React, { useRef, useState, useEffect } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { useI18n } from '../context/i18n';

// A single animated statistic
const AnimatedStat: React.FC<{
  prefix?: string;
  target: number;
  suffix?: string;
  description: string;
  isVisible: boolean;
  animationDelay: string;
}> = ({ prefix, target, suffix, description, isVisible, animationDelay }) => {
  const [count, setCount] = useState(0);
  const duration = 2000;

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const timer = setTimeout(() => {
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutCubic easing function for a smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3); 
            
            const currentVal = easedProgress * target;
            
            // Handle floating point numbers
            if (target % 1 !== 0) {
                const decimalPlaces = target.toString().split('.')[1]?.length || 1;
                setCount(parseFloat(currentVal.toFixed(decimalPlaces)));
            } else {
                setCount(Math.floor(currentVal));
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Ensure it ends on the exact number
                setCount(target);
            }
        };
        requestAnimationFrame(step);
    }, parseInt(animationDelay, 10));
    
    return () => clearTimeout(timer);
  }, [target, isVisible, animationDelay]);

  return (
    <div className="flex flex-col items-center">
      <p className="font-space-grotesk text-5xl md:text-6xl font-bold text-white">
        {prefix}
        <span>{count}</span>
        {suffix}
      </p>
      <p className="mt-2 text-gray-400 text-center">{description}</p>
    </div>
  );
};


const AnimatedCounter: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-200px');
  const { t } = useI18n();
  const stats = t<any[]>('breakthrough.stats');

  return (
    <section className="py-24 md:py-32">
        <div 
            ref={ref}
            className={`relative text-center max-w-5xl mx-auto py-16 px-8 rounded-2xl overflow-hidden border border-gray-800 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
             <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{backgroundSize: '3rem 3rem'}}></div>
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"></div>
            <div className="relative z-10">
                <h2 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {t('breakthrough.title')}
                </h2>
                <p className="mt-4 text-xl md:text-2xl text-purple-300 text-glow-purple">
                    {t('breakthrough.subtitle')}
                </p>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                  {stats && stats.map((stat, index) => (
                    <AnimatedStat 
                      key={index}
                      prefix={stat.prefix}
                      target={stat.value}
                      suffix={stat.suffix}
                      description={stat.description}
                      isVisible={isVisible}
                      animationDelay={`${index * 200}`}
                    />
                  ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default AnimatedCounter;