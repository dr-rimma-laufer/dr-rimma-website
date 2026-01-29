'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Image as ImageIcon, 
  Star, 
  Calendar, 
  User, 
  Quote,
  Filter,
  Eye,
  Grid,
  List
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  category: string;
  testimonial: string;
  duration?: string;
  treatment?: string;
  patientAge?: string;
  patientName?: string;
  rating?: number;
}

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

export function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load gallery data from CMS
  const loadGallery = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-71ec435d/content/gallery`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data.gallery || []);
      } else {
        // Fallback to comprehensive default gallery items if CMS is not available
        setGalleryItems([
          {
            id: '1',
            title: "השתלת שיער FUE - אישה בת 32",
            description: "השתלת 1,800 זקיקי שיער באזור הפדחת הקדמית",
            beforeImage: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGNvbmZpZGVudCUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjkzMDEyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1745434159123-af6142c7862f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwc21pbGV8ZW58MXx8fHwxNzU2OTMwMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "השתלות שיער",
            testimonial: "התוצאה עלתה על כל הציפיות שלי. השיער נראה טבעי לחלוטין ואני מרגישה כמו בת 22 שוב! ד״ר לאופר מקצועית ועדינה, הטיפול היה ללא כאב.",
            duration: "12 חודשים",
            treatment: "השתלת 1,800 זקיקי שיער",
            patientAge: "32",
            patientName: "שרה מ.",
            rating: 5
          },
          {
            id: '2',
            title: "השתלת שיער נשים - בת 28",
            description: "השתלת 1,600 זקיקי שיער לחיזוק קו השיער",
            beforeImage: "https://images.unsplash.com/photo-1653508310326-2482de0e96c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBzbWlsZXxlbnwxfHx8fDE3NTY5MzAxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1745434159123-af6142c7862f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwc21pbGV8ZW58MXx8fHwxNzU2OTMwMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "השתלות שיער",
            testimonial: "הייתי מבוכה מהקרחת שלי שנים. עכשיו אני יכולה ללבוש את השיער פתוח בביטחון מלא. תודה ד״ר לאופר על השינוי המדהים בחיי!",
            duration: "10 חודשים",
            treatment: "השתלת 1,600 זקיקי שיער",
            patientAge: "28",
            patientName: "מיכל כ.",
            rating: 5
          },
          {
            id: '3',
            title: "טיפול PRP - חיזוק שיער",
            description: "4 טיפולי PRP לחיזוק השיער הקיים",
            beforeImage: "https://images.unsplash.com/photo-1653508310326-2482de0e96c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBzbWlsZXxlbnwxfHx8fDE3NTY5MzAxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1658498613819-6f3ab24df253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY5MzAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "טיפולי שיער",
            testimonial: "הבחנתי בשיפור משמעותי בעובי השיער ובהפחתת הנשירה כבר אחרי הטיפול השני. טיפול טבעי ונעים עם תוצאות מעולות.",
            duration: "6 חודשים",
            treatment: "4 טיפולי PRP",
            patientAge: "35",
            patientName: "רחל ל.",
            rating: 4
          },
          {
            id: '4',
            title: "בוטוקס לקמטי מצח",
            description: "טיפול בוטוקס לחלקת קמטי המצח",
            beforeImage: "https://images.unsplash.com/photo-1653508310326-2482de0e96c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBzbWlsZXxlbnwxfHx8fDE3NTY5MzAxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1658498613819-6f3ab24df253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY5MzAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "אסתטיקה רפואית",
            testimonial: "התוצאה טבעית מאוד! הקמטים נעלמו אבל הפנים נשארו עם הבעה טבעית. מומלצת בחום!",
            duration: "6 חודשים",
            treatment: "בוטוקס למצח",
            patientAge: "45",
            patientName: "יעל ר.",
            rating: 5
          },
          {
            id: '5',
            title: "מילוי שפתיים בחומצה היאלורונית",
            description: "הגדלה טבעית של השפתיים",
            beforeImage: "https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwY29uZmlkZW50fGVufDF8fHx8MTc1NjkzMDEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1658498613819-6f3ab24df253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY5MzAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "אסתטיקה רפואית",
            testimonial: "השפתיים נראות טבעיות ויפות. בדיוק מה שרציתי - הגדלה עדינה שנותנת תוצאה יפה.",
            duration: "12 חודשים",
            treatment: "מילוי שפתיים",
            patientAge: "29",
            patientName: "נועה ב.",
            rating: 5
          },
          {
            id: '6',
            title: "השתלת שיער גברים - גיל 38",
            description: "השתלת 2,200 זקיקי שיער",
            beforeImage: "https://images.unsplash.com/photo-1590496552566-41aca09db352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBtYW4lMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjkzMDEzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1572378018912-0f59a373cf9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvbmZpZGVudCUyMG1hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzU2OTI5OTIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "השתלות שיער",
            testimonial: "אחרי שנים של קרחת התחלתי להיראות כמו שצריך. התוצאה טבעית לחלוטין ואני מרוצה מאוד!",
            duration: "14 חודשים",
            treatment: "השתלת 2,200 זקיקי שיער",
            patientAge: "38",
            patientName: "דן מ.",
            rating: 5
          },
          {
            id: '7',
            title: "טיפול בקמטי עיניים",
            description: "בוטוקס לטיפול ברגלי עורב",
            beforeImage: "https://images.unsplash.com/photo-1653508310326-2482de0e96c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBzbWlsZXxlbnwxfHx8fDE3NTY5MzAxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1658498613819-6f3ab24df253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY5MzAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "אסתטיקה רפואית",
            testimonial: "הקמטים סביב העיניים נעלמו והמבט נראה צעיר ורענן יותר. מאוד מרוצה מהתוצאה!",
            duration: "5 חודשים",
            treatment: "בוטוקס לעיניים",
            patientAge: "42",
            patientName: "לירון ח.",
            rating: 4
          },
          {
            id: '8',
            title: "חיזוק שיער במזותרפיה",
            description: "טיפולי מזותרפיה לחיזוק השיער",
            beforeImage: "https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwY29uZmlkZW50fGVufDF8fHx8MTc1NjkzMDEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            afterImage: "https://images.unsplash.com/photo-1658498613819-6f3ab24df253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY5MzAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            category: "טיפולי שיער",
            testimonial: "השיער הפך להיות הרבה יותר חזק ועבה. טיפול נעים עם תוצאות נראות לעין.",
            duration: "4 חודשים",
            treatment: "סדרת טיפולי מזותרפיה",
            patientAge: "31",
            patientName: "תמר ק.",
            rating: 4
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      // Fallback to default gallery items on error
      setGalleryItems([
        {
          id: '1',
          title: "השתלת שיער FUE - אישה בת 32",
          description: "השתלת 1,800 זקיקי שיער",
          beforeImage: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGNvbmZpZGVudCUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjkzMDEyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          afterImage: "https://images.unsplash.com/photo-1745434159123-af6142c7862f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwc21pbGV8ZW58MXx8fHwxNzU2OTMwMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "השתלות שיער",
          testimonial: "התוצאה עלתה על כל הציפיות שלי."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();

    // Listen for CMS updates
    const handleCMSUpdate = (event: CustomEvent) => {
      if (event.detail.type === 'gallery') {
        console.log('CMS gallery updated, reloading...');
        loadGallery();
      }
    };

    window.addEventListener('cmsContentUpdate', handleCMSUpdate as EventListener);

    return () => {
      window.removeEventListener('cmsContentUpdate', handleCMSUpdate as EventListener);
    };
  }, []);

  const categories = [
    { id: "all", name: "כל התוצאות", count: galleryItems.length },
    ...Array.from(new Set(galleryItems.map(item => item.category))).map(cat => ({
      id: cat,
      name: cat,
      count: galleryItems.filter(item => item.category === cat).length
    }))
  ];

  const filteredItems = selectedCategory === "all" 
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const BeforeAfterCard = ({ item }: { item: GalleryItem }) => (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative">
          <div className="grid grid-cols-2">
            {/* Before */}
            <div className="relative">
              <ImageWithFallback
                src={item.beforeImage}
                alt={`לפני - ${item.title}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                לפני
              </div>
            </div>
            {/* After */}
            <div className="relative">
              <ImageWithFallback
                src={item.afterImage}
                alt={`אחרי - ${item.title}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                אחרי
              </div>
            </div>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedItem(item)}
              className="bg-white/90 text-gray-800 hover:bg-white"
            >
              <Eye className="ml-2 h-4 w-4" />
              צפייה מפורטת
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-right mb-2">{item.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <Badge className="bg-[#905e26] text-white">{item.category}</Badge>
            <span>{item.patientAge ? `גיל ${item.patientAge}` : ""}</span>
          </div>
          <p className="text-sm text-gray-600 text-right">{item.description}</p>
          {item.rating && (
            <div className="flex items-center mt-2">
              <div className="flex space-x-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="mr-2 text-sm text-gray-600">({item.rating}/5)</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ListViewCard = ({ item }: { item: GalleryItem }) => (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <ImageWithFallback
                src={item.beforeImage}
                alt="לפני"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                לפני
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src={item.afterImage}
                alt="אחרי"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                אחרי
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <Badge className="bg-[#905e26] text-white">{item.category}</Badge>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
            </div>
            <p className="text-gray-600">{item.description}</p>
            {item.testimonial && (
              <p className="text-sm text-gray-500 italic">"{item.testimonial.slice(0, 100)}..."</p>
            )}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedItem(item)}
                className="group-hover:bg-[#101828] group-hover:text-white transition-colors"
              >
                צפייה מפורטת
              </Button>
              {item.rating && (
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="mr-2 text-sm text-gray-600">({item.rating}/5)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DetailedView = () => {
    if (!selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
              <h2 className="text-2xl font-bold text-gray-800 text-right">{selectedItem.title}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={selectedItem.beforeImage}
                      alt="לפני הטיפול"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                      לפני
                    </div>
                  </div>
                  <div className="relative">
                    <ImageWithFallback
                      src={selectedItem.afterImage}
                      alt="אחרי הטיפול"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded text-sm font-medium">
                      אחרי
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="text-right space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">פרטי הטיפול</h3>
                  <div className="space-y-2 text-gray-600">
                    {selectedItem.duration && (
                      <div className="flex items-center justify-between">
                        <span>{selectedItem.duration}</span>
                        <span>זמן התוצאה:</span>
                      </div>
                    )}
                    {selectedItem.patientAge && (
                      <div className="flex items-center justify-between">
                        <span>{selectedItem.patientAge}</span>
                        <span>גיל המטופל/ת:</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span>{selectedItem.description}</span>
                      <span>סוג הטיפול:</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#905e26] text-white">{selectedItem.category}</Badge>
                      <span>קטגוריה:</span>
                    </div>
                  </div>
                </div>

                {selectedItem.testimonial && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">עדות המטופל/ת</h3>
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        {selectedItem.rating && (
                          <div className="flex items-center mb-3">
                            <div className="flex space-x-1">
                              {[...Array(selectedItem.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="mr-2 text-sm text-gray-600">({selectedItem.rating}/5)</span>
                          </div>
                        )}
                        <Quote className="h-6 w-6 text-gray-400 mb-2" />
                        <p className="text-gray-700 italic text-right leading-relaxed">
                          {selectedItem.testimonial}
                        </p>
                        {selectedItem.patientName && (
                          <p className="text-sm text-gray-500 mt-3 text-left">
                            - {selectedItem.patientName}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white" dir="rtl">
        <Header currentPage="gallery" onNavigate={onNavigate} />
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-18 pb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header currentPage="gallery" onNavigate={onNavigate} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white pt-16 md:pt-18 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ImageIcon className="h-16 w-16 text-[#905e26] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              גלריית התוצאות שלנו
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              צפו בתוצאות אמיתיות של המטופלים שלנו - לפני ואחרי הטיפולים
            </p>
          </div>
        </section>

        {/* Filter and View Controls */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${
                        selectedCategory === category.id 
                          ? "bg-[#101828] text-white hover:bg-[#0a0f1a]" 
                          : "text-[#101828] border-[#101828] hover:bg-[#101828] hover:text-white"
                      }`}
                    >
                      {category.name}
                      <Badge variant="secondary" className="mr-2 bg-[#905e26] text-white">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "outline"}
                    onClick={() => setViewMode('grid')}
                    size="sm"
                    className={viewMode === 'grid' ? "bg-[#101828] text-white" : ""}
                  >
                    <Grid className="h-4 w-4 ml-2" />
                    רשת
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "outline"}
                    onClick={() => setViewMode('list')}
                    size="sm"
                    className={viewMode === 'list' ? "bg-[#101828] text-white" : ""}
                  >
                    <List className="h-4 w-4 ml-2" />
                    רשימה
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredItems.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }>
                {filteredItems.map((item) => (
                  viewMode === 'grid' 
                    ? <BeforeAfterCard key={item.id} item={item} />
                    : <ListViewCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">לא נמצאו תוצאות</h3>
                <p className="text-gray-500 mb-6">נסו לשנות את הקטגוריה</p>
                <Button
                  onClick={() => setSelectedCategory("all")}
                  variant="outline"
                  className="border-[#101828] text-[#101828] hover:bg-[#101828] hover:text-white"
                >
                  הצג את כל התוצאות
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">רוצים לראות יותר תוצאות?</h2>
            <p className="text-xl text-gray-300 mb-8">
              הזמינו ייעוץ אישי ונציג בפניכם עוד תוצאות רלוונטיות למקרה שלכם
            </p>
            <Button
              size="lg"
              className="bg-[#905e26] hover:bg-[#7a4e20] text-white px-8 py-3"
              onClick={() => onNavigate('#contact')}
            >
              <Calendar className="ml-2 h-5 w-5" />
              קביעת ייעוץ חינם
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <DetailedView />
    </div>
  );
}