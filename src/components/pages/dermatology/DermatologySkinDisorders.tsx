'use client';
import React from 'react';
import { DermatologyMain } from './DermatologyMain';
import { AcnePage } from './AcnePage';
import { PsoriasisPage } from './PsoriasisPage';
import { EczemaPage } from './EczemaPage';
import { RosaceaPage } from './RosaceaPage';
import { SimplePage } from './SimplePage';
import { DiseaseNavBar } from './DiseaseNavBar';

interface SkinDisordersProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function DermatologySkinDisorders({ activePage, onNavigate }: SkinDisordersProps) {
  const renderContent = () => {
    switch (activePage) {
      case 'all':
        return <DermatologyMain onNavigate={onNavigate} showHero={false} />;
      case 'acne':
        return <AcnePage onNavigate={onNavigate} />;
      case 'psoriasis':
        return <PsoriasisPage onNavigate={onNavigate} />;
      case 'eczema':
        return <EczemaPage onNavigate={onNavigate} />;
      case 'rosacea':
        return <RosaceaPage onNavigate={onNavigate} />;
      case 'rashes':
        return <SimplePage id="rashes" title="פריחות עור" description="עם כל כך הרבה גורמים שונים לפריחות עור, הצעד הראשון הוא לוודא שאנו יודעים בדיוק מהו המקור. לאחר מכן, נעבוד לטיפול בתסמינים ובגורם." icon="🔴" gradient="from-[#ff9a9e] to-[#fad0c4]" onNavigate={onNavigate} />;
      case 'infections':
        return <SimplePage id="infections" title="זיהומי עור" description="מיבלות מטרידות ועד שלפוחיות חום או שלבקת חוגרת, נעזור להפחית או למנוע זיהומי עור באמצעות תרופות מקומיות או סיסטמיות." icon="🦠" gradient="from-[#a1c4fd] to-[#c2e9fb]" onNavigate={onNavigate} />;
      case 'warts':
        return <SimplePage id="warts" title="יבלות" description="הקפאה, טיפול בלייזר, פילינג כימי, כריתה ואימונותרפיה להסרת יבלות." icon="❄️" gradient="from-[#c1dfc4] to-[#deecdd]" onNavigate={onNavigate} />;
      case 'growths':
        return <SimplePage id="growths" title="גידולי עור נפוצים" description="לרופאי העור שלנו יש בסיס ידע רחב וניסיון לאבחן גידולי עור ולהסביר את הפתרונות הטובים ביותר." icon="🔬" gradient="from-[#d4fc79] to-[#96e6a1]" onNavigate={onNavigate} />;
      case 'hives':
        return <SimplePage id="hives" title="אורטיקריה (סרפדת)" description="סרפדת יכולה להפריע לשינה ולפעילויות יומיומיות. סרפדת עם סחרחורת או קוצר נשימה עלולה לסמן תגובה אלרגית מסכנת חיים." icon="⚡" gradient="from-[#ff9a9e] to-[#fecfef]" onNavigate={onNavigate} />;
      case 'vitiligo':
        return <SimplePage id="vitiligo" title="ויטיליגו" description="טיפולים להחזרת הפיגמנטציה כולל תרופות, PUVA, UVB ולייזרים." icon="🎨" gradient="from-[#e0c3fc] to-[#8ec5fc]" onNavigate={onNavigate} />;
      case 'itchy':
        return <SimplePage id="itchy" title="גירוד בעור" description="כאשר אמצעי טיפול ביתיים לא עובדים, נקבע את הסיבה לגירוד ונמליץ על טיפול מתאים." icon="🤚" gradient="from-[#ffecd2] to-[#fcb69f]" onNavigate={onNavigate} />;
      case 'scars':
        return <SimplePage id="scars" title="הפחתת צלקות" description="ממשחות ועד דרמברזיה, לייזר ומיקרונידלינג להפחתת צלקות." icon="✨" gradient="from-[#d4a5a5] to-[#e9bcbc]" onNavigate={onNavigate} />;
      case 'hair':
        return <SimplePage id="hair" title="מצבי שיער וקרפת" description="דילול שיער, קשקשים ובעיות קרפת. מגוון רחב של אפשרויות טיפול." icon="💇" gradient="from-[#667eea] to-[#764ba2]" onNavigate={onNavigate} />;
      case 'patch':
        return <SimplePage id="patch" title="בדיקת רגישות" description="כאשר אלרגנים מעוררים תגובות בעור, זיהוי הגורם הוא צעד משמעותי במציאת הפתרון." icon="🧫" gradient="from-[#f093fb] to-[#f5576c]" onNavigate={onNavigate} />;
      case 'nails':
        return <SimplePage id="nails" title="מצבי ציפורניים" description="ציפורניים יכולות להיות רגישות לזיהומים, שינויי צבע, עיוותים וגידולים. אין להתעלם מהתסמינים." icon="💅" gradient="from-[#4facfe] to-[#00f2fe]" onNavigate={onNavigate} />;
      case 'melanoma':
        return <SimplePage id="melanoma" title="סרטן העור" description="גילוי מוקדם מציל חיים. סרטן העור הוא הסרטן הנפוץ ביותר, אך גם הניתן ביותר לטיפול בגילוי מוקדם." icon="🔍" gradient="from-[#434343] to-[#000000]" onNavigate={onNavigate} />;
      case 'fungal':
        return <SimplePage id="fungal" title="פטרת" description="טיפול בזיהומים פטרייתיים של העור, הציפורניים והקרפת בתרופות ולייזר." icon="🍄" gradient="from-[#a8caba] to-[#5d4157]" onNavigate={onNavigate} />;
      case 'herpes':
        return <SimplePage id="herpes" title="הרפס" description="תרופות אנטי-ויראליות להקלה על התסמינים ומניעת התפרצויות חוזרות." icon="💊" gradient="from-[#fbc2eb] to-[#a6c1ee]" onNavigate={onNavigate} />;
      default:
        return <DermatologyMain onNavigate={onNavigate} />;
    }
  };

  return (
    <section className="pt-8 pb-16 min-h-screen overflow-y-auto">
      {/* Title Section - Only show for 'all' page */}
      {activePage === 'all' && (
        <>
          {/* Gradient Info Box */}
          <div className="py-2 sm:py-4 md:py-0 flex items-center justify-center" id="dermatology-diseases-section">            
            <div 
              className="dermatology-gradient relative overflow-hidden w-full md:mx-0 border-none"
              style={{
                borderRadius: '0',
                padding: typeof window !== 'undefined' && window.innerWidth >= 768 ? '40px 16px 60px 16px' : '20px 16px 40px 16px',
                margin: '0',
                maxWidth: '100%',
                width: '100%',
                position: 'relative',
                transition: 'all 0.8s ease-out',
                color: 'white',
                boxShadow: 'none',
                background: 'linear-gradient(135deg, #101828 0%, #0a0f1a 100%)'
              }}
            >
              {/* רקע מסתובב ונע */}
              <div 
                className="rotating-bg"
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `
                    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.3) 0%, transparent 70%)
                  `,
                  pointerEvents: 'none',
                  animation: 'rotate 15s linear infinite',
                }}
              />
              

              {/* שכבת הדגשה נוספת למובייל */}
              <div 
                className="block sm:hidden absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, rgba(16, 24, 40, 0.2) 0%, transparent 50%, rgba(10, 15, 26, 0.3) 100%)',
                }}
              />
              
              {/* תוכן */}
              <div style={{ position: 'relative', zIndex: 1 }} className="mx-auto max-w-[1800px] px-8 md:px-16">
                {/* Mobile: Centered layout */}
                <div className="md:hidden text-center mb-8">
                  <h1 className="text-2xl font-bold text-white mb-4">
                טיפול מקצועי במחלות עור
                  </h1>
                  
                  <div className="text-right">
                    <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-4">
                      המרפאה מתמחה באבחון ובטיפול מקיף במגוון רחב של מחלות עור ושיער, כולל: אקזמה, פסוריאזיס, אקנה, מחלות אוטואימוניות של העור, נשירת שיער מכל הסוגים, סבוריאה, דרמטיטיס, גידולי עור שפירים ועוד.
                    </p>
                    <p className="text-xl text-white/90 leading-relaxed mb-4">
                      אנו מבצעים אבחונים מתקדמים, ביופסיות עור ומתאימים לכל מטופל תכנית טיפול אישית המבוססת על הידע מדעי העדכני ביותר.
                    </p>
                    <p className="text-xl text-white/90 leading-relaxed">
                      אנו פועלים בתיאום מלא עם מומחים משלימים לפי הצורך, ומחויבים להישאר בחזית המחקר קליני והחדשנות ברפואת עור ושיער — לטובת הענקת טיפול מעמיק, בטוח ומדויק לכל מטופל ומטופלת.
                    </p>
                  </div>
                </div>
                
                {/* Desktop: Two column layout with title on right, text on left */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-16 md:items-start">
                  {/* Right side: Title */}
                  <div className="text-center">
                <h1 className="text-4xl font-bold text-white">
                  טיפול מקצועי במחלות עור
                </h1>
                <h1 className="text-2xl font-bold text-white">
              ניסיון קליני ומחקרי רב
                </h1>
                
                {/* Slogan - under title (desktop) */}
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white animate-scaleLineUp - 1" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                    אבחון מדויק 
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                    הינו
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white animate-scaleLineUp-delay-1" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                     הבסיס להצלחת הטיפול
                  </p>
                </div>
                  </div>
                  
                  {/* Left side: Description text */}
                  <div className="text-right">
                    <p className="text-xl text-white/90 leading-relaxed mb-4">
                      המרפאה מתמחה באבחון ובטיפול מקיף במגוון רחב של מחלות עור ושיער, כולל: אקזמה, פسورיאזיס, אקנה, מחלות אוטואימוניות של העור, נשירת שיער מכל הסוגים, סבוריאה, דרמטיטיס, גידולי עור שפירים ועוד.
                    </p>
                    <p className="text-xl text-white/90 leading-relaxed mb-4">
                      אנו מבצעים אבחונים מתקדמים, ביופסיות עור ומתאימים לכל מטופל תכנית טיפול אישית המבוססת על הידע מדעי העדכני ביותר.
                    </p>
                    <p className="text-xl text-white/90 leading-relaxed">
                      אנו פועלים בתיאום מלא עם מומחים משלימים לפי הצורך, ומחויבים להישאר בחזית המחקר קליני והחדשנות ברפואת עור ושיער — לטובת הענקת טיפול מעמיק, בטוח ומדויק לכל מטופל ומטופלת.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title Section - Moved after gradient */}
          <div className="mb-10 max-w-[1600px] mx-auto pr-2 pl-6 lg:pr-3 lg:pl-8 mt-10">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-6 text-center lg:mt-8">
              תחומי התמחות
            </h2>
          </div>
        </>
      )}

      {/* Disease Navigation Bar - Show ONLY on 'all' page */}
      {activePage === 'all' && (
        <DiseaseNavBar activeId={activePage} onSelect={onNavigate} />
      )}

      <div className={`${activePage === 'all' ? 'max-w-[1600px] mx-auto px-4 mt-12 md:mt-16' : 'w-full p-0 m-0'}`}>
        {/* Main Content - Full Width */}
        <div className="w-full">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}