'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  X,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Award,
  Calendar,
  Phone,
  Heart,
  Shield,
  Activity,
  Sparkles,
  Stethoscope,
  Brain,
  Target,
  User,
  Star,
  Droplets,
  Zap
} from 'lucide-react';

export interface DiseaseData {
  title: string;
  titleEnglish: string;
  subtitle?: string;
  description: string;
  overview?: string;
  frequency: {
    title: string;
    content: string;
  };
  causes: {
    title: string;
    content: string[];
  };
  symptoms: {
    title: string;
    content: string[];
  };
  ocularRosacea?: {
    title: string;
    content: string[];
  };
  types?: {
    title: string;
    content: string[];
  };
  triggers?: {
    title: string;
    content: string[];
  };
  diagnosis: {
    title: string;
    content: string[];
  };
  complications?: {
    title: string;
    content: string[];
  };
  treatment: {
    title: string;
    content: string;
    lifestyle?: {
      title: string;
      options: string[];
    };
    topical: {
      title: string;
      options: string[];
    };
    systemic: {
      title: string;
      options: string[];
    };
    advanced: {
      title: string;
      options: string[];
    };
    ocular?: {
      title: string;
      options: string[];
    };
  };
  relatedConditions: {
    title: string;
    content: string[];
  };
  whenToSeeDoctor: {
    title: string;
    content: string[];
  };
  prognosis: {
    title: string;
    content: string;
  };
  summaryTitle?: string;
  summaryContent?: string[];
}

interface DermatologyDiseaseTemplateProps {
  data: DiseaseData;
  onNavigate: (page: string) => void;
}

export function DermatologyDiseaseTemplate({ data, onNavigate }: DermatologyDiseaseTemplateProps) {
  const isStandalonePage = true;
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Check if screen is mobile size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackClick = () => {
    if (isMobile) {
      console.log('📱 Mobile: Navigating back to #dermatology');
      onNavigate('#dermatology');
      setTimeout(() => {
        const section = document.getElementById('dermatology-diseases-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log('📍 Scrolled to diseases section');
        }
      }, 100);
    } else {
      console.log('💻 Desktop: Navigating back to all diseases');
      onNavigate('all');
    }
  };

  return (
    <div className="hebrew-text flex flex-col h-full" dir="rtl">
      {/* Hero Section with Floating Bubbles */}
      <section className={`relative bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white ${isStandalonePage ? 'pt-16 md:pt-8 pb-8 md:pb-4' : 'pt-8 pb-4 flex-shrink-0'} overflow-hidden`}>
        {/* Close button positioned absolutely on the left for overlay mode - Hidden on mobile */}
        <button
          onClick={handleBackClick}
          className="hidden md:block absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110 backdrop-blur-sm z-20"
          aria-label="חזרה"
          style={{
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <X className="h-5 w-5 text-white" />
        </button>
        
        {/* Floating Bubbles Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large bubbles with slow movement */}
          <div className="bubble bubble-large animate-floatBubbles" style={{ left: '10%', animationDuration: '20s', animationDelay: '0s' }}></div>
          <div className="bubble bubble-extra-large animate-floatBubbles" style={{ left: '25%', animationDuration: '25s', animationDelay: '-5s' }}></div>
          <div className="bubble bubble-medium animate-floatBubbles " style={{ left: '45%', animationDuration: '18s', animationDelay: '-10s' }}></div>
          <div className="bubble bubble-large animate-floatBubbles" style={{ left: '65%', animationDuration: '22s', animationDelay: '-3s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '80%', animationDuration: '15s', animationDelay: '-8s' }}></div>
          
          {/* Medium bubbles with moderate speed */}
          <div className="bubble bubble-medium animate-floatBubbles" style={{ left: '15%', animationDuration: '16s', animationDelay: '-12s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '35%', animationDuration: '14s', animationDelay: '-6s' }}></div>
          <div className="bubble bubble-medium animate-floatBubbles " style={{ left: '55%', animationDuration: '19s', animationDelay: '-15s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '75%', animationDuration: '13s', animationDelay: '-2s' }}></div>
          <div className="bubble bubble-large animate-floatBubbles " style={{ left: '85%', top: '60%', animationDuration: '21s', animationDelay: '-9s' }}></div>
          
          {/* Small bubbles with fast movement */}
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '5%', animationDuration: '12s', animationDelay: '-4s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '20%', animationDuration: '11s', animationDelay: '-7s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '40%', animationDuration: '10s', animationDelay: '-11s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '60%', animationDuration: '13s', animationDelay: '-1s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '90%', animationDuration: '9s', animationDelay: '-14s' }}></div>
        </div>
        
        <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-2xl font-bold mb-4 md:mb-2 animate-heroTitlePulse">
              {data.titleEnglish}
              <br/>
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <main className="py-0">

        {/* Content Section */}
        <section className="bg-gradient-to-b from-white to-[#101828]/5 py-12">
          <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-3xl font-bold text-[#101828] mb-4">מהי {data.title}?</h2>
                <p className="text-2xl sm:text-xl text-[#101828]/80 leading-relaxed">
                  {data.description}
                </p>
                
                {data.overview && (
                  <p className="text-2xl sm:text-xl text-[#101828]/70 leading-relaxed mt-4">
                    {data.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Frequency Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Users className="ml-2 h-6 w-6 text-[#905e26]" />
                {data.frequency.title}
              </h3>
              <div className="space-y-4">
                {data.frequency.content.split('\n').filter(line => line.trim()).map((line, index) => (
                  <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                    {index === 0 ? (
                      <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{line}</span>
                    ) : (
                      <div className="flex items-start">
                        <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{line}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
        
        {/* Causes & Risk Factors with Symptoms Side by Side Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
            {/* Desktop Layout - Side by Side */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8">
              
              {/* Causes & Risk Factors Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Brain className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.causes.title}
                </h3>
                <div className="space-y-4">
                  {data.causes.content.map((cause, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{cause}</span>
                      ) : (
                        <div key={index} className="flex items-start">
                          <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{cause}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Symptoms & Signs Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <User className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.symptoms.title}
                </h3>
                
                <div className="space-y-4">
                  {data.symptoms.content.map((symptom, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{symptom}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="lg:hidden space-y-8">
              
              {/* Causes & Risk Factors Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Brain className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.causes.title}
                </h3>
                <div className="space-y-4">
                  {data.causes.content.map((cause, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{cause}</span>
                      ) : (
                        <div className="relative pr-6">
                          <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{cause}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Symptoms & Signs Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <User className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.symptoms.title}
                </h3>
                
                <div className="space-y-4">
                  {data.symptoms.content.map((symptom, index) => (
                    <div key={index} className="flex items-start space-x-reverse space-x-3">
                      <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{symptom}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Ocular Rosacea Section - Optional */}
        {data.ocularRosacea && (
          <section className="py-16">
            <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <User className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.ocularRosacea.title}
                </h3>
                <div className="space-y-4">
                  {data.ocularRosacea.content.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{item}</span>
                      ) : (
                        <div className="flex items-start space-x-reverse space-x-3">
                          <span className="text-[#905e26] font-bold text-xl">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Types Section - Optional */}
        {data.types && (
          <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
            <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Activity className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.types.title}
                </h3>
                <div className="space-y-4">
                  {data.types.content.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{item}</span>
                      ) : (
                        <div className="relative pr-6">
                          <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Triggers Section - Optional */}
        {data.triggers && (
          <section className="py-16">
            <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.triggers.title}
                </h3>
                <div className="space-y-4">
                  {data.triggers.content.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{item}</span>
                      ) : (
                        <div className="relative pr-6">
                          <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Diagnosis & Treatment Section */}
        <section className="py-16">
          <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
            {/* Desktop Layout - Side by Side */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
              
              {/* Diagnosis Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Stethoscope className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.diagnosis.title}
                </h3>
                <div className="space-y-4">
                  {data.diagnosis.content.map((method, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{method}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Treatment Options Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.treatment.title}
                </h3>
                
                <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                  {data.treatment.content}
                </p>
                
                {/* Lifestyle - Optional */}
                {data.treatment.lifestyle && (
                  <div className="mb-6">
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-4 font-semibold rich-content-display">
                      {data.treatment.lifestyle.title}
                    </p>
                    <div className="space-y-3">
                      {data.treatment.lifestyle.options.map((option, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                          <span className="text-base text-[#101828]/80 rich-content-display">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Topical Treatments */}
                <div className="mb-6">
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-4 font-semibold rich-content-display">
                    {data.treatment.topical.title}
                  </p>
                  <div className="space-y-3">
                    {data.treatment.topical.options.map((option, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                        <span className="text-base text-[#101828]/80 rich-content-display">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="lg:hidden space-y-8">
              
              {/* Diagnosis Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Stethoscope className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.diagnosis.title}
                </h3>
                <div className="space-y-4">
                  {data.diagnosis.content.map((method, index) => (
                    <div key={index} className="flex items-start space-x-reverse space-x-3">
                      <span className="text-[#905e26] font-bold text-xl">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{method}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Treatment Options Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.treatment.title}
                </h3>
                
                <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                  {data.treatment.content}
                </p>
                
                {/* Lifestyle - Optional */}
                {data.treatment.lifestyle && (
                  <div className="mb-6">
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-4 font-semibold rich-content-display">
                      {data.treatment.lifestyle.title}
                    </p>
                    <div className="space-y-3">
                      {data.treatment.lifestyle.options.map((option, index) => (
                        <div key={index} className="flex items-start space-x-reverse space-x-3">
                          <span className="text-[#905e26] font-bold text-xl">•</span>
                          <span className="text-base text-[#101828]/80 rich-content-display">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Topical Treatments */}
                <div className="mb-6">
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-4 font-semibold rich-content-display">
                    {data.treatment.topical.title}
                  </p>
                  <div className="space-y-3">
                    {data.treatment.topical.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <span className="text-[#905e26] font-bold text-xl">•</span>
                        <span className="text-base text-[#101828]/80 rich-content-display">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Treatment Sections */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Systemic Treatments */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.treatment.systemic.title}
                </h3>
                <div className="space-y-4">
                  {data.treatment.systemic.options.map((option, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{option}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Advanced Treatments */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.treatment.advanced.title}
                </h3>
                <div className="space-y-4">
                  {data.treatment.advanced.options.map((option, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{option}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Ocular Treatment Section - Optional */}
        {data.treatment.ocular && (
          <section className="py-16">
            <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.treatment.ocular.title}
                </h3>
                <div className="space-y-4">
                  {data.treatment.ocular.options.map((option, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{option}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Complications Section - Optional */}
        {data.complications && (
          <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
            <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.complications.title}
                </h3>
                <div className="space-y-4">
                  {data.complications.content.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Scar Treatment & When to See Doctor Sections */}
        <section className="py-16">
          <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Related Conditions / Scar Treatment Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.relatedConditions.title}
                </h3>
                <div className="space-y-4">
                  {data.relatedConditions.content.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{item}</span>
                      ) : (
                        <div className="relative pr-6">
                          <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* When to See Doctor Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Stethoscope className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.whenToSeeDoctor.title}
                </h3>
                <div className="space-y-4">
                  {data.whenToSeeDoctor.content.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-[#905e26] font-bold text-xl ml-3">•</span>
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Prognosis Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Target className="ml-2 h-6 w-6 text-[#905e26]" />
                {data.prognosis.title}
              </h3>
              <div className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display whitespace-pre-line">
                {data.prognosis.content}
              </div>
            </Card>
          </div>
        </section>

        {/* Summary Section */}
        {data.summaryTitle && data.summaryContent && (
          <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
            <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
              <Card className="p-8 border-[#905e26]/20 shadow-lg bg-gradient-to-br from-[#905e26]/5 to-white">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Star className="ml-2 h-6 w-6 text-[#905e26]" />
                  {data.summaryTitle}
                </h3>
                <div className="text-[#101828] leading-relaxed text-xl sm:text-lg space-y-4">
                  {data.summaryContent.map((paragraph, index) => (
                    <p key={index} className={index === data.summaryContent!.length - 1 ? 'font-semibold' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-[#101828] to-[#0a0f1a] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-3xl font-bold mb-6">
              מוכנים לקבל ייעוץ מקצועי?
            </h2>
            <p className="text-xl sm:text-lg mb-8 text-white/80">
              צרו קשר עוד היום לקביעת תור וקבלת טיפול מותאם אישית
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate('#contact')}
              className="bg-[#905e26] hover:bg-[#905e26]/90 text-white px-8 py-6 text-lg"
            >
              <Phone className="ml-2 h-5 w-5" />
              צרו קשר
            </Button>
          </div>
        </section>

        </main>
      </div>
    </div>
  );
}