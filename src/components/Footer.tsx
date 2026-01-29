'use client';
import React from 'react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { SupabaseStatusIndicator } from './SupabaseStatusIndicator';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube,
  Calendar,
  Shield,
  Award,
  Heart
} from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { name: 'השתלות שיער', href: '#hair-transplant' },
    { name: 'טיפולי שיער', href: '#hair-treatments' },
    { name: 'אסתטיקה רפואית', href: '#aesthetics' },
    { name: 'גלריה', href: '#gallery' },
    { name: 'שאלות נפוצות', href: '#faq' },
    { name: 'צור קשר', href: '#contact' }
  ];

  const services = [
    { name: 'השתלת שיער FUE', href: '#hair-transplant' },
    { name: 'השתלת שיער DHI', href: '#hair-transplant' },
    { name: 'PRP לשיער', href: '#hair-treatments' },
    { name: 'מזותרפיה', href: '#hair-treatments' },
    { name: 'בוטוקס', href: '#aesthetics' },
    { name: 'מילוי קמטים', href: '#aesthetics' }
  ];

  const certifications = [
    { icon: Shield, text: 'מוסמכת במועצה הרפואית' },
    { icon: Award, text: 'הכשרה מתקדמת באירופה' },
    { icon: Heart, text: '98% שביעות רצון מטופלים' }
  ];

  return (
    <footer className="bg-[#101828] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="md" darkBackground={true} />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              מרפאה מובילה לטיפולי שיער ואסתטיקה רפואית עם יותר מ-15 שנות ניסיון 
              ואלפי מטופלים מרוצים. מתמחים בפתרונות מתקדמים ובטוחים.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-reverse space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">קישורים מהירים</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">השירותים שלנו</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">פרטי התקשרות</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-reverse space-x-3">
                <Phone className="h-5 w-5 text-[#905e26]" />
                <span className="text-gray-300">03-1234567</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <Mail className="h-5 w-5 text-[#905e26]" />
                <span className="text-gray-300">info@dr-rimma.com</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <MapPin className="h-5 w-5 text-[#905e26]" />
                <span className="text-gray-300">רחוב הארבעה 15, תל אביב</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <Clock className="h-5 w-5 text-[#905e26]" />
                <span className="text-gray-300">א׳-ה׳: 8:00-20:00</span>
              </div>
            </div>

            <Button 
              className="w-full mt-6 bg-[#905e26] hover:bg-[#7a4e20] text-white"
            >
              <Calendar className="ml-2 h-4 w-4" />
              קביעת תור
            </Button>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">הישארו מעודכנים</h3>
            <p className="text-gray-300 mb-6">
              קבלו עדכונים על טיפולים חדשים, מבצעים מיוחדים וטיפים מקצועיים
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="הזינו כתובת אימייל"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#905e26] text-right"
              />
              <Button className="bg-[#905e26] hover:bg-[#7a4e20] text-white">
                הרשמה
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0a0f1a] border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-reverse space-x-4 text-sm text-gray-400">
              <span>© 2024 ד״ר רימה לאופר. כל הזכויות שמורות.</span>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">תנאי שימוש</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a>
            </div>
            <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-400">
              <span>פותח על ידי</span>
              <span className="text-[#905e26] font-medium">Spidernet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}