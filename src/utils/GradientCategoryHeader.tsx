'use client';
import React from 'react';

interface GradientCategoryHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * קומפוננטה לכותרת קטגוריה עם רקע גרדיאנט מסתובב ואפקט גלים
 * מיועדת לשימוש חוזר במקומות שונים באתר
 */
export function GradientCategoryHeader({ title, subtitle, children, className = '' }: GradientCategoryHeaderProps) {
  return (
    <div 
      className={`treatment-summary-gradient relative overflow-hidden border border-gray-800/20 ${className}`}
      style={{
        borderRadius: '0px',
        padding: '16px 0',
        margin: '0 0 24px 0',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        width: '100vw',
        position: 'relative',
        transition: 'all 0.8s ease-out',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* רקע מסתובב ונע */}
      <div 
        className="rotating-bg"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
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
      
      <h3 
        className="text-3xl lg:text-4xl font-bold text-white pt-8 pb-4"
        style={{ 
          position: 'relative', 
          zIndex: 1,
          textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)'
        }}
      >
        {title}
      </h3>
      
      {subtitle && (
        <p 
          className="text-lg text-white/90 mt-2"
          style={{ 
            position: 'relative', 
            zIndex: 1,
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
          }}
        >
          {subtitle}
        </p>
      )}
      
      {children && (
        <div 
          className="mt-4 text-white/85"
          style={{ 
            position: 'relative', 
            zIndex: 1,
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}