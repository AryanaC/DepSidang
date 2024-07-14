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
import { deleteGalery, getGalery } from "@/app/api/gallery/route";
import { IGallery } from "@/types/gallery";
import Image from "next/image";
import { List, LogOut, PanelLeftIcon, Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { toast } from "@/components/ui/use-toast";
import { HomeIcon } from "@/components/icons/all-icon";
import CreateGalery from "@/components/galery/create";
import UpdateGalery from "@/components/galery/update";

export default function Dashboard() {
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
      <Sidebar active={0} />
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
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/comment"
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
  const [data, setData] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [galeryToUpdate, setGaleryToUpdate] = useState<IGallery | null>();
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

  const handleDelete = async (id: any) => {
    const response = await deleteGalery(id);
    console.log(response);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getGalery();
      setData(result);
    } catch (error) {
      console.error("Error fetching galery data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerUpdateDialog = (item: IGallery) => {
    setGaleryToUpdate(item);
    setOpenUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setGaleryToUpdate(null);
    setOpenUpdateDialog(false);
    fetchData();
  }

  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
    fetchData();
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h1>Data Galery</h1>
            <Button variant={"default"} onClick={() => setOpenCreateDialog(true)}>
              Tambah
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Table of data</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>...</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt="Foto"
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{item.information.judul_foto}</TableCell>
                <TableCell>{item.information.nama_lokasi}</TableCell>
                <TableCell>{item.information.deskripsi}</TableCell>
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
                        onClick={() => triggerUpdateDialog(item)}
                      >
                        <Pen className="w-4" /> Update Galery
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 flex items-center gap-2"
                        onClick={() => handleDelete(item.id_galery)}
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
        {galeryToUpdate && (
        <UpdateGalery
          galery={galeryToUpdate}
          open={openUpdateDialog}
          onClose={closeUpdateDialog}
        />
      )}
      <CreateGalery open={openCreateDialog} onClose={closeCreateDialog} />
    </Card>
  );
};
