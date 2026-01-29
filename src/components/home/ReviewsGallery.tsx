'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ReviewSource {
  name: string;
  logo: string;
  logoAlt: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  treatment?: string;
  source: ReviewSource;
}

export function ReviewsGallery() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Available review sources - using reliable image sources
  const reviewSources = {
    medreviews: {
      name: 'MedReviews',
      logo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmV2aWV3JTIwc3RhciUyMHJhdGluZ3xlbnwxfHx8fDE3NTQ5MzI5NDR8MA&ixlib=rb-4.1.0&q=80&w=100&utm_source=figma&utm_medium=referral',
      logoAlt: 'MedReviews לוגו'
    },
    google: {
      name: 'Google Reviews', 
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBsb2dvJTIwaWNvbnxlbnwxfHx8fDE3NTQ5MzQzOTl8MA&ixlib=rb-4.1.0&q=80&w=100&utm_source=figma&utm_medium=referral',
      logoAlt: 'Google לוגו'
    },
    facebook: {
      name: 'Facebook Reviews',
      logo: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlYm9vayUyMGxvZ28lMjBpY29ufGVufDF8fHx8MTc1NDkzNDE0M3ww&ixlib=rb-4.1.0&q=80&w=100&utm_source=figma&utm_medium=referral', 
      logoAlt: 'Facebook לוגו'
    }
  };

  // Mock reviews data (in real implementation, this would fetch from multiple APIs)
  const mockReviews: Review[] = [
    {
      id: '1',
      name: 'דניאל כהן',
      rating: 5,
      date: '2024-01-15',
      text: 'ד"ר רימה לאופר היא רופאה מעולה! ההשתלה שלי יצאה מושלמת והתוצאות טבעיות לחלוטין. הכל בוצע במקצועיות גבוהה והיחס היה חם ואישי.',
      verified: true,
      treatment: 'השתלת שיער',
      source: reviewSources.medreviews
    },
    {
      id: '2',
      name: 'שרה לוי',
      rating: 5,
      date: '2024-01-10',
      text: 'המלצה חמה על ד"ר לאופר! הטיפול לגבות היה מדויק ומותאם אישית. התוצאות הן בדיוק מה שרציתי - טבעיות ויפות.',
      verified: true,
      treatment: 'השתלת גבות',
      source: reviewSources.medreviews
    },
    {
      id: '3',
      name: 'מיכאל אברהם',
      rating: 5,
      date: '2024-01-05',
      text: 'לאחר שנים של התקרחות, סוף סוף מצאתי את הרופאה הנכונה. ד"ר לאופר עשתה עבודה מדהימה והתוצאות עלו על כל הציפיות שלי.',
      verified: true,
      treatment: 'השתלת שיער',
      source: reviewSources.medreviews
    },
    {
      id: '4',
      name: 'רחל גרין',
      rating: 5,
      date: '2023-12-28',
      text: 'הטיפול האסתטי שעברתי היה מעולה. ד"ר לאופר הסבירה לי הכל בפירוט והתוצאות טבעיות ויפות. ממליצה בחום!',
      verified: true,
      treatment: 'אסתטיקה רפואית',
      source: reviewSources.medreviews
    },
    {
      id: '5',
      name: 'יוסף משה',
      rating: 5,
      date: '2023-12-20',
      text: 'מקצועיות ללא פשרות! ההשתלה בוצעה בדקדקנות מירבית והתוצאות מדברות בעד עצמן. תודה רבה ד"ר לאופר!',
      verified: true,
      treatment: 'השתלת זקן',
      source: reviewSources.medreviews
    },
    {
      id: '6',
      name: 'אנה רוזנברג',
      rating: 5,
      date: '2023-12-15',
      text: 'חוויה מדהימה מתחילה ועד סוף. הצוות מקצועי, המרפאה נקייה והטיפול היה מעל ומעבר. הייתי חוזרת שוב בלי היסוס.',
      verified: true,
      treatment: 'טיפולי שיער',
      source: reviewSources.medreviews
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadReviews = async () => {
      setLoading(true);
      // In real implementation, this would be:
      // const response = await fetch('https://api.medreviews.co.il/provider/dr-laufer-britva-rimma/reviews');
      // const data = await response.json();
      // setReviews(data.reviews);
      
      setTimeout(() => {
        setReviews(mockReviews);
        setLoading(false);
      }, 1000);
    };

    loadReviews();
  }, []);

  // Handle mobile detection and reset slide when switching layouts
  useEffect(() => {
    const checkIsMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        setCurrentSlide(0); // Reset to first slide when layout changes
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [isMobile]);

  // Auto-slide functionality
  useEffect(() => {
    if (reviews.length === 0) return;
    
    const interval = setInterval(() => {
      const slidesCount = isMobile ? reviews.length : Math.ceil(reviews.length / 3);
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length, isMobile]);

  const nextSlide = () => {
    const slidesCount = isMobile ? reviews.length : Math.ceil(reviews.length / 3);
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    const slidesCount = isMobile ? reviews.length : Math.ceil(reviews.length / 3);
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getCurrentReviews = () => {
    if (isMobile) {
      // Show one review at a time on mobile
      return reviews.slice(currentSlide, currentSlide + 1);
    } else {
      // Show three reviews at a time on desktop
      const startIndex = currentSlide * 3;
      return reviews.slice(startIndex, startIndex + 3);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#101828] flex flex-col justify-center hebrew-text">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-right mb-16">
            <div className="h-8 bg-white/20 rounded w-64 mb-6 animate-pulse"></div>
            <div className="h-12 bg-white/20 rounded w-96 mb-6 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded w-full max-w-4xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg animate-pulse">
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#101828] flex flex-col justify-center hebrew-text">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-right mb-16">
          <Badge className="bg-white/10 text-white border-white/20 mb-6 text-sm rounded-full">
            המלצות מטופלים - {reviews.length} המלצות מאומתות
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            המלצות המטופלים שלנו
          </h2>
          <p className="text-lg text-white/80 max-w-4xl leading-relaxed">
            קראו מה המטופלים שלנו אומרים על החוויה והתוצאות שקיבלו במרפאה. 
            כל ההמלצות מאומתות ומגיעות מטופלים אמיתיים שעברו טיפולים במרפאתנו.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {getCurrentReviews().map((review, index) => (
              <Card 
                key={`${currentSlide}-${review.id}`}
                className="bg-white/90 backdrop-blur-sm border border-[#101828]/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  animation: `slideInRight 0.7s ease-in-out ${index * 0.1}s both`
                }}
              >
                <CardContent className="p-6 text-right">
                  {/* Header with Quote Icon and Verified Badge */}
                  <div className="flex items-start justify-between mb-4">
                    {review.verified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        מאומת
                      </Badge>
                    )}
                    <Quote className="h-8 w-8 text-[#101828]/20 transform rotate-180" />
                  </div>

                  {/* Review Text */}
                  <p className="text-[#101828] leading-relaxed mb-6 text-sm">
                    "{review.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex justify-end mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Reviewer Info */}
                  <div className="border-t border-[#101828]/10 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <p className="font-semibold text-[#101828] text-sm">{review.name}</p>
                        <p className="text-xs text-[#101828]/60">{review.date}</p>
                        {review.treatment && (
                          <Badge className="bg-[#101828]/5 text-[#101828] border-none text-xs mt-1">
                            {review.treatment}
                          </Badge>
                        )}
                      </div>
                      {/* Use a simple icon instead of external logo to avoid loading issues */}
                      <div className="h-6 w-6 bg-[#101828]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="h-3 w-3 text-[#101828]/60" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border-white/30 text-white hover:bg-white hover:text-[#101828] bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border-white/30 text-white hover:bg-white hover:text-[#101828] bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: isMobile ? reviews.length : Math.ceil(reviews.length / 3) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 h-3 bg-white rounded-full'
                    : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>



        {/* Call to Action */}
        <div className="text-center">
          <p className="text-white/80 mb-6">
            רוצים להצטרף למשפחת המטופלים המרוצים שלנו?
          </p>
          <Button 
            size="lg"
            className="bg-white text-[#101828] hover:bg-white/90 hover:text-[#101828] hover:bg-opacity-90 px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            קביעת תור ייעוץ חינם
          </Button>
        </div>
      </div>
    </section>
  );
}
