"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  deleteComment,
  getComments,
  updateReplyComment,
  validateComment,
} from "@/app/api/comment/route";
import { IComment, ValidateData } from "@/types/comment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  List,
  LogOut,
  PanelLeftIcon,
  ReplyIcon,
  StarIcon,
  Trash2,
  X,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { replySchema } from "@/schemas/reply-schema";
import { HomeIcon } from "@/components/icons/all-icon";

export default function DashboardComment() {
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    toast({
      variant: "destructive",
      title: "Logout",
      description: `You have logged out.`,
    });
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar active={1} />
      <div className="w-full flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="w-full sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeftIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <List className="h-5 w-5" />
                  Comments
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#" prefetch={false}>
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto text-lg font-bold">Dashboard</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 flex items-center gap-2"
                onClick={logOut}
              >
                <LogOut className="w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="w-full flex p-4 sm:p-6">
          <div className="mt-4 overflow-auto">
            <TableView />
          </div>
        </main>
      </div>
    </div>
  );
}

const TableView = () => {
  const [data, setData] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const result = await getComments();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch comments.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      setData(data.filter((item) => item.id !== id));
      toast({
        title: "Success",
        description: "Comment deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete comment.",
      });
    }
  };

  const handleValidate = async (id: string, status: string) => {
    try {
      const validData: ValidateData = {
        status: status === "validated" ? false : true,
      };
      await validateComment(id, validData);
      setData(
        data.map((item) =>
          item.id === id
            ? {
                ...item,
                status: status === "validated" ? "unvalidated" : "validated",
              }
            : item
        )
      );
      toast({
        title: "Success",
        description: `Comment ${
          status === "validated" ? "unvalidated" : "validated"
        } successfully.`,
      });
    } catch (error) {
      console.error("Error validating comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change comment status.",
      });
    }
  };

  const openReplyDialog = (commentId: string) => {
    setCurrentCommentId(commentId);
    setReplyDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Komentar</CardTitle>
        <CardDescription>Table of comments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-72 md:min-w-52">Lokasi</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Nama</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Komentar</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Balasan</TableHead>
              <TableHead className="min-w-36">Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>...</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.galery.namalokasi}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>{item.reply}</TableCell>
                <TableCell>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`w-4 h-4 ${
                          index < item.rating
                            ? "fill-yellow-400 stroke-yellow-950"
                            : "fill-muted stroke-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <h1
                    className={`w-fit p-[3px] ${
                      item.status === "unvalidated"
                        ? "bg-red-400/20 text-red-700"
                        : "bg-green-400/30 text-green-700"
                    } text-center text-sm font-medium rounded`}
                  >
                    {item.status}
                  </h1>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="blue" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => openReplyDialog(item.id)}
                      >
                        <ReplyIcon className="w-4" /> Reply
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => handleValidate(item.id, item.status)}
                      >
                        {item.status === "unvalidated" ? (
                          <Check className="w-4" />
                        ) : (
                          <X className="w-4" />
                        )}
                        {item.status === "unvalidated"
                          ? "Validate"
                          : "Unvalidate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 flex items-center gap-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {currentCommentId && (
        <ReplyDialog
          commentId={currentCommentId}
          open={replyDialogOpen}
          onClose={() => setReplyDialogOpen(false)}
          fetch={fetchData}
        />
      )}
    </Card>
  );
};


interface ReplyData {
  reply_comment: string;
}

const ReplyDialog = ({ commentId, open, onClose, fetch }: { commentId: string; open: any; onClose: any; fetch: any }) => {
  const [reply, setReply] = useState<ReplyData>({ reply_comment: "" });

  const setReplyData = (e: any) => {
    setReply({ reply_comment: e.target.value });
  };

  const handleReply = async () => {
    try {
      replySchema.parse(reply);
      
      await updateReplyComment(commentId, reply);
      fetch();
      toast({
        title: "Success",
        description: "Reply updated successfully.",
      });
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error.errors[0].message,
        });
      } else {
        console.error("Error updating reply:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update reply.",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reply to Comment</DialogTitle>
          <DialogDescription>
            Enter your reply below and click "Save changes" when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="reply" className="pb-2">
              Reply Comment
            </Label>
            <Textarea
              id="reply"
              value={reply.reply_comment}
              onChange={setReplyData}
              className=""
            />
          </div>
        </div>
        <DialogFooter className="flex justify-end">
          <Button type="submit" onClick={handleReply}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
