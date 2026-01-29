'use client';
import React from 'react';
import heroImage from '../../../assets/52051672476c7ba575e5ef20774b845d011fb9ca_converted.jpg';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white pt-16 lg:pt-18 pb-12 lg:pb-0 overflow-hidden lg:h-[80vh]">
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
        <div className="bubble bubble-large animate-floatBubbles" style={{ left: '85%', top: '60%', animationDuration: '21s', animationDelay: '-9s' }}></div>
        
        {/* Small bubbles with fast movement */}
        <div className="bubble bubble-small animate-floatBubbles" style={{ left: '5%', animationDuration: '12s', animationDelay: '-4s' }}></div>
        <div className="bubble bubble-small animate-floatBubbles " style={{ left: '20%', animationDuration: '11s', animationDelay: '-7s' }}></div>
        <div className="bubble bubble-small animate-floatBubbles" style={{ left: '40%', animationDuration: '10s', animationDelay: '-11s' }}></div>
        <div className="bubble bubble-small animate-floatBubbles " style={{ left: '60%', animationDuration: '13s', animationDelay: '-1s' }}></div>
        <div className="bubble bubble-small animate-floatBubbles" style={{ left: '90%', animationDuration: '9s', animationDelay: '-14s' }}></div>
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:h-full">
        {/* Title - Shows first on mobile */}
        <div className="w-full lg:hidden text-center px-4 sm:px-6 order-1">
          <div className="max-w-2xl mx-auto pt-4 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold animate-heroTitlePulse">
              יעוץ וטיפולי שיער
            </h1>
            {/*<p className="text-lg md:text-xl text-white/80 mt-3">*/}
            <p className="text-xl md:text-2xl font-bold mt-4">
              ידע מעמיק ,ניסיון קליני רב<br />
              וגישה טיפולית אישית
            </p>
          </div>
        </div>

        {/* First paragraph - Shows second on mobile */}
        <div className="w-full lg:hidden text-center px-4 sm:px-6 order-2">
          <div className="max-w-2xl mx-auto pb-6">
            <p className="text-lg leading-relaxed text-white/90">
במרפאתנו אנו מתמודדים עם מגוון רחב של בעיות שיער וקרפת, החל מתלונות קלות של דלילות או נשירה, ועד למחלות כרוניות מורכבות והתקרחות צלקתית או לא-צלקתית.
            </p>
          </div>
        </div>

        {/* Image - Shows third on mobile, right side on desktop */}
        <div className="w-full lg:w-1/2 order-3 lg:order-2">
          <div className="relative w-full h-full">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="בדיקה דר直通车קופית מתקדמת - אבחון מקצועי של קרקפת ושיער עם מכשיר דר直通车קופ"
                className="w-[calc(100%-2rem)] lg:w-full mx-4 lg:mx-0 h-full object-cover rounded-lg lg:rounded-none"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Text Content - Shows fourth on mobile (second paragraph only), left side on desktop (full content) */}
        <div className="w-full lg:w-1/2 text-center lg:text-right px-4 sm:px-6 lg:px-8 lg:pr-16 order-4 lg:order-1 flex items-center">
          <div className="max-w-2xl mx-auto lg:mr-0 lg:ml-auto py-8 lg:py-0">
            {/* Title for desktop only */}
            <h1 className="hidden lg:block text-4xl md:text-5xl font-bold mb-3 animate-heroTitlePulse lg:-mt-32">
              יעוץ וטיפולי שיער
            </h1>
            <p className="hidden lg:block text-2xl font-bold text-white/80 mt-6">
              ידע מעמיק, ניסיון קליני רב וגישה טיפולית אישית
            </p>
            <p className="hidden lg:block text-lg leading-relaxed text-white/90 mt-6">
במרפאתנו אנו מתמודדים עם מגוון רחב של בעיות שיער וקרפת, החל מתלונות קלות של דלילות או נשירה, ועד למחלות כרוניות מורכבות והתקרחות צלקתית או לא-צלקתית.
            </p>
           
            <p className="text-lg leading-relaxed text-right text-white/90 lg:mt-3">
            טיפול במחלות שיער וקרפת דורש הכשרה מיוחדת והתמודדות עם מקרים מורכבים. <br/>
            הניסיון של ד"ר רימה מבטיח שתקבל/י אבחנה מדויקת ופרוטוקול טיפול יעיל, גם במצבים שלא מצאו להם פתרון בעבר.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}