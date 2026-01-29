'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Car,
  Train,
  Bus,
  Send,
  CheckCircle,
  MessageCircle,
  Navigation,
  Building
} from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: 'טלפון',
      info: '03-1234567',
      subInfo: 'זמינים א׳-ה׳ 8:00-20:00',
      action: 'התקשרו עכשיו',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'וואטסאפ',
      info: '050-1234567',
      subInfo: 'מענה מהיר ונוח',
      action: 'שלחו הודעה',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      title: 'אימייל',
      info: 'info@dr-rimma.com',
      subInfo: 'מענה תוך 24 שעות',
      action: 'שלחו מייל',
      color: 'bg-red-100 text-red-600'
    }
  ];

  const officeDetails = [
    {
      title: 'כתובת',
      info: 'רחוב הארבעה 15, תל אביב',
      icon: MapPin
    },
    {
      title: 'שעות פעילות',
      info: 'א׳-ה׳: 8:00-20:00, ו׳: 8:00-14:00',
      icon: Clock
    },
    {
      title: 'חניה',
      info: 'חניה חינם במקום',
      icon: Car
    },
    {
      title: 'תחבורה ציבורית',
      info: 'קווי אוטובוס 4, 18, 74',
      icon: Bus
    }
  ];

  const services = [
    'השתלת שיער',
    'טיפולי שיער שמרניים',
    'אסתטיקה רפואית',
    'ייעוץ כללי',
    'אחר'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white pt-16 md:pt-18 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              צרו קשר עכשיו
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              בואו נכיר - נשמח לעזור לכם
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              יש לכם שאלות? רוצים לקבוע ייעוץ? אנחנו כאן בשבילכם עם מענה מקצועי ואכפתי
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#48BB78] hover:bg-[#38A169] text-white"
              >
                <Calendar className="ml-2 h-5 w-5" />
                קביעת תור מהיר
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#2B6CB8]"
              >
                <Phone className="ml-2 h-5 w-5" />
                03-1234567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              דרכי יצירת קשר
            </h2>
            <p className="text-xl text-gray-600">
              בחרו את הדרך הנוחה לכם ביותר ליצירת קשר
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-xl font-bold text-gray-900 mb-2">
                  {method.info}
                </p>
                <p className="text-gray-600 mb-4">
                  {method.subInfo}
                </p>
                <Button className="w-full bg-[#2B6CB8] hover:bg-[#1e4f85] text-white">
                  {method.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                שלחו לנו הודעה
              </h2>
              <p className="text-gray-600 mb-8">
                מלאו את הפרטים ונחזור אליכם במהירות האפשרית
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        שם פרטי *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full text-right"
                        placeholder="הזינו שם פרטי"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        שם משפחה *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full text-right"
                        placeholder="הזינו שם משפחה"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        אימייל *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full text-right"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        טלפון *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full text-right"
                        placeholder="050-1234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      נושא הפנייה
                    </label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className="w-full text-right">
                        <SelectValue placeholder="בחרו נושא" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service, index) => (
                          <SelectItem key={index} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      הודעה
                    </label>
                    <Textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full text-right"
                      placeholder="כתבו כאן את ההודעה שלכם..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-[#2B6CB8] hover:bg-[#1e4f85] text-white"
                  >
                    <Send className="ml-2 h-5 w-5" />
                    שלחו הודעה
                  </Button>
                </form>
              ) : (
                <Card className="p-8 text-center bg-green-50 border-green-200">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    ההודעה נשלחה בהצלחה!
                  </h3>
                  <p className="text-green-700">
                    תודה שפניתם אלינו. נחזור אליכם בהקדם האפשרי.
                  </p>
                </Card>
              )}
            </div>

            {/* Map & Location Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                מיקום המרפאה
              </h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 h-64 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">מפה אינטראקטיבית</p>
                  <p className="text-sm text-gray-500">רחוב הארבעה 15, תל אביב</p>
                </div>
              </div>

              {/* Office Details */}
              <div className="space-y-4">
                {officeDetails.map((detail, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <detail.icon className="h-6 w-6 text-[#2B6CB8]" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{detail.title}</h4>
                        <p className="text-gray-600">{detail.info}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <Button 
                  variant="outline"
                  className="w-full border-[#2B6CB8] text-[#2B6CB8] hover:bg-[#2B6CB8] hover:text-white"
                >
                  <Navigation className="ml-2 h-4 w-4" />
                  פתחו בניווט
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours & Additional Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Office Hours */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-[#2B6CB8] ml-3" />
                שעות פעילות
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">ראשון - חמישי</span>
                  <span>8:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">שישי</span>
                  <span>8:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">שבת</span>
                  <span className="text-red-500">סגור</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>הערה:</strong> בחגים ומועדים יתכנו שינויים בשעות הפעילות. 
                  מומלץ להתקשר מראש לוידוא זמינות.
                </p>
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-[#2B6CB8] ml-3" />
                מידע נוסף
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">נגישות</h4>
                  <p className="text-gray-600">המרפאה נגישה לאנשים עם מוגבלויות</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">שפות</h4>
                  <p className="text-gray-600">עברית, אנגלית, רוסית</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">ביטוח</h4>
                  <p className="text-gray-600">מקבלים את כל קופות החולים</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">תשלומים</h4>
                  <p className="text-gray-600">מזומן, כרטיס אשראי, העברה בנקאית</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-l from-[#2B6CB8] to-[#4A90A4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            מוכנים לקבוע תור?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            אל תחכו יותר מידי - הזמן הטוב ביותר להתחיל לטפל בעצמכם הוא היום!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#48BB78] hover:bg-[#38A169] text-white"
            >
              <Calendar className="ml-2 h-5 w-5" />
              קביעת תור עכשיו
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-[#2B6CB8]"
            >
              <MessageCircle className="ml-2 h-5 w-5" />
              וואטסאפ מהיר
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
