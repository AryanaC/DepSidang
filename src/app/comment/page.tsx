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
import { Comment } from "@/components/comment";

export default function Galery() {
  return (
    <main>
      <CommentSection />
    </main>
  );
}

const CommentSection = () => {

  return (
    <section className="min-h-svh bg-white p-3 md:p-28">
      <h1 className="text-2xl font-bold text-center">Our Gallery</h1>
      <Comment></Comment>
    </section>
  );
};
