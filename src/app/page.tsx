"use client";
import Header from "@/components/header";
import MasonryGrid from "@/components/masonry";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { Cormorant } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const italiana = Cormorant({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <PhotoAreaSection />
      <PopularSection />
      <InvestSection />
      <FooterSection />
    </main>
  );
}

/*
 * Hero Section
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen">
      <Image
        src={"/villa.jpg"}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 brightness-[38%]"
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        <h1
          className={`text-4xl md:text-7xl md:text-[5.5rem] text-center tracking-tight leading-none font-extrabold uppercase mb-5 ${italiana.className}`}
        >
          Explore Virtual Map Puri Agung Kerambitan
        </h1>
        <Link href={"https://capstone-pro-flax.vercel.app/"}>
          <Button
            variant={"default"}
            size={"lg"}
            className="rounded-full text-base font-normal px-9 py-6"
          >
            Virtual Map
          </Button>
        </Link>
      </div>
    </section>
  );
};

/*
 * About Section
 */
const AboutSection = () => {
  return (
    <section className="min-h-screen bg-white">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 p-10 md:p-20">
        <div className="relative min-h-72">
          <Image
            src={
              "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
            className=""
          />
        </div>
        <div className="my-auto">
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-thin uppercase mb-4">
            About Puri
          </h1>
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold uppercase mb-6">
            Agung Kerambitan
          </h1>
          <p className="font-light mb-14 md:w-[90%]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            asperiores repellat atque quae deserunt non dolorum tempora
            doloremque nesciunt vitae harum, voluptas voluptatibus nisi quaerat
            cupiditate, reprehenderit fugiat rerum qui! Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Laudantium, corporis quaerat. Nam
            hic nobis consequuntur facere! Odio saepe sapiente quo harum
            voluptatibus velit temporibus inventore, cumque esse qui repellendus
            deserunt!
          </p>
          <Button
            variant={"default"}
            size={"lg"}
            className="rounded-none font-light"
          >
            Explore More
          </Button>
        </div>
      </div>
    </section>
  );
};

/*
 * Service Section
 */
const PhotoAreaSection = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [images, setImages] = useState<string[]>([
    "https://picsum.photos/500",
    "https://picsum.photos/300",
    "https://picsum.photos/200",
    "https://picsum.photos/600",
    "https://picsum.photos/400",
    "https://picsum.photos/600",
    "https://picsum.photos/350",
    "https://picsum.photos/500",
    "https://picsum.photos/500",
  ]);

  const loadMoreImages = () => {
    setLoading(true);
    setImages((prevImages) => [
      ...prevImages,
      "https://picsum.photos/500",
      "https://picsum.photos/500",
      "https://picsum.photos/500",
    ]);
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-white mb-20">
      <h1 className="text-3xl md:text-5xl text-center font-thin uppercase my-8 mb-10">
        <span className="font-bold">Photo</span> Area
      </h1>
      <div className="h-screen relative flex justify-center overflow-auto mb-2">
        <MasonryGrid columns={3} images={images} />
      </div>
      <div className="flex justify-center">
        <Button
          variant={"outline"}
          size={"lg"}
          className="rounded-none font-light"
          onClick={loadMoreImages}
        >
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "More Area"
          )}
        </Button>
      </div>
    </section>
  );
};

/*
 * Popular Section
 */
const PopularSection = () => {
  return (
    <section className="min-h-screen bg-white">
      <h1 className="text-3xl md:text-5xl text-center font-thin uppercase mb-4">
        Visitor's
      </h1>
      <h1 className="text-3xl md:text-5xl text-center font-bold uppercase mb-10">
        Favorites
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 mb-2">
        <div className="relative group">
          <img
            className="min-h-[550px] bg-cover brightness-[.65] transition-all ease-linear duration-300 group-hover:brightness-100"
            src="https://images.unsplash.com/photo-1599777560450-e462cffc5368?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-4 left-4 text-white">
            <h1 className="text-2xl">The A</h1>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-thin">Starting from usd</p>
            <h1 className="text-2xl">$999,999</h1>
          </div>
        </div>
        <div className="relative group">
          <img
            className="min-h-[550px] bg-cover brightness-[.65] transition-all ease-linear duration-300 group-hover:brightness-100"
            src="https://plus.unsplash.com/premium_photo-1677474827617-6a7269f97574?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-4 left-4 text-white">
            <h1 className="text-2xl">The B</h1>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-thin">Starting from usd</p>
            <h1 className="text-2xl">$999,999</h1>
          </div>
        </div>
        <div className="relative group">
          <img
            className="min-h-[550px] bg-cover brightness-[.65] transition-all ease-linear duration-300 group-hover:brightness-100"
            src="https://images.unsplash.com/photo-1598911096723-af003b4ea77a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-4 left-4 text-white">
            <h1 className="text-2xl">The C</h1>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-thin">Starting from usd</p>
            <h1 className="text-2xl">$999,999</h1>
          </div>
        </div>
        <div className="relative group">
          <img
            className="min-h-[550px] bg-cover brightness-[.65] transition-all ease-linear duration-300 group-hover:brightness-100"
            src="https://images.unsplash.com/photo-1521574873411-508db8dbe55f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-4 left-4 text-white">
            <h1 className="text-2xl">The D</h1>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-thin">Starting from usd</p>
            <h1 className="text-2xl">$999,999</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          variant={"default"}
          size={"lg"}
          className="rounded-none font-light"
        >
          Find More
        </Button>
      </div>
    </section>
  );
};

/*
 * Invest Section
 */
const InvestSection = () => {
  const images: string[] = [
    "https://picsum.photos/200/180",
    "https://picsum.photos/200/200",
    "https://picsum.photos/200/150",
    "https://picsum.photos/200/250",
    "https://picsum.photos/200/210",
    "https://picsum.photos/200/200",
    "https://picsum.photos/200/200",
    "https://picsum.photos/200/200",
  ];

  return (
    <section className="min-h-screen bg-white">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 p-10 md:p-20">
        <div className="my-auto">
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-thin uppercase mb-4">
            Monument Puri
          </h1>
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold uppercase mb-6">
            Agung Kerambitan
          </h1>
          <p className="font-light mb-14 md:w-[90%]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            asperiores repellat atque quae deserunt non dolorum tempora
            doloremque nesciunt vitae harum, voluptas voluptatibus nisi quaerat
            cupiditate, reprehenderit fugiat rerum qui! Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Laudantium, corporis
            quaerat.voluptas voluptatibus nisi quaerat cupiditate, reprehenderit
            fugiat rerum qui! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Laudantium, corporis quaerat.
          </p>
          <Button
            variant={"default"}
            size={"lg"}
            className="rounded-none font-light"
          >
            Explore Bali Developments
          </Button>
        </div>
        <div className="relative flex justify-end">
          <MasonryGrid columns={2} images={images} />
        </div>
      </div>
    </section>
  );
};

/*
 * Invest Section
 */
const FooterSection = () => {
  return (
    <section className="bg-neutral-950 p-7">
      <div className="flex flex-col justify-center items-center border-b p-10">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4063.6680679150845!2d115.07731207518172!3d-8.547020186645682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x504576ba6f0b7cd%3A0xc30c2c19422036d6!2sPuri%20Agung%20Kerambitan!5e1!3m2!1sen!2sid!4v1720103697198!5m2!1sen!2sid"
              width="500"
              height="450"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex flex-col justify-center text-white">
            <div className="mb-3">
              <h1 className="uppercase text-xl font-semibold">Contact Us</h1>
              <h1 className="text-xl font-light">+(62)81999488778 - Phone</h1>
              <h1 className="text-xl font-light">
                +(62)81999488778 - WhatsApp
              </h1>
            </div>
            <div>
              <h1 className="uppercase text-xl font-semibold">Partner Kami</h1>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button variant={"link"} className="text-white">
          <Instagram />
        </Button>
      </div>
    </section>
  );
};
