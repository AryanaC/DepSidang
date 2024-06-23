import MasonryGrid from "@/components/masonry";
import { Button } from "@/components/ui/button";
import { Cormorant } from "next/font/google";
import Image from "next/image";

const italiana = Cormorant({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <InvestSection />
      <PopularSection />
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
          className={`text-4xl md:text-7xl md:text-[5.5rem] text-center tracking-tight leading-none font-extrabold uppercase ${italiana.className}`}
        >
          Redefining <br /> Luxury Living
        </h1>
        <p className="text-xs md:text-xl text-center font-thin mb-10 md:mb-14">
          A new dawn of Bali villa design perfection is coming to Uluwatu
        </p>
        <Button
          variant={"secondary"}
          size={"lg"}
          className="rounded-full text-base font-normal px-9 py-6"
        >
          Register Here
        </Button>
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
            About
          </h1>
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold uppercase mb-6">
            Balitecture
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
const ServiceSection = () => {
  return (
    <section className="min-h-screen bg-white">
      <h1 className="text-3xl md:text-5xl text-center font-thin uppercase my-8 mb-20">
        Our <span className="font-bold">Services</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-full min-h-96 group">
          <Image
            src={
              "https://images.unsplash.com/photo-1480996408299-fc0e830b5db1?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
            className="transition-all ease-linear duration-300 group-hover:brightness-50"
          />
          <div className="invisible absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-10 transition-all ease-linear duration-200 group-hover:visible">
            <h1 className="text-xl text-center font-thin uppercase mb-4">
              Our <span className="font-bold">Services</span>
            </h1>
            <p className="text-sm md:text-base text-center font-thin mb-10 md:mb-14 w-[70%]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
              consectetur, deleniti corporis vitae molestias, rerum, officia
              ipsa veritatis optio amet minus deserunt alias perferendis. Alias
              suscipit quos a sapiente accusantium?
            </p>
            <Button
              variant={"secondary"}
              size={"lg"}
              className="rounded-none text-sm md:text-base font-light px-6 md:px-9 py-3 md:py-6"
            >
              Register Here
            </Button>
          </div>
        </div>
        <div className="relative h-full min-h-96 group">
          <Image
            src={
              "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
            className="transition-all ease-linear duration-300 group-hover:brightness-50"
          />
          <div className="invisible absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-10 transition-all ease-linear duration-200 group-hover:visible">
            <h1 className="text-xl text-center font-thin uppercase mb-4">
              Our <span className="font-bold">Services</span>
            </h1>
            <p className="text-sm md:text-base text-center font-thin mb-10 md:mb-14 w-[70%]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
              consectetur, deleniti corporis vitae molestias, rerum, officia
              ipsa veritatis optio amet minus deserunt alias perferendis. Alias
              suscipit quos a sapiente accusantium?
            </p>
            <Button
              variant={"secondary"}
              size={"lg"}
              className="rounded-none text-sm md:text-base font-light px-6 md:px-9 py-3 md:py-6"
            >
              Register Here
            </Button>
          </div>
        </div>
        <div className="relative h-full min-h-96 group">
          <Image
            src={
              "https://images.unsplash.com/photo-1533633310920-cc9bf1e7f9b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
            className="transition-all ease-linear duration-300 group-hover:brightness-50"
          />
          <div className="invisible absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-10 transition-all ease-linear duration-200 group-hover:visible">
            <h1 className="text-xl text-center font-thin uppercase mb-4">
              Our <span className="font-bold">Services</span>
            </h1>
            <p className="text-sm md:text-base text-center font-thin mb-10 md:mb-14 w-[70%]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
              consectetur, deleniti corporis vitae molestias, rerum, officia
              ipsa veritatis optio amet minus deserunt alias perferendis. Alias
              suscipit quos a sapiente accusantium?
            </p>
            <Button
              variant={"secondary"}
              size={"lg"}
              className="rounded-none text-sm md:text-base font-light px-6 md:px-9 py-3 md:py-6"
            >
              Register Here
            </Button>
          </div>
        </div>
        <div className="relative h-full min-h-96 group">
          <Image
            src={
              "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
            className="transition-all ease-linear duration-300 group-hover:brightness-50"
          />
          <div className="invisible absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-10 transition-all ease-linear duration-200 group-hover:visible">
            <h1 className="text-xl text-center font-thin uppercase mb-4">
              Our <span className="font-bold">Services</span>
            </h1>
            <p className="text-sm md:text-base text-center font-thin mb-10 md:mb-14 w-[70%]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
              consectetur, deleniti corporis vitae molestias, rerum, officia
              ipsa veritatis optio amet minus deserunt alias perferendis. Alias
              suscipit quos a sapiente accusantium?
            </p>
            <Button
              variant={"secondary"}
              size={"lg"}
              className="rounded-none text-sm md:text-base font-light px-6 md:px-9 py-3 md:py-6"
            >
              Register Here
            </Button>
          </div>
        </div>
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
    "https://picsum.photos/200/100",
    "https://picsum.photos/200/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200/200",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/150",
    "https://picsum.photos/200/140",
  ];

  return (
    <section className="min-h-screen bg-white">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 p-10 md:p-20">
        <div className="my-auto">
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-thin uppercase mb-4">
            Invest in our
          </h1>
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold uppercase mb-6">
            New Developments
          </h1>
          <p className="font-light mb-14 md:w-[90%]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            asperiores repellat atque quae deserunt non dolorum tempora
            doloremque nesciunt vitae harum, voluptas voluptatibus nisi quaerat
            cupiditate, reprehenderit fugiat rerum qui! Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Laudantium, corporis quaerat.
          </p>
          <Button
            variant={"default"}
            size={"lg"}
            className="rounded-none font-light"
          >
            Explore Bali Developments
          </Button>
        </div>
        <div className="relative flex justify-center items-center">
          <MasonryGrid rows={4} columns={4} images={images} />
        </div>
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
        Our Popular
      </h1>
      <h1 className="text-3xl md:text-5xl text-center font-bold uppercase mb-10">
        Villa Packages
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-5">
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
        <div className="relative group">
          <img
            className="min-h-[550px] bg-cover brightness-[.65] transition-all ease-linear duration-300 group-hover:brightness-100"
            src="https://images.unsplash.com/photo-1607567618395-62fc2d132c3e?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-4 left-4 text-white">
            <h1 className="text-2xl">The E</h1>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-thin">Starting from usd</p>
            <h1 className="text-2xl">$999,999</h1>
          </div>
        </div>
      </div>
    </section>
  );
};
