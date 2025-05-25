
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, DollarSign, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    service: "",
    stylist: "",
    notes: "",
    agreedToTerms: false
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const timeSlots = {
    weekday: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
    weekend: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
  };

  const services = [
    { name: "Haircut & Styling", price: 80 },
    { name: "Color Treatment", price: 120 },
    { name: "Highlights", price: 150 },
    { name: "Keratin Treatment", price: 200 },
    { name: "Hair Wash & Blowdry", price: 50 }
  ];

  const stylists = ["Sarah Johnson", "Emma Wilson", "Maria Garcia", "Ashley Chen"];

  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const calculateTotal = () => {
    const selectedService = services.find(s => s.name === formData.service);
    if (!selectedService) return 0;
    
    const basePrice = selectedService.price;
    const weekendSurcharge = isWeekend(formData.date) ? 20 : 0;
    return basePrice + weekendSurcharge;
  };

  const generateBookingId = () => {
    return "AHS" + Date.now().toString().slice(-6);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    const newBookingId = generateBookingId();
    setBookingId(newBookingId);
    setShowReceipt(true);

    toast({
      title: "Booking Confirmed!",
      description: "Your appointment has been booked successfully. Check your email for confirmation."
    });
  };

  const Receipt = () => (
    <Card className="max-w-md mx-auto bg-white border-2 border-dashed border-purple-300">
      <CardHeader className="text-center border-b border-dashed border-purple-200">
        <CardTitle className="text-purple-600">Artistry Hair Salon</CardTitle>
        <CardDescription>Appointment Receipt</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <div className="flex justify-between">
          <span className="font-medium">Booking ID:</span>
          <span className="font-mono">{bookingId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Customer:</span>
          <span>{formData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Phone:</span>
          <span>{formData.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span className="text-sm">{formData.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{new Date(formData.date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Time:</span>
          <span>{formData.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Service:</span>
          <span className="text-sm">{formData.service}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Stylist:</span>
          <span>{formData.stylist}</span>
        </div>
        {isWeekend(formData.date) && (
          <div className="flex justify-between text-orange-600">
            <span className="font-medium">Weekend Surcharge:</span>
            <span>$20.00</span>
          </div>
        )}
        <div className="border-t border-dashed border-purple-200 pt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span className="text-purple-600">${calculateTotal()}.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showReceipt) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600">Your appointment has been successfully booked.</p>
          </div>
          
          <Receipt />
          
          <div className="text-center mt-8 space-y-4">
            <Button onClick={() => window.print()} className="bg-purple-600 hover:bg-purple-700">
              <FileText className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>
            <br />
            <Button variant="outline" onClick={() => setShowReceipt(false)}>
              Book Another Appointment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
          <p className="text-gray-600">Schedule your visit with our expert stylists</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-purple-600" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={2}
                />
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {(formData.date && isWeekend(formData.date) ? timeSlots.weekend : timeSlots.weekday).map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service">Service *</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name} - ${service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stylist">Preferred Stylist</Label>
                  <Select value={formData.stylist} onValueChange={(value) => setFormData({...formData, stylist: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any stylist" />
                    </SelectTrigger>
                    <SelectContent>
                      {stylists.map((stylist) => (
                        <SelectItem key={stylist} value={stylist}>{stylist}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Special Requests/Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                />
              </div>

              {/* Pricing Display */}
              {formData.service && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-purple-600" />
                        Total Amount:
                      </span>
                      <span className="text-2xl font-bold text-purple-600">
                        ${calculateTotal()}.00
                      </span>
                    </div>
                    {isWeekend(formData.date) && (
                      <p className="text-sm text-orange-600 mt-2">
                        * Includes $20 weekend surcharge
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Terms & Conditions */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">
                    • Contact us 24 hours prior to reschedule your appointment
                  </p>
                  <p className="text-sm text-gray-600">
                    • Please arrive on time for your scheduled appointment
                  </p>
                  <p className="text-sm text-gray-600">
                    • Cancellation charges: Within 3 hours (40%), Within 12 hours (30%), Before 24 hours (No charge)
                  </p>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreedToTerms: checked as boolean})}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions *
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3">
                <Calendar className="mr-2 h-5 w-5" />
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
