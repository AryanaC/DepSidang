"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { IGallery } from "@/types/gallery";
import { getGalery } from "../api/gallery/route";
import Image from "next/image";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Rating() {
  return (
    <main>
      <RatingSection />
    </main>
  );
}

const RatingSection = () => {

  return (
    <section className="min-h-svh bg-white p-3">
       <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Give us your feedback</CardTitle>
        <CardDescription>Help us improve by sharing your experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter your location" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center gap-2">
              <StarIcon className="w-6 h-6 fill-primary" />
              <StarIcon className="w-6 h-6 fill-primary" />
              <StarIcon className="w-6 h-6 fill-primary" />
              <StarIcon className="w-6 h-6 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-6 h-6 fill-muted stroke-muted-foreground" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" placeholder="Enter your feedback" rows={4} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Submit</Button>
      </CardFooter>
    </Card>
    </section>
  );
};
