
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, ThumbsUp, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  service: string;
  stylist: string;
  comment: string;
  helpful: number;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Sarah Mitchell",
      rating: 5,
      date: "2024-01-10",
      service: "Haircut & Styling",
      stylist: "Emma Wilson",
      comment: "Absolutely amazing experience! Emma understood exactly what I wanted and delivered beyond my expectations. The salon atmosphere is so relaxing and professional. Will definitely be back!",
      helpful: 12
    },
    {
      id: 2,
      name: "Jennifer Liu",
      rating: 5,
      date: "2024-01-08",
      service: "Color Treatment",
      stylist: "Sarah Johnson",
      comment: "Sarah is a color genius! I wanted a complete transformation and she delivered perfectly. The highlights look so natural and the whole process was comfortable. Highly recommend!",
      helpful: 8
    },
    {
      id: 3,
      name: "Amanda Rodriguez",
      rating: 4,
      date: "2024-01-05",
      service: "Keratin Treatment",
      stylist: "Maria Garcia",
      comment: "Great service and results! My hair feels so much smoother and more manageable. The only reason I'm not giving 5 stars is the wait time, but Maria made up for it with her expertise.",
      helpful: 6
    },
    {
      id: 4,
      name: "Lisa Thompson",
      rating: 5,
      date: "2024-01-03",
      service: "Highlights",
      stylist: "Ashley Chen",
      comment: "Ashley is incredible! She took my damaged hair and transformed it into something beautiful. The balayage technique she used is flawless. The salon is clean, modern, and the staff is friendly.",
      helpful: 15
    },
    {
      id: 5,
      name: "Rachel Green",
      rating: 5,
      date: "2023-12-28",
      service: "Haircut & Styling",
      stylist: "Emma Wilson",
      comment: "Best haircut I've ever had! Emma listened to all my concerns and gave me exactly what I wanted. The products they use are top-quality and my hair has never looked better.",
      helpful: 9
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    service: "",
    stylist: "",
    rating: 0,
    comment: ""
  });

  const [showForm, setShowForm] = useState(false);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      service: newReview.service,
      stylist: newReview.stylist,
      comment: newReview.comment,
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({
      name: "",
      email: "",
      service: "",
      stylist: "",
      rating: 0,
      comment: ""
    });
    setShowForm(false);

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. Your review has been posted."
    });
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : interactive 
                  ? "text-gray-300 hover:text-yellow-400 cursor-pointer"
                  : "text-gray-300"
            }`}
            onClick={interactive ? () => setNewReview({...newReview, rating: star}) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Reviews</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read what our clients say about their experience at Artistry Hair Salon
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Overall Rating</CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl font-bold text-purple-600">
                    {averageRating.toFixed(1)}
                  </span>
                  <div>
                    {renderStars(Math.round(averageRating))}
                    <p className="text-sm text-gray-600 mt-1">
                      Based on {totalReviews} reviews
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-8">{rating} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowForm(!showForm)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Review Form */}
            {showForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Write Your Review</CardTitle>
                  <CardDescription>Share your experience with our salon</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reviewName">Your Name *</Label>
                        <Input
                          id="reviewName"
                          value={newReview.name}
                          onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewEmail">Email (optional)</Label>
                        <Input
                          id="reviewEmail"
                          type="email"
                          value={newReview.email}
                          onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reviewService">Service Received</Label>
                        <Input
                          id="reviewService"
                          value={newReview.service}
                          onChange={(e) => setNewReview({...newReview, service: e.target.value})}
                          placeholder="e.g., Haircut & Styling"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewStylist">Stylist Name</Label>
                        <Input
                          id="reviewStylist"
                          value={newReview.stylist}
                          onChange={(e) => setNewReview({...newReview, stylist: e.target.value})}
                          placeholder="e.g., Sarah Johnson"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Rating *</Label>
                      <div className="mt-2">
                        {renderStars(newReview.rating, true)}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reviewComment">Your Review *</Label>
                      <Textarea
                        id="reviewComment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        rows={4}
                        placeholder="Share your experience..."
                        required
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Submit Review
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 mb-3">
                        {review.service && (
                          <Badge variant="secondary">{review.service}</Badge>
                        )}
                        {review.stylist && (
                          <Badge variant="outline">Stylist: {review.stylist}</Badge>
                        )}
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
