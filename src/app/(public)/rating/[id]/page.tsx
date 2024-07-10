"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Comment } from "@/components/comment";
import { useState } from "react";
import { createUserComment } from "@/app/api/comment/route";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useParams } from "next/navigation";


const commentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  comment: z.string().min(1, "Comment is required"),
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
});


export default function Rating() {
  return (
    <main className="p-1 md:p-10">
      <RatingSection />
      <CommentSection />
    </main>
  );
}

const RatingSection = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const params = useParams<{ id: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      id: params.id as string,
      name,
      location,
      comment,
      rating,
    };

    try {
      commentSchema.parse(data);
      const response = await createUserComment(data);
      toast({
        title: "Success",
        description: "Your comment has been submitted successfully.",
      });
      setName("");
      setLocation("");
      setRating(0);
      setComment("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast({
            title: "Validation Error",
            description: err.message,
          });
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit the comment. Please try again.",
        });
      }
    }
  };

  return (
    <section className="min-h-svh bg-white p-3">
      <Card className="w-full max-w-md md:max-w-2xl mx-auto mt-28">
        <CardHeader>
          <CardTitle>Rate your favorite's spot</CardTitle>
          <CardDescription>Help us improve by sharing your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter your location" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`w-6 h-6 cursor-pointer ${index < rating ? "fill-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your feedback" rows={4} />
            </div>
            <CardFooter className="flex justify-end">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

const CommentSection = () => {

  return (
      <Comment />
  );
};
