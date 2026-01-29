'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Phone, User, MessageSquare, Clock } from 'lucide-react';

interface AppointmentDialogProps {
  children: React.ReactNode;
}

export function AppointmentDialog({ children }: AppointmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const services = [
    'השתלת שיער FUE',
    'השתלת שיער אפרו',
    'השתלת גבות',
    'השתלת זקן',
    'טיפולי שיער',
    'אסתטיקה רפואית',
    'ייעוץ כללי'
  ];

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `שלום! אני מעוניין/ת לקבוע תור במרפאה:

👤 שם: ${formData.name}
📞 טלפון: ${formData.phone}
📧 אימייל: ${formData.email}
🩺 שירות: ${formData.service}
📅 תאריך מועדף: ${formData.preferredDate}
⏰ שעה מועדפת: ${formData.preferredTime}
💬 הודעה: ${formData.message}

תודה!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/972501234567?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-dark-blue text-right flex items-center gap-2">
            <Calendar className="h-6 w-6 text-gold" />
            קביעת תור למרפאה
          </DialogTitle>
          <DialogDescription className="text-dark-blue/70 text-right mt-2">
            מלאו את הפרטים הבאים לקביעת תור במרפאה. הבקשה תישלח ישירות דרך WhatsApp ונחזור אליכם בהקדם.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dark-blue flex items-center gap-2">
              <User className="h-5 w-5 text-gold" />
              פרטים אישיים
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-dark-blue">שם מלא *</Label>
              <Input
                id="name"
                type="text"
                placeholder="הכניסו את שמכם המלא"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="text-right"
                dir="rtl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-dark-blue">מספר טלפון *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="050-1234567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="text-right"
                dir="rtl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-dark-blue">כתובת אימייל</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dark-blue flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gold" />
              פרטי הטיפול
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="service" className="text-dark-blue">סוג הטיפול *</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                <SelectTrigger className="text-right" dir="rtl">
                  <SelectValue placeholder="בחרו סוג טיפול" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {services.map((service) => (
                    <SelectItem key={service} value={service} className="text-right">
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Appointment Scheduling */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dark-blue flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold" />
              זמן מועדף
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-dark-blue">תאריך מועדף</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="text-right"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="text-dark-blue">שעה מועדפת</Label>
                <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                  <SelectTrigger className="text-right" dir="rtl">
                    <SelectValue placeholder="בחרו שעה" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time} className="text-right">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-dark-blue">הודעה נוספת</Label>
            <Textarea
              id="message"
              placeholder="ספרו לנו על הבעיה או השאלות שלכם..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
              className="text-right resize-none"
              dir="rtl"
            />
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-gold hover:bg-dark-blue text-white font-semibold py-3 transition-all duration-200"
              disabled={!formData.name || !formData.phone || !formData.service}
            >
              <Phone className="ml-2 h-5 w-5" />
              שלח בקשה דרך WhatsApp
            </Button>
            
            <p className="text-sm text-dark-blue/70 text-center">
              הבקשה תישלח דרך WhatsApp ונחזור אליכם בהקדם
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}