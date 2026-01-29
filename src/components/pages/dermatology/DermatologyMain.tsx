'use client';
import React from 'react';
import { AcnePage } from './AcnePage';
import { PsoriasisPage } from './PsoriasisPage';
import { EczemaPage } from './EczemaPage';
import { Acne2Page } from './Acne2Page';
import { VitiligioPage } from './VitiligioPage';
import { X } from 'lucide-react';
import acneImage from '../../../assets/1202b93f77efb343902f6cb15cdba9a7d46e2cbc_converted.jpg';
import vitiligioImage from '../../../assets/fc347238e8d57d9248937f750951e4f70acfdee7_converted.jpg';

interface DermatologyMainProps {
  onNavigate: (page: string) => void;
  showHero?: boolean;
}

export function DermatologyMain({ onNavigate, showHero = true }: DermatologyMainProps) {
  const [selectedDisease, setSelectedDisease] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const originalBodyStyleRef = React.useRef<string>('');
  const originalScrollPositionRef = React.useRef<number>(0);

  // Check if screen is mobile size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manage body scroll when modal is open (only for desktop)
  React.useEffect(() => {
    if (selectedDisease && !isMobile) {
      // Save the current scroll position and body styles
      originalScrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
      originalBodyStyleRef.current = document.body.style.overflow;
      
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${originalScrollPositionRef.current}px`;
      document.body.style.width = '100%';
    }

    return () => {
      if (!isMobile) {
        // Restore body scroll and position
        document.body.style.overflow = originalBodyStyleRef.current;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, originalScrollPositionRef.current);
      }
    };
  }, [selectedDisease, isMobile]);

  const diseases = [
    { id: 'acne', title: 'אקנה', description: 'יש לנו מגוון טיפולים זמינו לאקנה, כולל טיפולים במרשם ופרוצדורליים.', icon: '🧴', gradient: 'from-[#ffecd2] to-[#fcb69f]', image: acneImage },
    { id: 'psoriasis', title: 'פסוריאזיס', description: 'גישה הוליסטית להתמודדות עם מצב רציני זה, כולל תרופות ביולוגיות.', icon: '🩺', gradient: 'from-[#a8edea] to-[#fed6e3]', image: 'https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc29yaWFzaXMlMjBza2lufGVufDF8fHx8MTc2NTIyOTEyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'eczema', title: 'אקזמה', description: 'נזהה את מקור האקזמה ונמצא את הדרך הטובה ביותר לשבור את מעגל הגירוד-פריחה.', icon: '🧪', gradient: 'from-[#d299c2] to-[#fef9d7]', image: 'https://images.unsplash.com/photo-1609542499975-4ca8bde933db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY3plbWElMjBza2luJTIwY29uZGl0aW9ufGVufDF8fHx8MTc2NTIwMTU4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'acne2', title: 'רוזציאה', description: 'טיפול מתאים הוא חיוני. נקבע האם IPL או טיפולים אחרים מתאימים לכם.', icon: '🌡️', gradient: 'from-[#ffecd2] to-[#fcb69f]', image: 'https://images.unsplash.com/photo-1541752988809-6073b61ad3db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NhY2VhJTIwc2tpbnxlbnwxfHx8fDE3NjUyMjkxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'rashes', title: 'פריחות עור', description: 'עם כל כך הרבה גורמים שונים לפריחות, נוודא שאנו יודעים בדיוק מהו המקור.', icon: '🔴', gradient: 'from-[#ff9a9e] to-[#fad0c4]', image: 'https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwcmFzaCUyMGRlcm1hdG9sb2d5fGVufDF8fHx8MTc2NTIyOTEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'infections', title: 'זיהומי עור', description: 'מיבלות ועד שלבקת חוגרת, נעזור להפחית או למנוע זיהומים.', icon: '🦠', gradient: 'from-[#a1c4fd] to-[#c2e9fb]', image: 'https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwaW5mZWN0aW9uJTIwbWVkaWNhbHxlbnwxfHx8fDE3NjUyMjkxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'warts', title: 'יבלות', description: 'הקפאה, לייזר, פילינג כימי ואימונותרפיה להסרת יבלות.', icon: '❄️', gradient: 'from-[#c1dfc4] to-[#deecdd]', image: 'https://images.unsplash.com/photo-1516815989420-9cb5ef0fce78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXJtYXRvbG9neSUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NjUyMjkxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'growths', title: 'גידולי עור', description: 'ידע וניסיון לאבחן גידולי עור ולהסביר את הפתרונות הטובים ביותר.', icon: '🔬', gradient: 'from-[#d4fc79] to-[#96e6a1]', image: 'https://images.unsplash.com/photo-1601839777132-b3f4e455c369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwZXhhbWluYXRpb24lMjBkb2N0b3J8ZW58MXx8fHwxNzY1MjI5MTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'hives', title: 'אורטיקריה', description: 'סרפדת יכולה להפריע לשינה ולפעילויות. נזהה את הגורם ונטפל.', icon: '⚡', gradient: 'from-[#ff9a9e] to-[#fecfef]', image: 'https://images.unsplash.com/photo-1723540634462-528708cc17aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXZlcyUyMHNraW4lMjBhbGxlcmd5fGVufDF8fHx8MTc2NTIyOTEzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'vitiligo', title: 'ויטיליגו', description: 'טיפולים להחזרת הפיגמנטציה כולל PUVA, UVB ולייזרים.', icon: '🎨', gradient: 'from-[#e0c3fc] to-[#8ec5fc]', image: vitiligioImage },
    { id: 'itchy', title: 'גירוד בעור', description: 'נקבע את הסיבה לגירוד ונמליץ על טיפול מתאים.', icon: '🤚', gradient: 'from-[#ffecd2] to-[#fcb69f]', image: 'https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGNoeSUyMHNraW4lMjBkZXJtYXRvbG9neXxlbnwxfHx8fDE3NjUyMjkxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'scars', title: 'הפחתת צלקות', description: 'ממשחות ועד לייזר ומיקרונידלינג להפחתת צלקות.', icon: '✨', gradient: 'from-[#d4a5a5] to-[#e9bcbc]', image: 'https://images.unsplash.com/photo-1583966832159-9baaa6c1cdcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwc2NhciUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NjUyMjkxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'hair', title: 'שיער וקרפת', description: 'דילול שיער, קשקשים ובעיות קרפת. מגוון רחב של טיפולים.', icon: '💇', gradient: 'from-[#667eea] to-[#764ba2]', image: 'https://images.unsplash.com/photo-1643837833100-8b2ebd7127bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FscCUyMGhhaXIlMjBkZXJtYXRvbG9neXxlbnwxfHx8fDE3NjUyMjkxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'patch', title: 'בדיקת רגישות', description: 'זיהוי אלרגנים המעוררים תגובות בעור.', icon: '🧫', gradient: 'from-[#f093fb] to-[#f5576c]', image: 'https://images.unsplash.com/photo-1529386317747-0a2a51add902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGxlcmd5JTIwcGF0Y2glMjB0ZXN0fGVufDF8fHx8MTc2NTIyOTEzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'nails', title: 'מצבי ציפורניים', description: 'זיהומים, שינויי צבע ועיוותים בציפורניים.', icon: '💅', gradient: 'from-[#4facfe] to-[#00f2fe]', image: 'https://images.unsplash.com/photo-1612239395391-dab5de40aa0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwaGVhbHRoJTIwZGVybWF0b2xvZ3l8ZW58MXx8fHwxNzY1MjI5MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'melanoma', title: 'סרטן העור', description: 'גילוי מוקדם מציל חיים. בדיקות מיפוי שומות וטיפול.', icon: '🔍', gradient: 'from-[#434343] to-[#000000]', image: 'https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwY2FuY2VyJTIwZXhhbWluYXRpb258ZW58MXx8fHwxNzY1MjI5MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'fungal', title: 'פטרת', description: 'טיפול בזיהומים פטרייתיים בתרופות ולייזר.', icon: '🍄', gradient: 'from-[#a8caba] to-[#5d4157]', image: 'https://images.unsplash.com/photo-1712011465471-2be8d29c91bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5nYWwlMjBza2luJTIwaW5mZWN0aW9ufGVufDF8fHx8MTc2NTIyOTEzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'herpes', title: 'הרפס', description: 'תרופות אנטי-ויראליות להקלה ומניעת התפרצויות.', icon: '💊', gradient: 'from-[#fbc2eb] to-[#a6c1ee]', image: 'https://images.unsplash.com/photo-1690306815613-f839b74af330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGVybWF0b2xvZ3klMjBjbGluaWN8ZW58MXx8fHwxNzY1MjI5MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  ];

  const handleDiseaseClick = (diseaseId: string) => {
    console.log('🔵 Disease clicked:', diseaseId);
    console.log('🔵 isMobile:', isMobile);
    console.log('🔵 window.innerWidth:', window.innerWidth);
    
    if (isMobile) {
      // במובייל - נווט לדף רגיל עם route מלא
      const route = `#dermatology-disease-${diseaseId}`;
      console.log('🔵 Navigating to route:', route);
      onNavigate(route);
    } else {
      // בדسكטופ - פתח overlay
      console.log('🔵 Opening overlay for:', diseaseId);
      setSelectedDisease(diseaseId);
    }
  };

  const handleCloseOverlay = () => {
    setSelectedDisease(null);
  };

  const handleNavigateFromOverlay = (page: string) => {
    setSelectedDisease(null);
    onNavigate(page);
  };

  // Render disease page component
  const renderDiseaseContent = () => {
    if (!selectedDisease) return null;

    // דפי מחלות זמינו
    if (selectedDisease === 'acne') {
      return <AcnePage onNavigate={handleNavigateFromOverlay} />;
    }
    
    if (selectedDisease === 'psoriasis') {
      return <PsoriasisPage onNavigate={handleNavigateFromOverlay} />;
    }
    
    if (selectedDisease === 'eczema') {
      return <EczemaPage onNavigate={handleNavigateFromOverlay} />;
    }
    
    if (selectedDisease === 'acne2') {
      return <Acne2Page onNavigate={handleNavigateFromOverlay} />;
    }
    
    if (selectedDisease === 'vitiligo') {
      return <VitiligioPage onNavigate={handleNavigateFromOverlay} />;
    }

    // עבור מחלות אחרות שעוד לא יצרנו דף
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">
          {diseases.find(d => d.id === selectedDisease)?.title}
        </h1>
        <p className="text-gray-600">
          {diseases.find(d => d.id === selectedDisease)?.description}
        </p>
      </div>
    );
  };

  return (
    <>
      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {diseases.map((disease) => (
          <div
            key={disease.id}
            className="w-full"
          >
            <div
              className="p-0 hover:shadow-2xl group border-2 border-gray-200 hover:border-[#905e26]/50 overflow-hidden rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:brightness-110"
            >
              <div 
                className="relative overflow-hidden h-60 sm:h-72 md:h-60 lg:h-80 cursor-pointer"
                onClick={() => handleDiseaseClick(disease.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDiseaseClick(disease.id);
                  }
                }}
              >
                <img
                  src={disease.image || ''}
                  alt={disease.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Dark overlay that gets lighter on hover */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 pointer-events-none"></div>

                {/* Title overlay at the bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 pointer-events-none"
                  dir="rtl"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-right group-hover:text-[#905e26] transition-all duration-300 transform group-hover:scale-105">
                    {disease.title}
                  </h3>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t from-[#905e26]/30 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Overlay Modal */}
      {selectedDisease && !isMobile && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseOverlay}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-[95vw] h-[90vh] overflow-hidden flex flex-col" style={{ maxWidth: '90%' }}>           
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {renderDiseaseContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}