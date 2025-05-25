
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Heart, Star } from "lucide-react";

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      category: "Hairstyles",
      title: "Modern Bob Cut",
      description: "Sleek and sophisticated bob with subtle highlights",
      image: "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Bob", "Highlights", "Modern"]
    },
    {
      id: 2,
      category: "Color",
      title: "Balayage Highlights",
      description: "Natural-looking balayage with warm honey tones",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Balayage", "Highlights", "Color"]
    },
    {
      id: 3,
      category: "Salon",
      title: "Modern Interior",
      description: "Our stylish and comfortable salon space",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Interior", "Modern", "Comfort"]
    },
    {
      id: 4,
      category: "Hairstyles",
      title: "Layered Cut",
      description: "Textured layers for volume and movement",
      image: "https://images.unsplash.com/photo-1594824792070-7a2b60b74493?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Layers", "Volume", "Texture"]
    },
    {
      id: 5,
      category: "Color",
      title: "Platinum Blonde",
      description: "Bold platinum blonde transformation",
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Blonde", "Platinum", "Bold"]
    },
    {
      id: 6,
      category: "Salon",
      title: "Styling Station",
      description: "Professional styling stations with premium equipment",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Equipment", "Professional", "Station"]
    },
    {
      id: 7,
      category: "Hairstyles",
      title: "Curly Styling",
      description: "Beautiful natural curls enhanced and styled",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Curls", "Natural", "Styling"]
    },
    {
      id: 8,
      category: "Color",
      title: "Ombre Effect",
      description: "Smooth gradient ombre from dark to light",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Ombre", "Gradient", "Color"]
    },
    {
      id: 9,
      category: "Salon",
      title: "Reception Area",
      description: "Welcoming reception and waiting area",
      image: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Reception", "Waiting", "Welcome"]
    }
  ];

  const categories = ["All", "Hairstyles", "Color", "Salon"];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our beautiful work and salon atmosphere. Get inspired for your next visit!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="secondary" 
              className="px-4 py-2 cursor-pointer hover:bg-amber-100 hover:text-amber-700 transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    <div className="bg-white rounded-full p-2 cursor-pointer hover:bg-amber-50">
                      <Heart className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="bg-white rounded-full p-2 cursor-pointer hover:bg-amber-50">
                      <Camera className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-amber-600">
                  {item.category}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">Beautiful work!</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Look?</h2>
            <p className="text-xl opacity-90 mb-6">
              Book your appointment today and let our expert stylists create something beautiful for you.
            </p>
            <a 
              href="/booking" 
              className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
