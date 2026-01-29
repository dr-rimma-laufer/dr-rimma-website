import React from "react";

interface TextRevealGlowProps {
  text: string;
  size?: string;
  duration?: number;
  glowDuration?: number;
  delay?: number;
  instantReveal?: boolean;
}

export function TextRevealGlow({
  text = "HELLO",
  size = "clamp(56px, 10vw, 200px)",
  duration = 3000,
  glowDuration = 2500,
  delay = 200,
  instantReveal = false,
}: TextRevealGlowProps) {
  const className = instantReveal ? "trg-instant" : "trg";
  
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div
        className={className}
        style={{
          // Custom properties so timing is configurable
          // Convert ms numbers to CSS time strings
          ["--reveal" as any]: `${duration}ms`,
          ["--glow" as any]: `${glowDuration}ms`,
          ["--delay" as any]: `${delay}ms`,
          fontSize: size,
          fontFamily:
            '"Source Sans Pro", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        }}
      >
        {text}

        <style>{`
        .trg {
          /* Center text within its box and make it responsive */
          line-height: 1.05;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: transparent;
          /* The radial gradient provides the reveal "light" */
          background: 50% 100% / 50% 50% no-repeat
                      radial-gradient(ellipse at bottom, #fff, transparent 60%, transparent 100%);
          -webkit-background-clip: text;
          background-clip: text;
          /* Animations */
          animation:
            trg-reveal var(--reveal) ease-in-out forwards calc(var(--delay)),
            trg-glow var(--glow) linear infinite calc(var(--delay) + 1800ms);
          /* Improve text glow rendering */
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .trg-instant {
          /* Center text within its box and make it responsive */
          line-height: 1.05;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: transparent;
          /* The radial gradient provides the reveal "light" - already fully revealed */
          background: 50% 100% / 300% 300% no-repeat
                      radial-gradient(ellipse at bottom, #fff, transparent 60%, transparent 100%);
          -webkit-background-clip: text;
          background-clip: text;
          /* Only glow animation, no reveal */
          animation: trg-glow var(--glow) linear infinite calc(var(--delay));
          /* Improve text glow rendering */
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Keyframes mirror the original CSS, placed globally (not nested) */
        @keyframes trg-reveal {
          0% { background-size: 50% 50%; letter-spacing: 0.5px; }
          80% { letter-spacing: 8px; }
          100% { background-size: 300% 300%; }
        }
        @keyframes trg-glow {
          0%, 100% { text-shadow: none; }
          40% { text-shadow: 0 0 8px #ffffff; }
        }
      `}</style>
      </div>
    </>
  );
}
