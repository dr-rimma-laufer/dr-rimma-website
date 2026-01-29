import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText,
  CheckCircle,
  Star
} from "lucide-react";

const availableSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

const services = [
  { id: "consultation", name: "ייעוץ ראשוני", duration: "30 דקות", price: "חינם" },
  { id: "hair-transplant", name: "השתלת שיער FUE", duration: "6-8 שעות", price: "לפי הצעת מחיר" },
  { id: "prp", name: "טיפול PRP", duration: "45 דקות", price: "800 ₪" },
  { id: "botox", name: "בוטוקס", duration: "30 דקות", price: "1,200 ₪" },
  { id: "dermatology", name: "בדיקת עור", duration: "45 דקות", price: "400 ₪" }
];

export function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // כאן יתבצע שליחה למערכת
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-l from-[#F7FAFC] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-12 shadow-2xl">
            <div className="w-20 h-20 bg-[#101828] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">התור נקבע בהצלחה!</h2>
            <p className="text-lg text-gray-600 mb-6">
              קיבלנו את פרטיכם ונחזור אליכם בהקדם לאישור התור
            </p>
            <div className="bg-[#F7FAFC] rounded-lg p-6 text-right">
              <h3 className="font-semibold text-gray-800 mb-4">פרטי התור:</h3>
              <div className="space-y-2 text-gray-600">
                <p>שירות: {services.find(s => s.id === selectedService)?.name}</p>
                <p>תאריך: {selectedDate?.toLocaleDateString('he-IL')}</p>
                <p>שעה: {selectedTime}</p>
                <p>שם: {formData.firstName} {formData.lastName}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-l from-[#F7FAFC] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            קביעת תור למרפאה
          </h2>
          <p className="text-lg text-gray-600">
            קבעו תור בצורה קלה ומהירה למגוון הטיפולים שלנו
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-right">שלבי קביעת התור</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "בחירת שירות", icon: FileText },
                    { step: 2, title: "בחירת תאריך ושעה", icon: CalendarIcon },
                    { step: 3, title: "פרטים אישיים", icon: User }
                  ].map(({ step, title, icon: Icon }) => (
                    <div
                      key={step}
                      className={`flex items-center space-x-reverse space-x-3 p-3 rounded-lg transition-colors ${
                        currentStep === step ? 'bg-[#101828] text-white' : 
                        currentStep > step ? 'bg-[#101828] text-white' : 'bg-gray-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep === step ? 'bg-white text-[#101828]' : 
                        currentStep > step ? 'bg-white text-[#101828]' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {currentStep > step ? '✓' : step}
                      </div>
                      <span className="font-medium">{title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <Tabs value={`step-${currentStep}`} className="w-full">
                  
                  {/* Step 1: Service Selection */}
                  <TabsContent value="step-1" className="space-y-6">
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">בחרו את השירות הרצוי</h3>
                      <div className="grid gap-4">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedService === service.id
                                ? 'border-[#905e26] bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedService(service.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="text-right">
                                <h4 className="font-semibold text-gray-800">{service.name}</h4>
                                <p className="text-sm text-gray-600">משך הטיפול: {service.duration}</p>
                              </div>
                              <Badge variant={service.price === "חינם" ? "secondary" : "outline"}>
                                {service.price}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Step 2: Date & Time Selection */}
                  <TabsContent value="step-2" className="space-y-6">
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">בחרו תאריך ושעה</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <Label className="text-base font-medium mb-4 block">תאריך</Label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date() || date.getDay() === 6}
                            className="rounded-md border shadow-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-base font-medium mb-4 block">שעה פנויה</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {availableSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTime(time)}
                                className="text-sm"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Step 3: Personal Information */}
                  <TabsContent value="step-3" className="space-y-6">
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">פרטים אישיים</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">שם פרטי</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">שם משפחה</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">טלפון</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">אימייל</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <Label htmlFor="notes">הערות נוספות (אופציונלי)</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          className="mt-2"
                          rows={4}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    חזור
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={
                        (currentStep === 1 && !selectedService) ||
                        (currentStep === 2 && (!selectedDate || !selectedTime))
                      }
                      className="bg-[#101828] hover:bg-[#101828 ]"
                    >
                      המשך
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.firstName || !formData.lastName || !formData.phone}
                      className="bg-[#101828] hover:bg-[#38a169]"
                    >
                      <CheckCircle className="ml-2 h-4 w-4" />
                      אישור התור
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}