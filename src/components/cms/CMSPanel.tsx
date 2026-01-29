import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BlogPostForm } from './BlogPostForm';
import { FAQForm } from './FAQForm';
import { ImageDebugPanel } from './ImageDebugPanel';
import { 
  LogOut, 
  FileText, 
  HelpCircle, 
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Star
} from 'lucide-react';
import { loadAllContent, saveContent, deleteContent, updateLocalState, initializeSiteManually } from './CMSHelpers';
import { CMS_TABS } from './CMSConstants';

interface CMSPanelProps {
  onSignOut: () => void;
}

export function CMSPanel({ onSignOut }: CMSPanelProps) {
  const [activeTab, setActiveTab] = useState(CMS_TABS.DASHBOARD);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasInitialLoadAttempted, setHasInitialLoadAttempted] = useState(false);
  
  // Content states
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  
  // Edit states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    setError(''); // Clear previous errors
    try {
      const content = await loadAllContent();
      console.log('CMSPanel - Loaded content:', {
        blogPosts: content.blogPosts?.length || 0,
        faqs: content.faqs?.length || 0,
        reviews: content.reviews?.length || 0,
        contacts: content.contacts?.length || 0
      });
      
      setBlogPosts(content.blogPosts);
      setFaqs(content.faqs);
      setReviews(content.reviews);
      setContacts(content.contacts);
      setSettings(content.settings);
    } catch (error: any) {
      console.error('CMSPanel - Error loading content:', error);
      setError('שגיאה בטעינת התוכן: ' + error.message);
      
      // Set empty arrays as fallbacks
      setBlogPosts([]);
      setFaqs([]);
      setReviews([]);
      setContacts([]);
      setSettings({});
    } finally {
      setIsLoading(false);
      setHasInitialLoadAttempted(true);
    }
  };

  const handleSave = async (type: string, data: any) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await saveContent(type, data, editingItem);
      
      if (result.success) {
        setSuccess(result.message);
        
        // Update local state immediately
        if (type === 'blog') {
          updateLocalState(type, result.data, editingItem, setBlogPosts);
        } else if (type === 'faq') {
          updateLocalState(type, result.data, editingItem, setFaqs);
        } else if (type === 'settings') {
          setSettings(data);
        }
        
        // Close editing mode
        setIsEditing(false);
        setEditingItem(null);
        
        // Reload content in background
        setTimeout(() => {
          loadContent();
        }, 100);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('שגיאה בשמירת הנתונים');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('האם אתם בטוחים שברצונכם למחוק?')) return;
    
    setIsLoading(true);
    try {
      const result = await deleteContent(type, id);
      
      if (result.success) {
        setSuccess(result.message);
        await loadContent();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('שגיאה במחיקה');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (item?: any) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleInitializeSite = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await initializeSiteManually();
      setSuccess('האתר אותחל בהצלחה! נוצרו ' + result.postsCount + ' פוסטי בלוג ו-' + result.faqsCount + ' שאלות נפוצות.');
      // Reload content after initialization
      await loadContent();
    } catch (error: any) {
      setError('שגיאה באתחול האתר: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">מערכת ניהול תוכן</h1>
            <p className="text-gray-600">ניהול תוכן האתר של ד"ר רימה לאופר</p>
          </div>
          <Button onClick={onSignOut} variant="outline">
            <LogOut className="h-4 w-4 ml-2" />
            התנתקות
          </Button>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value={CMS_TABS.DASHBOARD}>סקירה</TabsTrigger>
            <TabsTrigger value={CMS_TABS.BLOG}>בלוג</TabsTrigger>
            <TabsTrigger value={CMS_TABS.FAQ}>שאלות נפוצות</TabsTrigger>
            <TabsTrigger value={CMS_TABS.REVIEWS}>המלצות</TabsTrigger>
            <TabsTrigger value={CMS_TABS.CONTACTS}>יצירת קשר</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value={CMS_TABS.DASHBOARD} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">פוסטים בבלוג</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogPosts.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">שאלות נפוצות</CardTitle>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{faqs.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">המלצות</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reviews.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">פניות</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contacts.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Initialize Site Card - Show only if no content or after load attempt */}
            {hasInitialLoadAttempted && (blogPosts.length === 0 && faqs.length === 0) && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">אתחול האתר</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 mb-4">
                    {error ? 
                      'נראה שיש בעיה בטעינת התוכן. האם תרצו לאתחל את האתר עם תוכן לדוגמה?' :
                      'נראה שהאתר עדיין לא מכיל תוכן. האם תרצו לאתחל את האתר עם תוכן לדוגמה?'
                    }
                  </p>
                  <p className="text-sm text-blue-600 mb-4">פעולה זו תיצור:</p>
                  <ul className="text-sm text-blue-600 space-y-1 mb-4">
                    <li>• 3 פוסטי בלוג מקצועיים עם תוכן עשיר</li>
                    <li>• 3 שאלות נפוצות רלוונטיות</li>
                    <li>• תמונות איכותיות מתאימות</li>
                  </ul>
                  <div className="flex space-x-reverse space-x-2">
                    <Button 
                      onClick={handleInitializeSite} 
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isLoading ? 'מאתחל...' : 'אתחל אתר עם תוכן לדוגמה'}
                    </Button>
                    {error && (
                      <Button 
                        onClick={() => loadContent()} 
                        disabled={isLoading}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        {isLoading ? 'טוען...' : 'נסה לטעון שוב'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>פניות אחרונות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm text-gray-500">{contact.message?.slice(0, 100)}...</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString('he-IL')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Management */}
          <TabsContent value={CMS_TABS.BLOG} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ניהול בלוג</h2>
              <div className="flex space-x-reverse space-x-2">
                <Button onClick={() => loadContent()} variant="outline" disabled={isLoading}>
                  {isLoading ? 'טוען...' : 'רענן'}
                </Button>
                <Button onClick={() => startEditing()}>
                  <Plus className="h-4 w-4 ml-2" />
                  פוסט חדש
                </Button>
              </div>
            </div>

            {/* Debug Panel */}
            <ImageDebugPanel />

            {/* Debug Information */}
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <h4 className="font-semibold mb-2">מידע דיבוג:</h4>
              <p>מספר פוסטים נטענו: {blogPosts.length}</p>
              <p>סטטוס טעינה: {isLoading ? 'טוען...' : 'הושלם'}</p>
              {blogPosts.length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer font-medium">רשימת פוסטים:</summary>
                  <ul className="mt-2 space-y-1">
                    {blogPosts.map(post => (
                      <li key={post.id} className="text-xs">
                        {post.title} (ID: {post.id})
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>

            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingItem ? 'עריכת פוסט' : 'פוסט חדש'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BlogPostForm 
                    post={editingItem} 
                    onSave={handleSave}
                    onCancel={cancelEditing}
                    setError={setError}
                    setSuccess={setSuccess}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#101828] mx-auto mb-4"></div>
                    <p>טוען פוסטי בלוג...</p>
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">אין פוסטי בלוג</h3>
                    <p className="text-gray-500 mb-6">צרו את הפוסט הראשון שלכם כדי להתחיל</p>
                    <div className="flex justify-center space-x-reverse space-x-4">
                      <Button onClick={() => startEditing()}>
                        <Plus className="h-4 w-4 ml-2" />
                        צור פוסט ראשון
                      </Button>
                      <Button 
                        onClick={handleInitializeSite} 
                        disabled={isLoading}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        {isLoading ? 'מאתחל...' : 'או אתחל עם תוכן לדוגמה'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  blogPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="text-gray-600 mt-1">{post.excerpt}</p>
                            <div className="flex items-center space-x-reverse space-x-4 mt-2">
                              <Badge variant="secondary">{post.category}</Badge>
                              <span className="text-sm text-gray-500">
                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('he-IL')}
                              </span>
                              {post.featured && <Badge className="bg-[#905e26] text-white">מומלץ</Badge>}
                            </div>
                          </div>
                          <div className="flex space-x-reverse space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditing(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete('blog', post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          {/* FAQ Management */}
          <TabsContent value={CMS_TABS.FAQ} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ניהול שאלות נפוצות</h2>
              <Button onClick={() => startEditing()}>
                <Plus className="h-4 w-4 ml-2" />
                שאלה חדשה
              </Button>
            </div>

            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingItem ? 'עריכת שאלה' : 'שאלה חדשה'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <FAQForm 
                    faq={editingItem}
                    onSave={handleSave}
                    onCancel={cancelEditing}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {faqs.length === 0 ? (
                  <div className="text-center py-8">
                    <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">אין שאלות נפוצות</h3>
                    <p className="text-gray-500 mb-6">צרו את השאלה הראשונה שלכם כדי להתחיל</p>
                    <div className="flex justify-center space-x-reverse space-x-4">
                      <Button onClick={() => startEditing()}>
                        <Plus className="h-4 w-4 ml-2" />
                        צור שאלה ראשונה
                      </Button>
                      <Button 
                        onClick={handleInitializeSite} 
                        disabled={isLoading}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        {isLoading ? 'מאתחל...' : 'או אתחל עם תוכן לדוגמה'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  faqs.map((faq) => (
                    <Card key={faq.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{faq.question}</h3>
                            <p className="text-gray-600 mt-1">{faq.answer}</p>
                            <Badge variant="secondary" className="mt-2">{faq.category}</Badge>
                          </div>
                          <div className="flex space-x-reverse space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditing(faq)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete('faq', faq.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          {/* Reviews Management */}
          <TabsContent value={CMS_TABS.REVIEWS} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ניהול המלצות</h2>
            </div>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <h3 className="text-lg font-semibold">{review.name}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          {review.verified && <Badge variant="secondary">מאומת</Badge>}
                        </div>
                        <p className="text-gray-600 mt-1">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-2">טיפול: {review.treatment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts */}
          <TabsContent value={CMS_TABS.CONTACTS} className="space-y-6">
            <h2 className="text-2xl font-bold">פניות יצירת קשר</h2>
            
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{contact.name}</h3>
                        <p className="text-gray-600">{contact.email}</p>
                        {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
                        <p className="text-gray-700 mt-2">{contact.message}</p>
                        <div className="flex items-center space-x-reverse space-x-4 mt-2">
                          <Badge variant="secondary">{contact.treatmentInterest}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(contact.createdAt).toLocaleDateString('he-IL')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}