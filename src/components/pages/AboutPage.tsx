'use client';
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import MedicalApproachComponent from "../MedicalApproachComponent";
import drRimmaImage from "../../assets/36b3be41fd7ff933e013c53c69ce107b32dffae8_converted.jpg";
import eimecLogo from "../../assets/d8aa2c5586ea77aec3351b543bd57f13bf56f394_converted.jpg";
import spainFlag from "../../assets/c1e4f0822ee34cb816670986b7eb642feaf6eaae_converted.jpg";
import heroBackground from "../../assets/60584f0d70d36b66d2672fd89376df07e4b984bc_converted.jpg";
import ishrsLogo from "../../assets/955a8e208e1c2e180621afbd81607474be2fd734_converted.jpg";
import medicalCollage from "../../assets/eef3fa7cf38cc61b4b86133a679a75c4a915049e_converted.jpg";
import joinUsMessage from "../../assets/680b365e484ce5c951420978d5e7583052447ea6_converted.jpg";
import doctorWithTechnology from "../../assets/4d7a29ebbb109d717135e7e7f3e5f8633b7adeff_converted.jpg";
import doctorConsultation from "../../assets/bd575fd420f6e4ec5d231d1b2d3e1af71a3b59c1_converted.jpg";
import doctorDiagnosis from "../../assets/b5e5b3cdc9a15153eaa1b284517c067096e73e89_converted.jpg";
import surgicalProcedure from "../../assets/0aaf0c6bf51ca38c17c9c8d2c63f8e3118794ea4_converted.jpg";
import advancedDiagnostics from "../../assets/d31ad26ff3debf4a999d6a8bd5c29aa0081789a7_converted.jpg";
import aboutHeroImage from "../../assets/7fac0693d4aec0cacf67de3f6abcce327daf1227_converted.jpg";
import {
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  Shield,
  Zap,
  Phone,
  Mail,
  MapPin,
  Microscope,
} from "lucide-react";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={aboutHeroImage}
            alt="ד״ר רימה לאופר - מומחית לרפואת עור והשתלות שיער"
            className="w-full h-full object-cover object-top"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-8 right-8 z-10 text-right px-4 sm:px-6 lg:px-8 max-w-4xl" dir="rtl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white animate-fade-in leading-tight">
            אודות<br />
            ד״ר רימה לאופר בריטבה
          </h1>
        </div>
      </section>

      {/* Personal Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Text Content - Right Side */}
            <div className="lg:col-span-7 text-right" dir="rtl">
              <p className="text-lg mb-6 leading-relaxed text-[#101828]">
                ד"ר רימה לאופר בריטבה היא רופאת עור מומחית,
                בוגרת הפקולטה לרפואה של הטכניון, בעלת ניסיון
                קליני עשיר ברפואת עור, בעיות קרקפת, השתלות שיער
                ואסתטיקה רפואית.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-[#101828]">
                את התמחותה בדרמטולוגיה סיימה במרכז החולים רמב"ם, ובמהלך השנים התמקדה בטיפול בבעיות שונות, תוך שילוב מחקר קליני ומעבדתי מתקדם. בהליך ההתמחותה נבחרה לפרויקט "עתידים" למצטיינים,_Framework
                שעסק במנגנוני הפעולה של מחלת האלופציה אראטה – מחלה אוטואימונית הגורמת לנשירת שיער.
              </p>
              <p className="text-lg mb-8 leading-relaxed text-[#101828]">
                כחלק מהמחויבות למצוינות מקצועית, ד"ר לאופר
                השלימה השתלמויות קליניות והתמחויות באירופה –
                ובהן שהות ממושכת אצל ד"ר פאקו חימנס אקוסטה
                וביחידה לשיער של ד"ר ונו סרגיו במדрид, מהמובילים
                בעולם בתחום הטריכולוגיה והשתלות שיער. בנוסף,
                סיימה התמחות קלינית במסגרת ה-ISHRS, והשתלמות
                באסתטיקה רפואית מתקדמת במרכז ה- EIMEC בברצלונה.
              </p>
            </div>

            {/* Logos - Left Side */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white border border-[#101828]/10 rounded-xl p-6 flex items-center gap-4">
                  <img
                    src="https://md.technion.ac.il/wp-content/uploads/2018/07/Medicine_Heb-Edited-118px.png"
                    alt="הפקולטה לרפואה - הטכניון"
                    className="h-16 w-16 object-contain flex-shrink-0"
                  />
                  <div className="text-sm text-[#101828] text-right flex-1" dir="rtl">
                    בוגרת הפקולטה לרפואה - הטכניון
                  </div>
                </div>
                <div className="bg-white border border-[#101828]/10 rounded-xl p-6 flex items-center gap-4">
                  <img
                    src="https://www.rambam.org.il/files/Logo/RambamHCC2022.pdf.svg"
                    alt="בית חולים רמב״ם"
                    className="h-16 w-16 object-contain flex-shrink-0"
                  />
                  <div className="text-sm text-[#101828] text-right flex-1" dir="rtl">
                    התמחות בדרמטולוגיה - רמב״ם
                  </div>
                </div>
                <div className="bg-white border border-[#101828]/10 rounded-xl p-6 flex items-center gap-4">
                  <img
                    src={ishrsLogo}
                    alt="ISHRS"
                    className="h-16 w-16 object-contain flex-shrink-0"
                  />
                  <div className="text-sm text-[#101828] text-right flex-1" dir="rtl">
                    חברה ב-ISHRS - הארגון הבינלאומי להשתלות שיער
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Approach Component - Animated */}
      <MedicalApproachComponent />

      {/* Additional Medical Content */}
      <section className="bg-white py-20">
        <div className="lg:grid lg:grid-cols-2 lg:min-h-[600px]">
          {/* Mobile: Additional Content */}
          <div className="lg:hidden px-4 sm:px-6 pb-12">
            {/* Mobile Rest of Content */}
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#101828] rounded-xl">
                <div className="flex-1">
                  <h5 className="font-semibold text-white text-sm md:text-base">
                    ידע רפואי מעודכן וטכנולוגיה מתקדמת
                  </h5>
                  <p className="text-sm text-white/80">
                    שימוש בטכנולוגיות ושיטות הטיפול העדכניות
                  </p>
                </div>
                <div className="w-12 h-12 bg-white text-[#101828] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <Microscope className="h-6 w-6" />
                </div>
              </div>
              {/* Mobile Images - After the component */}
              <div className="w-full max-w-md mx-auto mb-8">
                <div className="space-y-6">
                  {/* תמונה ראשונה */}
                  <div className="relative">
                    <img
                      src={doctorWithTechnology}
                      alt="רופאה מומחית עובדת עם טכנולוגיה מתקדמת - מיקרוסקופ ומסכי אבחון מעבדתיים"
                      className="w-full h-48 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 rounded-xl"></div>
                  </div>

                  {/* תמונה שנייה */}
                  <div className="relative">
                    <img
                      src={doctorConsultation}
                      alt="ייעוץ רפואי אישי - רופאה מסבירה תכנית טיפול מותאמת אישית למטופל"
                      className="w-full h-48 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </div>

              <p className="text-lg text-[#101828] leading-relaxed">
                הגישה הרפואית במרפאה מבוססת על שילוב בין ידע
                רפואי מעודכן, טכנולוגיה מתקדמת. המטופלים נהנים
                מגישה רפואית חדשנית הנשענת על מחקר עדכני ומכשור
                רפואי מתקדם. ד"ר לאופר משתתפת בכנסים מקצועיים
                ובפורומים בינלאומיים מובילים ומיישמת גישות חדשות
                וטכניקות עדכניות מעולמות השתלות שיער, רפואת עור,
                טריכולוגיה ורפואה רגנרטיבית. היא מקפידה להתעדכן
                במחקרים, פרסומים רפואיים ופתרונות מבוססי מדע –
                ולתרגם אותם לפרקטיקה טיפולית יומיומית.
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          {/* Left column - Image (Responsive layout) */}
          <div className="hidden lg:flex relative order-1 lg:order-2 items-center justify-center px-8 py-20">
            {/* Desktop Layout - Overlapping Images */}
            <div className="relative w-full max-w-lg">
              {/* תמונה תחתונה (ראשונה) - מקוטנת וממורכזת */}
              <img
                src={doctorWithTechnology}
                alt="רופאה מומחית עובדת עם טכנולוגיה מתקדמת - מיקרוסקופ ומסכי אבחון מעבדתיים"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
              />

              {/* שכבת חפיפה */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 rounded-2xl"></div>

              {/* תמונה עליונה (מדורגת/מוסטת מעט) */}
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[50%] max-w-[300px] shadow-lg rounded-lg overflow-hidden border-4 border-white">
                <img
                  src={doctorConsultation}
                  alt="ייעוץ רפואי אישי - רופאה מסבירה תכנית טיפול מותאמת אישית למטופל"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right column - Content (Desktop only) */}
          <div className="hidden lg:flex px-4 sm:px-6 lg:px-12 py-20 flex-col justify-start order-2 lg:order-1">
            <div className="max-w-2xl lg:max-w-4xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#101828] rounded-xl">
                  <div className="flex-1">
                    <h5 className="font-semibold text-white text-sm md:text-base">
                      ידע רפואי מעודכן וטכנולוגיה מתקדמת
                    </h5>
                    <p className="text-sm text-white/80">
                      שימוש בטכנולוגיות ושיטות הטיפול העדכניות
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white text-[#101828] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Microscope className="h-6 w-6" />
                  </div>
                </div>

                <p className="text-lg text-[#101828] leading-relaxed">
                  הגישה הרפואית במרפאה מבוססת על שילוב בין ידע
                  רפואי מעודכן, טכנולוגיה מתקדמת. המטופלים נהנים
                  מגישה רפואית חדשנית הנשענת על מחקר עדכני
                  ומכשור רפואי מתקדם. ד"ר לאופר משתתפת בכנסים
                  מקצועיים ובפורומים בינלאומיים מובילים ומיישמת
                  גישות חדשות וטכניקות עדכניות מעולמות השתלות
                  שיער, רפואת עור, טריכולוגיה ורפואה רגנרטיבית.
                  היא מקפידה להתעדכן במחקרים, פרסומים רפואיים
                  ופתרונות מבוססי מדע ולתרגם אותם לפרקטיקה
                  טיפולית יומיומית.
                </p>

                <p className="text-lg text-[#101828] leading-relaxed">
                  כל טיפול מתחיל באבחון מקיף ונבנה בהתאמה מלאה
                  לצרכים ולמטרות הייחודיים של כל אחד ואחת.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Care */}
      <section className="bg-white pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left column - Images */}
          <div className="relative order-2 lg:order-1 flex items-center justify-center px-8 py-20">
            {/* Mobile Layout - images removed from here */}

            {/* Desktop Layout - Collage style like doctorWithTechnology and doctorConsultation */}
            <div className="hidden lg:block relative w-full max-w-lg">
              {/* תמונה ראשית גדולה */}
              <img
                src={surgicalProcedure}
                alt="טיפול מתקדם - רופאה מומחית מבצעת פרוצדורה עם ציוד מיקרוסקופי מתקדם"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
              />

              {/* תמונה שנייה - מדורגת בצד ימין תחתון */}
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[50%] max-w-[300px] shadow-lg rounded-lg overflow-hidden border-4 border-white">
                <img
                  src={advancedDiagnostics}
                  alt="אבחנה מתקדמת - בדיקה מקצועית עם מכשיר אבחון ותצוגה דיגיטלית מפורטת"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* תמונה שלישית - מדורגת בצד שמאל עליון */}
              <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[50%] max-w-[250px] shadow-lg rounded-lg overflow-hidden border-4 border-white">
                <img
                  src={doctorDiagnosis}
                  alt="אבחון מקצועי - ד״ר לאופר בודקת מטופל עם מיקרוסקופ מתקדם ותצוגת מסך מפורטת"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="px-4 sm:px-6 lg:px-12 py-20 flex flex-col justify-start order-1 lg:order-2 bg-white">
            <div className="max-w-2xl">
              <div className="flex items-center justify-between p-4 bg-[#101828] rounded-xl mb-6">
                <div className="flex-1">
                  <h5 className="font-semibold text-white text-xl">
                    גישה אישית ואנושית
                  </h5>
                  <p className="text-sm text-white/80">
                    התאמה אישית לכל מטופל ולמטופלת
                  </p>
                </div>
                <div className="w-12 h-12 bg-white text-[#101828] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <Heart className="h-6 w-6" />
                </div>
              </div>

              {/* Mobile Images - 3 images stacked after the "גישה אישית ואנושית" element */}
              <div className="lg:hidden w-full max-w-md mx-auto mb-8 space-y-6">
                <div className="relative">
                  <img
                    src={doctorDiagnosis}
                    alt="אבחון מקצועי - ד״ר לאופר בודקת מטופל עם מיקרוסקופ מתקדם ותצוגת מסך מפורטת"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="relative">
                  <img
                    src={surgicalProcedure}
                    alt="טיפול מתקדם - רופאה מומחית מבצעת פרוצדורה עם ציוד מיקרוסקופי מתקדם"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="relative">
                  <img
                    src={advancedDiagnostics}
                    alt="אבחנה מתקדמת - בדיקה מקצועית עם מכשיר אבחון ותצוגה דיגיטלית מפורטת"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>

              <p className="text-lg text-[#101828] leading-relaxed mb-4">
                ד"ר לאופר ידועה ברגישותה, באנושיותה וביכולתה
                לראות את האדם שמאחורי הבעיה הרפואית. היא מקפידה
                להקשיב באמת – להבין את הצרכים, החששות והציפיות
                של כל מטופל ומטופלת, ולבנות תהליך טיפול המותאם
                לא רק לאבחנה הרפואית, אלא גם לאישיות ולאורח
                החיים. במרפאה, כל מטופל זוכה לליווי מקצועי ואישי
                לכל אורך הדרך, תוך שמירה על קשר ישיר עם הרופאה,
                עדכון רציף ובקרה על התקדמות התהליך. האווירה היא
                תומכת, נעימה ובטוחה – כזו שמאפשרת תחושת ביטחון
                ושקט נפשי – עם מחויבות אמיתית להשגת תוצאות
                אסתטיות ורפואיות מיטביות, המשלבות מראה טבעי
                ובריאות לאורך זמן.
              </p>
              <p className="text-lg text-[#101828] leading-relaxed">
                כל מטופל זוכה לליווי מקצועי ואישי, באווירה
                תומכת, מקצועית ובטוחה – עד להשגת תוצאות אסתטיות
                ורפואיות מיטביות.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}