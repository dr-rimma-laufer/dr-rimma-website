import { Button } from '../components/ui/button';
import { Calendar, Phone } from 'lucide-react';
import { CONTACT_INFO, BUTTON_STYLES } from './constants';

interface CTAButtonsProps {
  primaryText?: string;
  primaryIcon?: React.ReactNode;
  secondaryText?: string;
  secondaryIcon?: React.ReactNode;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  variant?: 'default' | 'outline';
}

export function CTAButtons({
  primaryText = 'קביעת ייעוץ חינם',
  primaryIcon = <Calendar className="ml-2 h-5 w-5" />,
  secondaryText = CONTACT_INFO.phone,
  secondaryIcon = <Phone className="ml-2 h-5 w-5" />,
  onPrimaryClick,
  onSecondaryClick,
  variant = 'default'
}: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        size="lg"
        className={BUTTON_STYLES.primary}
        onClick={onPrimaryClick}
      >
        {primaryIcon}
        {primaryText}
      </Button>
      <Button 
        variant={variant === 'outline' ? 'outline' : 'outline'}
        size="lg"
        className={BUTTON_STYLES.primaryOutline}
        onClick={onSecondaryClick}
      >
        {secondaryIcon}
        {secondaryText}
      </Button>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, badge, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {badge && (
        <div className="bg-white/20 text-white border-white/30 mb-6 inline-block px-4 py-2 rounded-full text-sm font-semibold">
          {badge}
        </div>
      )}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  backgroundClass?: string;
  children?: React.ReactNode;
}

export function HeroSectionLayout({
  title,
  subtitle,
  description,
  badge,
  backgroundClass = 'bg-gradient-to-l from-[#101828] to-[#0a0f1a]',
  children
}: HeroSectionProps) {
  return (
    <section className={`relative ${backgroundClass} text-white py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {badge && (
            <div className="bg-white/20 text-white border-white/30 mb-6 inline-block px-4 py-2 rounded-full text-sm font-semibold">
              {badge}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-xl md:text-2xl mb-8 text-[#905e26]">
              {subtitle}
            </h2>
          )}
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
            {description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}