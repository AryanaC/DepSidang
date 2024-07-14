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
  updateReplyComment,
} from "@/app/api/comment/route";
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
  List,
  LogOut,
  PanelLeftIcon,
  Pen,
  ReplyIcon,
  Trash2,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { replySchema } from "@/schemas/reply-schema";
import { IInformation } from "@/types/information";
import { deleteInformation, getInformation } from "@/app/api/information/route";
import CreateInformation from "@/components/information/create";
import UpdateInformation from "@/components/information/update";
import { HomeIcon } from "@/components/icons/all-icon";

export default function DashboardInformation() {
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
      <Sidebar active={2} />
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
          <div className="w-full mt-4 overflow-auto">
            <TableView />
          </div>
        </main>
      </div>
    </div>
  );
}

const TableView = () => {
  const [data, setData] = useState<IInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [createInformationDialogOpen, setCreateInformationDialogOpen] = useState(false);
  const [updateInformationDialogOpen, setUpdateInformationDialogOpen] = useState(false);
  const [informationToUpdate, setInformationToUpdate] = useState<IInformation>();

  const fetchData = async () => {
    try {
      const result = await getInformation();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching information:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch information.",
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
      await deleteInformation(id);
      setData(data.filter((item) => item.id !== id));
      toast({
        title: "Success",
        description: "Information deleted successfully.",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting Information:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete Information.",
      });
    }
  };

  const openInformationCreateDialog = () => {
    setCreateInformationDialogOpen(true);
  };
  const closeCreateInformationDialog = () => {
    setCreateInformationDialogOpen(false);
    fetchData();
  }


  const openInformationUpdateDialog = (item: IInformation) => {
    setInformationToUpdate(item);
    setUpdateInformationDialogOpen(true);
  };
  const closeUpdateInformationDialog = () => {
    setUpdateInformationDialogOpen(false);
    fetchData();
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
          Data Informasi
          <Button onClick={() => openInformationCreateDialog()}>
            Tambah
          </Button>
          </div>
          </CardTitle>
        <CardDescription>Table of information</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-72 md:min-w-52">Judul</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Nama Lokasi</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Deskripsi</TableHead>
              <TableHead>...</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.judul_foto}</TableCell>
                <TableCell>{item.nama_lokasi}</TableCell>
                <TableCell>{item.deskripsi}</TableCell>
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
                        onClick={() => openInformationUpdateDialog(item)}
                      >
                        <Pen className="w-4" /> Edit Information
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 flex items-center gap-2"
                        onClick={() => handleDelete(item.id_information)}
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
        <CreateInformation
          open={createInformationDialogOpen}
          onClose={closeCreateInformationDialog}
        />
        <UpdateInformation
          information={informationToUpdate}
          open={updateInformationDialogOpen}
          onClose={closeUpdateInformationDialog}
        />
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