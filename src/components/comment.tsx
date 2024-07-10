import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { getComments, getUserComments } from "@/app/api/comment/route";
import { IComment } from "@/types/comment";

export function Comment() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getUserComments();
        setComments(response);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch comments. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-12">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4">
          <CommentCard comment={comment} />
        </div>
      ))}
    </div>
  );
}

const CommentCard = ({ comment }: { comment: IComment }) => {
  return (
    <>
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{comment.name}</h4>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 ${index < comment.rating ? 'fill-yellow-400' : 'fill-muted stroke-muted-foreground'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-neutral-800">{comment.comment}</p>
        </div>
      </div>
      {/* {comment.replies && comment.replies.map((reply) => (
        <div key={reply.id} className="flex items-start gap-4 ml-14">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={reply.avatar} />
            <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{reply.author}</h4>
            </div>
            <p className="text-muted-foreground">{reply.text}</p>
          </div>
        </div>
      ))} */}
    </>
  );
};

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
