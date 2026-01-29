'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BlogFullPostView } from '../BlogFullPostView';
import { contentAPI } from '../../utils/supabase/client';
import { fallbackBlogPosts } from '../../utils/blogConstants';
import { initializeSiteManually } from '../cms/CMSHelpers';
import { 
  Search, 
  BookOpen,
  TrendingUp,
  Filter
} from 'lucide-react';
import { MorphologyBlogCard } from '../MorphologyBlogCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  createdAt: string;
  author?: string;
  readTime?: string;
  views?: number;
  featured?: boolean;
  additionalImages?: any[];
  order?: number; // שדה סדר להצגה
}

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string>('');
  const [initializingContent, setInitializingContent] = useState(false);
  const [isUsingFallbackData, setIsUsingFallbackData] = useState(false);

  // Load blog posts from CMS
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await contentAPI.getBlogPosts();
        console.log('BlogPage - Blog posts response:', response);
        
        if (response && response.posts && response.posts.length > 0) {
          // Transform CMS data to match BlogPost interface
          const transformedPosts: BlogPost[] = response.posts.map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            tags: post.tags || [],
            image: post.image || post.imageUrl || "https://images.unsplash.com/photo-1640876777012-bdb00a6323e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGFpciUyMHRyYW5zcGxhbnQlMjBwcm9jZWR1cmUlMjBjbGluaWN8ZW58MXx8fHwxNzU0OTMyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            createdAt: post.createdAt || post.publishedAt,
            author: post.author || "ד״ר רימה לאופר",
            readTime: post.readTime || "5 דקות קריאה",
            views: post.views || Math.floor(Math.random() * 1000) + 100,
            featured: post.featured !== undefined ? post.featured : Math.random() > 0.5,
            additionalImages: post.additionalImages || [],
            order: post.order || 999 // ברירת מחדל לסדר גבוה
          }));
          
          // מיון לפי שדה הסדר ואז לפי תאריך
          const sortedPosts = transformedPosts.sort((a, b) => {
            // קודם לפי סדר (מספר נמוך ראשון)
            const orderA = a.order || 999;
            const orderB = b.order || 999;
            if (orderA !== orderB) {
              return orderA - orderB;
            }
            // אם הסדר זהה, מיון לפי תאריך (חדש ראשון)
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          
          setBlogPosts(sortedPosts);
          setIsUsingFallbackData(false);
        } else {
          // Use fallback data if no posts found in CMS
          console.log('BlogPage - No posts found in CMS, using fallback data');
          setBlogPosts(fallbackBlogPosts);
          setIsUsingFallbackData(true);
        }
      } catch (error) {
        console.error('BlogPage - Error loading blog posts:', error);
        setError('שגיאה בטעינת הבלוג. מציג תוכן ברירת מחדל.');
        
        // Use fallback data on error
        setBlogPosts(fallbackBlogPosts);
        setIsUsingFallbackData(true);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const categories = [
    { id: "all", name: "כל הקטגוריות", count: blogPosts.length },
    ...Array.from(new Set(blogPosts.map(post => post.category))).map(cat => ({
      id: cat,
      name: cat,
      count: blogPosts.filter(post => post.category === cat).length
    }))
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const BlogCard = ({ post, featured = false }: { post: BlogPost, featured?: boolean }) => (
    <MorphologyBlogCard
      title={post.title}
      excerpt={post.excerpt}
      category={post.category}
      image={post.image}
      onReadMore={() => setSelectedPost(post)}
      featured={featured}
    />
  );

  const handleInitializeSite = async () => {
    setInitializingContent(true);
    setError('');
    
    try {
      const result = await initializeSiteManually();
      console.log('BlogPage - Site initialized:', result);
      
      // Reload the page content
      window.location.reload();
    } catch (error: any) {
      console.error('BlogPage - Error initializing site:', error);
      setError('שגיאה באתחול האתר: ' + error.message);
    } finally {
      setInitializingContent(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white" dir="rtl">
        <Header currentPage="blog" onNavigate={onNavigate} />
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-18 pb-16">
            <div className="text-center mb-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#101828]" />
              <p className="text-[#101828]/70">טוען תוכן הבלוג...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg h-80"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header currentPage="blog" onNavigate={onNavigate} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white pt-16 md:pt-18 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <BookOpen className="h-16 w-16 text-[#905e26] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              הבלוג המקצועי שלנו
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              מאמרים מקצועיים, טיפים מעשיים ועדכונים על הטכנולוגיות החדישות ביותר 
              בעולם הרפואה האסתטית והשתלות השיער
            </p>
            {error && (
              <Alert className="mt-6 border-amber-200 bg-amber-50 max-w-2xl mx-auto">
                <AlertDescription className="text-amber-800 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="max-w-md mx-auto relative">
                  <Input
                    type="text"
                    placeholder="חפשו מאמרים, נושאים או תגיות..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 text-right border-[#101828] focus:ring-[#905e26] focus:border-[#905e26]"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      size="sm"
                      className={`${
                        selectedCategory === category.id
                          ? "bg-[#101828] text-white hover:bg-[#0a0f1a]"
                          : "text-[#101828] border-[#101828] hover:bg-[#101828] hover:text-white"
                      } transition-all duration-200`}
                    >
                      {category.name}
                      <Badge variant="secondary" className="mr-2 bg-[#905e26] text-white text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-600">
                  נמצאו {filteredPosts.length} מאמרים
                  {searchTerm && ` עבור "${searchTerm}"`}
                  {selectedCategory !== "all" && ` בקטגוריית "${categories.find(c => c.id === selectedCategory)?.name}"`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Demo Content Warning */}
            {isUsingFallbackData && (
              <div className="mb-12">
                <Alert className="border-blue-200 bg-blue-50 max-w-4xl mx-auto">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <strong>מציג תוכן לדוגמה</strong> - אלה מאמרים לדוגמה להצגת העיצוב. 
                        להוספת תוכן אמיתי, השתמשו במערכת ניהול התוכן.
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleInitializeSite}
                          disabled={initializingContent}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {initializingContent ? (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin ml-1" />
                              מאתחל...
                            </>
                          ) : (
                            'העבר תוכן למערכת'
                          )}
                        </Button>
                        <Button 
                          onClick={() => onNavigate('cms')}
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          פתח CMS
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-[#101828] ml-2" />
                    <h2 className="text-3xl font-bold text-[#101828]">מאמרים מומלצים</h2>
                  </div>
                </div>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                  המאמרים הפופולריים והמעניינים ביותר שלנו, שנבחרו במיוחד עבורכם
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} featured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-[#101828] ml-2" />
                    <h2 className="text-3xl font-bold text-[#101828]">כל המאמרים</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">לא נמצאו מאמרים</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  נסו לשנות את מילות החיפוש, לבחור קטגוריה אחרת או לחזור לכל המאמרים
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                  className="border-[#101828] text-[#101828] hover:bg-[#101828] hover:text-white"
                >
                  <Filter className="h-4 w-4 ml-2" />
                  נקה סינון
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">הישארו מעודכנים</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              הירשמו לקבלת מאמרים מקצועיים חדשים, טיפים שימושיים ועדכונים על חידושים 
              בתחום הרפואה האסתטית והשתלות השיער ישירות לתיבת המייל שלכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="כתובת האימייל שלכם"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 flex-1"
              />
              <Button className="bg-[#905e26] hover:bg-[#7a4e20] text-white whitespace-nowrap">
                הרשמה לניוזלטר
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              אנו מתחייבים לשמור על פרטיותכם ולא לשלוח ספאם
            </p>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Full Post View Modal */}
      {selectedPost && (
        <BlogFullPostView
          selectedPost={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}