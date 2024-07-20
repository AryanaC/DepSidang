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
import { toast } from "@/components/ui/use-toast";
import {
  List,
  LogOut,
  PanelLeftIcon,
  Pen,
  Trash2,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { IMonument } from "@/types/monument";
import { deleteMonument, getMonument } from "@/app/api/monument/route";
import CreateMonument from "@/components/monument/create";
import UpdateMonument from "@/components/monument/update";
import { HomeIcon } from "@/components/icons/all-icon";
import Image from "next/image";

export default function DashboardMonument() {
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    toast({
      variant: "destructive",
      title: "Logout",
      description: "You have logged out.",
    });
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar active={3} />
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
  const [data, setData] = useState<IMonument[]>([]);
  const [loading, setLoading] = useState(true);
  const [createMonumentDialogOpen, setCreateMonumentDialogOpen] =
    useState(false);
  const [updateMonumentDialogOpen, setUpdateMonumentDialogOpen] =
    useState(false);
  const [monumentToUpdate, setMonumentToUpdate] = useState<IMonument | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getMonument();
      setData(result.data || []);
    } catch (error) {
      console.error("Error fetching monument:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch monument.",
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
      await deleteMonument(id);
      setData(data.filter((item) => item.id !== id));
      toast({
        title: "Success",
        description: "Monument deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting Monument:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete Monument.",
      });
    }
  };

  const openMonumentCreateDialog = () => {
    setCreateMonumentDialogOpen(true);
  };

  const closeCreateMonumentDialog = () => {
    setCreateMonumentDialogOpen(false);
    fetchData();
  };

  const openMonumentUpdateDialog = (item: IMonument) => {
    setMonumentToUpdate(item);
    setUpdateMonumentDialogOpen(true);
  };

  const closeUpdateMonumentDialog = () => {
    setUpdateMonumentDialogOpen(false);
    fetchData();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            Data Monument
            <Button onClick={openMonumentCreateDialog}>Tambah</Button>
          </div>
        </CardTitle>
        <CardDescription>Table of monument</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-72 md:min-w-52">Image</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Judul</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Nama Lokasi</TableHead>
              <TableHead className="min-w-72 md:min-w-52">Deskripsi</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt="Foto"
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
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
                        onClick={() => openMonumentUpdateDialog(item)}
                      >
                        <Pen className="w-4" /> Edit Monument
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CreateMonument
        open={createMonumentDialogOpen}
        onClose={closeCreateMonumentDialog}
      />
      {monumentToUpdate && (
        <UpdateMonument
          monument={monumentToUpdate}
          open={updateMonumentDialogOpen}
          onClose={closeUpdateMonumentDialog}
        />
      )}
    </Card>
  );
};
