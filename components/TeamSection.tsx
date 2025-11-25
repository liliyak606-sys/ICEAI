
import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { useI18n } from '../context/i18n';

// A generic social link component for icons
const SocialLink: React.FC<{ href: string; children: React.ReactNode; ariaLabel: string }> = ({ href, children, ariaLabel }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">
        {children}
    </a>
);

// The new, improved Team Member Card component
const TeamMemberCard: React.FC<{
    name: string;
    title: string;
    description: string;
    imageUrl: string;
    socials: { linkedin: string; website: string };
    animationDelay?: string;
    accentColor: 'cyan' | 'purple';
}> = ({ name, title, description, imageUrl, socials, animationDelay = '0s', accentColor }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');
    
    const accentClasses = {
        cyan: {
            border: 'hover:border-cyan-400',
            text: 'text-cyan-400',
            imageBorder: 'group-hover:ring-cyan-500/50',
        },
        purple: {
            border: 'hover:border-purple-400',
            text: 'text-purple-400',
            imageBorder: 'group-hover:ring-purple-500/50',
        }
    };
    
    const currentAccent = accentClasses[accentColor];

    return (
        <div
            ref={ref}
            className={`group bg-gray-900/50 p-8 rounded-xl border border-gray-800 text-center flex flex-col items-center transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] ${currentAccent.border} ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
            style={{ animationDelay }}
        >
            <div className={`relative mb-4`}>
                <img
                    src={imageUrl}
                    alt={`Portrait of ${name}`}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-800 transition-all duration-300 group-hover:ring-4 ${currentAccent.imageBorder}"
                />
            </div>
            <h3 className={`text-2xl font-bold text-white font-space-grotesk`}>{name}</h3>
            <p className={`text-md ${currentAccent.text} font-semibold mb-4`}>{title}</p>
            <p className="text-gray-400 flex-grow">{description}</p>
            <div className="flex items-center gap-5 mt-6 pt-6 border-t border-gray-800 w-full justify-center">
                <SocialLink href={socials.linkedin} ariaLabel={`${name} on LinkedIn`}>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
                </SocialLink>
                <SocialLink href={socials.website} ariaLabel={`Website of ${name}`}>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>
                </SocialLink>
            </div>
        </div>
    );
};

const TeamSection: React.FC = () => {
    const { t } = useI18n();
    const staticData = [
        {
            imageUrl: "https://raw.githubusercontent.com/liliyak606-sys/ICEAI/refs/heads/main/iliyaphoto.jpg",
            socials: { linkedin: "https://www.linkedin.com/in/sbdt/", website: "https://www.linkedin.com/company/iceai/posts/?feedView=all" },
            accentColor: 'cyan' as 'cyan' | 'purple',
        },
        {
            imageUrl: "https://raw.githubusercontent.com/liliyak606-sys/ICEAI/refs/heads/main/liliyaphoto.jpg",
            socials: { linkedin: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin", website: "https://www.linkedin.com/company/iceai/posts/?feedView=all" },
            accentColor: 'purple' as 'cyan' | 'purple',
        }
    ];

    const teamMembers = t<any[]>('team.members').map((member, index) => ({
        ...member,
        ...staticData[index],
    }));

    return (
        <section id="team" className="py-20 md:py-32">
            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white">{t('team.title')}</h2>
                <p className="mt-4 text-lg text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('team.description') }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard 
                        key={member.name}
                        {...member}
                        animationDelay={`${index * 150}ms`}
                    />
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
