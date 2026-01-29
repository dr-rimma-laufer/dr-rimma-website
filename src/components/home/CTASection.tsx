'use client';

import { Button } from "../ui/button";
import { Calendar, Phone, MessageCircle, CheckCircle, Shield, Clock } from "lucide-react";
import { AppointmentDialog } from '../AppointmentDialog';

export function CTASection() {
  return (
    <section className="relative min-h-screen bg-[#101828] overflow-hidden flex items-center hebrew-text">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="text-center text-white">
          {/* Main Heading */}
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              מוכנים להתחיל את המסע שלכם?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              הזמינו היום ייעוץ ראשוני חינם עם ד״ר רימה לאופר 
              וגלו את הפתרון הטוב ביותר עבורכם
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <AppointmentDialog>
              <Button 
                size="lg"
                className="bg-white text-[#101828] hover:bg-white/90 hover:text-[#101828] hover:bg-opacity-90 px-10 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 font-semibold text-lg"
              >
                <Calendar className="ml-3 h-6 w-6" />
                קביעת תור ייעוץ חינם
              </Button>
            </AppointmentDialog>
            
            <Button 
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#101828] hover:border-white px-10 py-4 rounded-2xl transition-all duration-300 hover:scale-105 font-semibold text-lg"
              onClick={() => {
                console.log('CTA phone button clicked'); // Debug log
                try {
                  window.open('tel:+972501234567', '_self');
                } catch (error) {
                  console.error('Error making phone call:', error);
                  window.location.href = 'tel:+972501234567';
                }
              }}
            >
              <Phone className="ml-3 h-6 w-6" />
              התקשרו עכשיו
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">ייעוץ ראשוני חינם</h3>
              <p className="text-white/80 leading-relaxed">
                בדיקה מקיפה וייעוץ מקצועי ללא עלות, כולל תכנית טיפול מותאמת אישית
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">מקצועיות ללא פשרות</h3>
              <p className="text-white/80 leading-relaxed">
                טכנולוגיות מתקדמות ושיטות טיפול חדשניות עם ניסיון עשיר מאירופה
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">ליווי מלא</h3>
              <p className="text-white/80 leading-relaxed">
                ליווי אישי ומעקב צמוד לפני, במהלך ואחרי הטיפול עד להשגת התוצאה המיטבית
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm">רישיון משרד הבריאות</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm">הכשרה באירופה</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm">מעל 1000 טיפולים מוצלחים</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm">ציוד מתקדם ומעקר</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-40 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-40 left-40 w-40 h-40 border border-white/5 rounded-full"></div>
        
        {/* Subtle glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
