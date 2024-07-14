"use client";

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
