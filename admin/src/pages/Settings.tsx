import React, { useState, useEffect } from 'react';
import {
  Save,
  Loader2,
  AlertCircle,
  X,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Image,
} from 'lucide-react';
import api from '../lib/api';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  phone: string;
  email: string;
  address: string;
  workingHours: {
    weekdays: string;
    friday: string;
    saturday: string;
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string;
    ogImage: string;
  };
  analytics: {
    googleAnalyticsId: string;
    facebookPixelId: string;
  };
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    logo: '',
    favicon: '',
    phone: '',
    email: '',
    address: '',
    workingHours: {
      weekdays: '',
      friday: '',
      saturday: '',
    },
    social: {
      facebook: '',
      instagram: '',
      youtube: '',
      linkedin: '',
    },
    seo: {
      defaultTitle: '',
      defaultDescription: '',
      keywords: '',
      ogImage: '',
    },
    analytics: {
      googleAnalyticsId: '',
      facebookPixelId: '',
    },
    appearance: {
      primaryColor: '#c9493a',
      secondaryColor: '#d99b21',
      fontFamily: 'Heebo',
    },
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        // Demo data
        setSettings({
          siteName: 'ד"ר רימה - מומחית לשיער ועור',
          siteDescription: 'קליניקה מובילה לטיפולי שיער והשתלות שיער',
          logo: '/images/logo.png',
          favicon: '/favicon.ico',
          phone: '03-1234567',
          email: 'info@drrimma.co.il',
          address: 'רחוב הרופאים 15, תל אביב',
          workingHours: {
            weekdays: '09:00 - 18:00',
            friday: '09:00 - 14:00',
            saturday: 'סגור',
          },
          social: {
            facebook: 'https://facebook.com/drrimma',
            instagram: 'https://instagram.com/drrimma',
            youtube: '',
            linkedin: '',
          },
          seo: {
            defaultTitle: 'ד"ר רימה - מומחית לשיער ועור',
            defaultDescription: 'קליניקה מובילה לטיפולי שיער, השתלות שיער ודרמטולוגיה. צוות מקצועי ומנוסה.',
            keywords: 'השתלת שיער, טיפולי שיער, PRP, מזותרפיה, דרמטולוגיה',
            ogImage: '/images/og-image.jpg',
          },
          analytics: {
            googleAnalyticsId: '',
            facebookPixelId: '',
          },
          appearance: {
            primaryColor: '#c9493a',
            secondaryColor: '#d99b21',
            fontFamily: 'Heebo',
          },
        });
      }
    } catch (err) {
      setError('שגיאה בטעינת ההגדרות');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await api.updateSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('שגיאה בשמירת ההגדרות');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'כללי', icon: <Globe size={18} /> },
    { id: 'contact', label: 'יצירת קשר', icon: <Phone size={18} /> },
    { id: 'social', label: 'רשתות חברתיות', icon: <Facebook size={18} /> },
    { id: 'seo', label: 'SEO', icon: <Globe size={18} /> },
    { id: 'analytics', label: 'אנליטיקס', icon: <Globe size={18} /> },
    { id: 'appearance', label: 'מראה', icon: <Image size={18} /> },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary-600" size={40} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">הגדרות</h1>
          <p className="text-gray-600">נהל את הגדרות האתר</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn btn-primary flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          שמור שינויים
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError(null)} className="mr-auto">
            <X size={18} className="text-red-500" />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Save className="text-green-500" size={20} />
          <p className="text-green-700">ההגדרות נשמרו בהצלחה!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="card lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="card lg:col-span-3">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b">הגדרות כלליות</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">שם האתר</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">תיאור האתר</label>
                  <textarea
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) =>
                      setSettings({ ...settings, siteDescription: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">לוגו (URL)</label>
                  <input
                    type="text"
                    value={settings.logo}
                    onChange={(e) =>
                      setSettings({ ...settings, logo: e.target.value })
                    }
                    dir="ltr"
                  />
                  {settings.logo && (
                    <div className="mt-2 p-2 bg-gray-100 rounded">
                      <img src={settings.logo} alt="Logo" className="max-h-16" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Favicon (URL)</label>
                  <input
                    type="text"
                    value={settings.favicon}
                    onChange={(e) =>
                      setSettings({ ...settings, favicon: e.target.value })
                    }
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b">פרטי יצירת קשר</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone size={16} className="inline ml-1" />
                    טלפון
                  </label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail size={16} className="inline ml-1" />
                    אימייל
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    dir="ltr"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin size={16} className="inline ml-1" />
                    כתובת
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) =>
                      setSettings({ ...settings, address: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock size={16} className="inline ml-1" />
                    שעות פעילות
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">ימי חול</label>
                      <input
                        type="text"
                        value={settings.workingHours.weekdays}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            workingHours: { ...settings.workingHours, weekdays: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">יום שישי</label>
                      <input
                        type="text"
                        value={settings.workingHours.friday}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            workingHours: { ...settings.workingHours, friday: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">שבת</label>
                      <input
                        type="text"
                        value={settings.workingHours.saturday}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            workingHours: { ...settings.workingHours, saturday: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b">רשתות חברתיות</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Facebook size={16} className="inline ml-1" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.social.facebook}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        social: { ...settings.social, facebook: e.target.value },
                      })
                    }
                    dir="ltr"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Instagram size={16} className="inline ml-1" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={settings.social.instagram}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        social: { ...settings.social, instagram: e.target.value },
                      })
                    }
                    dir="ltr"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Youtube size={16} className="inline ml-1" />
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={settings.social.youtube}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        social: { ...settings.social, youtube: e.target.value },
                      })
                    }
                    dir="ltr"
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Linkedin size={16} className="inline ml-1" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={settings.social.linkedin}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        social: { ...settings.social, linkedin: e.target.value },
                      })
                    }
                    dir="ltr"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b">הגדרות SEO</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">כותרת ברירת מחדל</label>
                  <input
                    type="text"
                    value={settings.seo.defaultTitle}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: { ...settings.seo, defaultTitle: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">תיאור ברירת מחדל</label>
                  <textarea
                    rows={3}
                    value={settings.seo.defaultDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: { ...settings.seo, defaultDescription: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">מילות מפתח</label>
                  <input
                    type="text"
                    value={settings.seo.keywords}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: { ...settings.seo, keywords: e.target.value },
                      })
                    }
                    placeholder="מופרדות בפסיק"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">תמונת OG (URL)</label>
                  <input
                    type="text"
                    value={settings.seo.ogImage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: { ...settings.seo, ogImage: e.target.value },
                      })
                    }
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b">אנליטיקס</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.analytics.googleAnalyticsId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        analytics: { ...settings.analytics, googleAnalyticsId: e.target.value },
                      })
                    }
                    dir="ltr"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.analytics.facebookPixelId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        analytics: { ...settings.analytics, facebookPixelId: e.target.value },
                      })
                    }
                    dir="ltr"
                    placeholder="XXXXXXXXXX"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-4 border-b">מראה</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">צבע ראשי</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, primaryColor: e.target.value },
                        })
                      }
                      className="w-12 h-10 p-1 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, primaryColor: e.target.value },
                        })
                      }
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">צבע משני</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, secondaryColor: e.target.value },
                        })
                      }
                      className="w-12 h-10 p-1 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, secondaryColor: e.target.value },
                        })
                      }
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">פונט</label>
                  <select
                    value={settings.appearance.fontFamily}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, fontFamily: e.target.value },
                      })
                    }
                  >
                    <option value="Heebo">Heebo</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Rubik">Rubik</option>
                    <option value="Open Sans Hebrew">Open Sans Hebrew</option>
                  </select>
                </div>

                {/* Color Preview */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">תצוגה מקדימה</label>
                  <div className="p-4 border rounded-lg">
                    <div className="flex gap-4 mb-4">
                      <button
                        style={{ backgroundColor: settings.appearance.primaryColor }}
                        className="px-4 py-2 text-white rounded-lg"
                      >
                        כפתור ראשי
                      </button>
                      <button
                        style={{ backgroundColor: settings.appearance.secondaryColor }}
                        className="px-4 py-2 text-white rounded-lg"
                      >
                        כפתור משני
                      </button>
                    </div>
                    <p
                      style={{ fontFamily: settings.appearance.fontFamily }}
                      className="text-lg"
                    >
                      זוהי תצוגה מקדימה של הפונט שנבחר
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
