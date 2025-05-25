
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Star, Users, Award, Calendar, Sparkles } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Scissors className="h-8 w-8 text-purple-600" />,
      title: "Expert Stylists",
      description: "Our professional team brings years of experience and artistry to every cut."
    },
    {
      icon: <Star className="h-8 w-8 text-purple-600" />,
      title: "Premium Services",
      description: "From cuts to colors, we offer comprehensive hair care services."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Personalized Care",
      description: "Every client receives individualized attention and customized styling."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Award Winning",
      description: "Recognized for excellence in hair styling and customer service."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Sparkles className="h-16 w-16 text-purple-600 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent mb-6">
              Artistry Hair Salon
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Where Beauty Meets Artistry. Transform your look with our expert stylists 
              and experience the art of beautiful hair.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/booking">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg">
                View Gallery
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5+</div>
              <div className="text-gray-600">Expert Stylists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5 Years</div>
              <div className="text-gray-600">Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Artistry?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional hair care services that exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive hair care services tailored to your unique style and needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">Hair Cuts & Styling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professional cuts and styling for all hair types and lengths.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">Color & Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Expert color treatments and highlighting techniques.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">Special Treatments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Deep conditioning, keratin treatments, and hair repair.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Hair Transformation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your appointment today and let our expert stylists create the perfect look for you.
          </p>
          <Link to="/booking">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Your Appointment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
