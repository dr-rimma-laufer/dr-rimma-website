'use client';
import React from 'react';

const HeroTransplantEffect = () => {
  const createTextChars = (text) => {
    const characters = text.split('').reverse();
    const angleStep = 360 / characters.length;
    
    return characters.map((char, i) => ({
      char,
      rotation: i * angleStep,
      delay: i * 0.1
    }));
  };

  const text1 = createTextChars('★ מראה טבעי ★ שימור קו השיער ★');
  const text2 = createTextChars('★ החלמה מהירה ★ התאוששות נוחה ★');
  const text3 = createTextChars('★ ללא צלקת ★');

  return (
    <>
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
        
        @keyframes charPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: '20px'
      }}>
        <div style={{
          position: 'relative',
          width: '600px',
          height: '600px',
          margin: '-80px auto 0'
        }}>
          
          {/* עיגול ראשון - משמאל */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '30px',
            transform: 'translateY(-50%)',
            width: '180px',
            height: '180px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '32px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
            </div>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'rotate 15s linear infinite'
            }}>
              {text1.map((item, i) => (
                <span key={i} style={{
                  position: 'absolute',
                  left: '50%',
                  transformOrigin: '0 90px',
                  transform: `rotate(${item.rotation}deg)`,
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'yellow',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'charPulse 2s ease-in-out infinite',
                  animationDelay: `${item.delay}s`
                }}>
                  {item.char}
                </span>
              ))}
            </div>
          </div>

          {/* עיגול שני - במרכז */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180px',
            height: '180px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '32px',
              color: 'yellow',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
            </div>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'rotate 15s linear infinite'
            }}>
              {text2.map((item, i) => (
                <span key={i} style={{
                  position: 'absolute',
                  left: '50%',
                  transformOrigin: '0 90px',
                  transform: `rotate(${item.rotation}deg)`,
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'charPulse 2s ease-in-out infinite',
                  animationDelay: `${item.delay}s`
                }}>
                  {item.char}
                </span>
              ))}
            </div>
          </div>

          {/* עיגול שלישי - מימין */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '30px',
            transform: 'translateY(-50%)',
            width: '180px',
            height: '180px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '32px',
              color: 'silver',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
            </div>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'rotate 15s linear infinite'
            }}>
              {text3.map((item, i) => (
                <span key={i} style={{
                  position: 'absolute',
                  left: '50%',
                  transformOrigin: '0 90px',
                  transform: `rotate(${item.rotation}deg)`,
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'blue',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'charPulse 2s ease-in-out infinite',
                  animationDelay: `${item.delay}s`
                }}>
                  {item.char}
                </span>
              ))}
            </div>
          </div>

          {/* טקסט מרכזי */}
          <div style={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '220px',
            height: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
              lineHeight: '1.5',
              direction: 'rtl'
            }}>
              תכנון אישי<br/>המבוסס על<br/>אבחון טריכולוגי
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default HeroTransplantEffect;