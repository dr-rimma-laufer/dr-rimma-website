import React from 'react';

interface MarqueeBlurProps {
  text: string;
  fontSize?: string;
  height?: string;
  duration?: number;
  className?: string;
}

export function MarqueeBlur({ 
  text, 
  fontSize = '3rem',
  height = '2em',
  duration = 16,
  className = ''
}: MarqueeBlurProps) {
  return (
    <div className={`w-full ${className}`}>
      <style>{`
        .marquee-text-${duration} {
          animation: marquee-anim-${duration} ${duration}s infinite linear;
        }
        
        @keyframes marquee-anim-${duration} {
          from { translate: 70%; }
          to { translate: -70%; }
        }
        
        .marquee-blur-effect {
          background-image:
            linear-gradient(to right, currentColor, 1rem, transparent 50%),
            linear-gradient(to left, currentColor, 1rem, transparent 50%);
          filter: contrast(15);
        }
        
        .marquee-blur-effect p {
          filter: blur(0.07em);
        }
      `}</style>
      
      <div 
        className="relative w-full overflow-hidden grid place-items-center" 
        style={{ height, fontSize }}
      >
        {/* Blurred layer */}
        <div className="marquee-blur-effect absolute inset-0 grid place-items-center">
          <p className={`marquee-text-${duration} absolute min-w-full green-nowrap`}>
            {text}
          </p>
        </div>
        
        {/* Clear layer */}
        <div className="absolute inset-0 grid place-items-center">
          <p className={`marquee-text-${duration} absolute min-w-full whitespace-nowrap`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
