
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, Settings, Check, X, Clock, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  stylist: string;
  status: "pending" | "approved" | "rejected";
  amount: number;
}

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  
  // Mock data for demonstrations
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "AHS123456",
      customerName: "Alice Johnson",
      email: "alice@example.com",
      phone: "(555) 123-4567",
      date: "2024-01-15",
      time: "2:00 PM",
      service: "Haircut & Styling",
      stylist: "Sarah Johnson",
      status: "pending",
      amount: 80
    },
    {
      id: "AHS123457",
      customerName: "Bob Smith",
      email: "bob@example.com",
      phone: "(555) 987-6543",
      date: "2024-01-16",
      time: "11:00 AM",
      service: "Color Treatment",
      stylist: "Emma Wilson",
      status: "approved",
      amount: 140
    },
    {
      id: "AHS123458",
      customerName: "Carol Davis",
      email: "carol@example.com",
      phone: "(555) 456-7890",
      date: "2024-01-17",
      time: "3:00 PM",
      service: "Highlights",
      stylist: "Maria Garcia",
      status: "pending",
      amount: 170
    }
  ]);

  const stylists = ["Sarah Johnson", "Emma Wilson", "Maria Garcia", "Ashley Chen"];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication (in real app, this would be secure)
    if (credentials.username === "admin" && credentials.password === "salon123") {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!"
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try username: admin, password: salon123",
        variant: "destructive"
      });
    }
  };

  const handleBookingAction = (bookingId: string, action: "approve" | "reject") => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action === "approve" ? "approved" : "rejected" }
        : booking
    ));
    
    toast({
      title: `Booking ${action === "approve" ? "Approved" : "Rejected"}`,
      description: `Booking ${bookingId} has been ${action === "approve" ? "approved" : "rejected"}.`
    });
  };

  const assignStylist = (bookingId: string, stylist: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, stylist }
        : booking
    ));
    
    toast({
      title: "Stylist Assigned",
      description: `${stylist} has been assigned to booking ${bookingId}.`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const approvedBookings = bookings.filter(b => b.status === "approved");
  const totalRevenue = approvedBookings.reduce((sum, booking) => sum + booking.amount, 0);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-purple-600">Admin Login</CardTitle>
            <CardDescription>Access the salon management dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Login
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Demo: username: admin, password: salon123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage appointments and salon operations</p>
          </div>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Check className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{approvedBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Bookings</CardTitle>
                <CardDescription>Review and manage customer appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div>
                            <h3 className="font-semibold">{booking.customerName}</h3>
                            <p className="text-sm text-gray-600">{booking.email}</p>
                            <p className="text-sm text-gray-600">{booking.phone}</p>
                          </div>
                          
                          <div>
                            <p className="font-medium">{booking.service}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                            <p className="text-sm font-medium text-purple-600">${booking.amount}</p>
                          </div>

                          <div className="space-y-2">
                            {getStatusBadge(booking.status)}
                            <div className="flex items-center space-x-2">
                              <Select
                                value={booking.stylist}
                                onValueChange={(value) => assignStylist(booking.id, value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Assign stylist" />
                                </SelectTrigger>
                                <SelectContent>
                                  {stylists.map((stylist) => (
                                    <SelectItem key={stylist} value={stylist}>
                                      {stylist}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleBookingAction(booking.id, "approve")}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleBookingAction(booking.id, "reject")}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            {booking.status !== "pending" && (
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Management</CardTitle>
                <CardDescription>Manage stylist availability and time slots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule Management</h3>
                  <p className="text-gray-600">Advanced scheduling features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Salon Settings</CardTitle>
                <CardDescription>Configure salon operations and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Settings Panel</h3>
                  <p className="text-gray-600">Configuration options coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
