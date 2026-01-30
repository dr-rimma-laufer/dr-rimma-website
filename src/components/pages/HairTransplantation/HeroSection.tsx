'use client';
import React from "react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import SplitText from "../../SplitText";
import { TextRevealGlow } from "../../TextRevealGlow";
import { motion } from "motion/react";
import mobileHeroImage from "../../../assets/e95e5acddc34aedeb570d881a0f95bb2b5b8f918_converted.jpg";
import newHeroImage from "../../../assets/c043fd2921ad5b91a54c1585cd5c27ffd7549eeb_converted.jpg";
import desktopHeroImage from "../../../assets/88432d56b4da34663c59c808bad87e1469cf9455_converted.jpg";
import newMobileHeroImage from "../../../assets/8f342c57ddbaadf2a7abb55704aac469052046ff_converted.jpg";
import updatedMobileHeroImage from "../../../assets/8b7b16788c2df7e63603f104be08dc9c052ceee2_converted.jpg";
import replacementHeroImage from "../../../assets/c9794b640193ab52f9d135dd24ceee6152d7cc9a_converted.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden hair-transplant-hero-reduced md:h-[80vh] md:min-h-[80vh]">
      {/* Mobile: Split Layout - Image + Info Box */}
      <div className="block md:hidden flex flex-col pt-16 gap-0">
        {/* Mobile Image Section */}
        <div className="relative h-[50vh] max-h-[50vh] pb-0 mb-0 leading-[0] flex-shrink-0">
          <ImageWithFallback
            src={replacementHeroImage.src}
            alt="השתלת שיער ברמה הגבוהה ביותר"
            className="w-full h-full object-cover object-top-left block md:hidden align-bottom"
          />
          <ImageWithFallback
            src={newHeroImage.src}
            alt="השתלת שיער ברמה הגבוהה ביותר"
            className="w-full h-full object-cover hidden md:block"
          />
          
          {/* Gradient Overlay - Bottom Fade to Transparent (Mobile Only) */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[10%] md:hidden pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5) 5%, transparent 100%)'
            }}
          />
          
          {/* Overlay Title - Quarter Height */}
          <div className="absolute top-1/4 -translate-y-1/2 right-3 z-10 md:hidden mb-0 pb-0">
            <h1 className="text-center mb-0 pb-0">
              <div className="flex mb-1.5 pr-0 ">
                <TextRevealGlow
                  text="מחזירים את הביטחון"
                  size="clamp(17px, 4vw, 24px)"
                  delay={100}
                />
              </div>
              <div className="flex mb-1.5 pr-6 ">
                <TextRevealGlow 
                  text="שיער טבעי" 
                  size="clamp(17px, 4vw, 24px)"
                  delay={300} 
                />
              </div>
              <div className="flex pr-12 mb-0 pb-0" >
                <TextRevealGlow
                  text="תוצאה קבועה"
                  size="clamp(17px, 4vw, 24px)"
                  delay={500}
                />
              </div>
            </h1>
          </div>


        </div>

        {/* Mobile Info Box - Below Image */}
        <div className="bg-white flex flex-col items-center justify-start px-2.5 pt-2 pb-6 sm:pt-2.5 sm:pb-8 md:pt-2 md:pb-2 gap-0.5">
          <style>{`
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes shine {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
              100% { transform: translateX(100%); }
            }

            .treatment-summary-gradient {
              background: linear-gradient(135deg, 
                #0a0f1a 0%,
                #101828 25%, 
                #1e293b 50%, 
                #0f172a 75%,
                #0a0f1a 100%
              );
            }

            @media (max-width: 640px) {
              .treatment-summary-gradient {
                background: linear-gradient(135deg, 
                  #000000 0%,
                  #101828 20%, 
                  #1e293b 40%,
                  #2d3748 60%,
                  #101828 80%,
                  #000000 100%
                );
              }
            }
          `}</style>

          {/* Title */}
          {/*<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-1.5 sm:mb-2 md:mb-4 text-center mt-6 sm:mt-8 md:mt-3">*/}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mt-2 mb-4 text-center">
           הגישה שלנו להשתלת שיער
          </h2>

          {/* Dark Box with Effects - Below Title */}
          <div 
            className="treatment-summary-gradient relative overflow-hidden border border-gray-800/20 mb-1.5 sm:mb-2 md:mb-2"
            style={{
              borderRadius: '12px',
              padding: '6px 4px',
              margin: '0 auto',
              maxWidth: '900px',
              width: '100%',
              position: 'relative',
              transition: 'all 0.8s ease-out',
              textAlign: 'center',
              color: 'white',
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
            
            {/* רקע נוסף עם אפקט גלים */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                  linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)
                `,
                transform: 'translateX(-100%)',
                animation: 'shine 6s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />

            {/* שכבת הדגשה נוספת למובייל */}
            <div 
              className="block sm:hidden absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, rgba(16, 24, 40, 0.2) 0%, transparent 50%, rgba(10, 15, 26, 0.3) 100%)',
                borderRadius: '15px'
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="text-base sm:text-2xl font-bold text-white" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)', lineHeight: '1.3' }}>
                בקליניקה אנו משלבים 
              </p>
              <p className="text-base sm:text-2xl font-bold text-white animate-scaleLineUp-delay-1" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)', lineHeight: '1.3' }}>
                מדע, אמנות וניסיון רפואי רב
              </p>
              <p className="text-base sm:text-2xl font-bold text-white" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)', lineHeight: '1.3' }}>
				כדי ליצור תוצאה
              </p>
              <p className="text-base sm:text-2xl font-bold text-white animate-scaleLineUp-delay-1" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)', lineHeight: '1.3' }}>
				טבעית, אסתטית ובטוחה.
              </p>
            </div>
          </div>
          
          {/* Second Text Block - "כל השתלה מבוצעת" */}
            <p className="text-lg leading-relaxed mt-5 sm:mt-6 md:mt-8 px-4 sm:px-6 lg:px-8">
              כל השתלה מבוצעת באופן אישי על ידי ד"ר רימה לאופר־בריטבה, רופאה מומחית לדרמטולוגיה ולהשתלות שיער, בעלת הכשרה בינלאומית.
            <br />
            ד"ר רימה מלווה כל מטופל באופן אישי, מרגע האבחון ועד לתוצאה הסופית.
            </p>
        </div>
      </div>

      {/* Desktop: Background Image */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${desktopHeroImage.src})`,
        }}
      ></div>

      {/* Desktop Content */}
      <div className="hidden md:block max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full desktop-hero-bg-adjust absolute inset-0 flex items-center">
        <div className="flex flex-col justify-center items-center text-center h-full">
          {/* Text Content - ממורכז מעל התמונה */}
          <div className="text-center flex flex-col justify-center items-center mb-8">
            {/* כותרת */}
            <div className="text-center w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {/* כותרת מלאה בדسكטופ - תצמוד לצד ימין */}
                <div className="absolute lg:top-52 lg:right-12 z-30 text-white lg:text-right">
                  <div className="flex lg:mb-4 pr-0">
                    <TextRevealGlow
                      text="מחזירים את הביטחון"
                      size="clamp(32px, 6vw, 64px)"
                      delay={100}
                    />
                  </div>
                  <div className="flex lg:mb-4 pr-32">
                    <TextRevealGlow 
                      text="שיער טבעי" 
                      size="clamp(32px, 6vw, 64px)"
                      delay={200} 
                    />
                  </div>
                  <div className="flex pr-56">
                    <TextRevealGlow
                      text="תוצאה קבועה"
                      size="clamp(32px, 6vw, 64px)"
                      delay={400}
                    />
                  </div>
                </div>
              </h1>
            </div>
          </div>
        </div>

        {/* Info Box - Bottom Right Corner - Desktop Only */}
        <div className="hidden md:block absolute bottom-10 right-12 z-30 max-w-md">
          <div className="bg-transparent backdrop-filter backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 w-[200%]">
            <h3 className="text-2xl font-bold text-white mb-3">
              <motion.div 
                className="pr-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <TextRevealGlow 
                  text="בקליניקה אנו משלבים מדע, אמנות וניסיון רפואי רב כדי ליצור" 
                  size="clamp(16px, 4vw, 24px)"
                  delay={900}
                  instantReveal={true}
                />
              </motion.div>
              <motion.div 
                className="pr-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                <TextRevealGlow 
                  text="תוצאה טבעית, אסתטית ובטוחה." 
                  size="clamp(16px, 4vw, 24px)"
                  delay={1100}
                  instantReveal={true}
                />
              </motion.div>
            </h3>
            <motion.p 
              className="text-white/90 mb-4 text-xl leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            >
            כל השתלה מבוצעת באופן אישי על ידי ד"ר רימה לאופר־בריטבה, רופאה מומחית לדרמטולוגיה ולהשתלות שיער, בעלת הכשרה בינלאומית.
             ד"ר רימה מלווה כל מטופל באופן אישי — מרגע האבחון ועד לתוצאה הסופית.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}