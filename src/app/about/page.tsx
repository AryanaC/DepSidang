"use client";
import MasonryGrid from "@/components/masonry";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { Cormorant } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const italiana = Cormorant({ subsets: ["latin"], weight: ["400"] });

export default function About() {
  return (
    <main>
      <AboutSection />
      <PembimbingSection />
      <TeamSection />
      <FooterSection />
    </main>
  );
}

/*
 * About Section
 */
const AboutSection = () => {
  return (
    <section className="min-h-svh flex flex-col justify-center items-center bg-white p-3 md:p-28">
      <div className="h-[225px] md:h-[450px] w-full md:w-[1000px] relative">
        <Image
          fill
          src={
            "https://media.discordapp.net/attachments/890225688341270559/1258436622731575407/Mask_group.png?ex=668809ef&is=6686b86f&hm=c2c95f6a2a539eb1dfef2fc9fb21054983fc4639a0617deaa5746b4cbae59d8b&=&format=webp&quality=lossless&width=2160&height=810"
          }
          alt=""
        ></Image>
      </div>
      <h1 className="text-3xl md:text-5xl text-center font-thin uppercase my-8 mb-7">
        <span className="font-bold">Pura Agung</span> Kerambitan
      </h1>
      <p className="text-xs md:text-base text-center font-light">
        Puri Agung Kerambitan merupakan salah satu Puri yang terletak di
        Kabupaten Tabanan tepatnya di Desa Kerambitan, Kecamatan Kerambitan,
        Kabupaten Tabanan, Provinsi Bali. Puri Agung Kerambitan memiliki luas 4
        Hektar dan terbagi menjadi 7 bagian dimana 6 bagiannya merupakan tempat
        peninggalan sejarah dan budaya yang masih terjaga. Tempat - tempat
        tersebut adalah Ancak Saji, Jaba Tandek, Tandakan, Sareng Agung, Batur
        Agung, dan Sareng Kaja, di mana tempat - tempat ini merupakan
        peninggalan bersejarah dari Puri Agung Kerambitan dengan makna dan
        fungsinya masing-masing.
      </p>
    </section>
  );
};

/*
 * Pembimbing Section
 */
const PembimbingSection = () => {
  return (
    <section className="min-h-svh bg-cover bg-[url('https://media.discordapp.net/attachments/890225688341270559/1258441675261349888/Mask_group_1.png?ex=66880ea4&is=6686bd24&hm=89ae77ff5fb74e9342f6504a3b40719d64b29010801fa1a675197513ba11cfea&=&format=webp&quality=lossless&width=1826&height=1028')] flex flex-col justify-center items-center bg-white p-3 md:p-28">
      <h1 className="text-3xl md:text-5xl text-center text-white font-thin uppercase my-8 mb-7">
        <span className="font-bold">Dosen</span> Pembimbing
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="w-[300px]">
          <div>
            <Image
              width={300}
              height={400}
              src="https://picsum.photos/300/400"
              alt=""
              className="rounded-md mb-3"
            />
            <h1 className="text-white text-xl mb-3">
              Prof. Dr. Ir. Made Sudarma, M.A.Sc, IPU., ASEAN Eng.
            </h1>
            <hr className="mb-3" />
            <h1 className="text-white text-xl">
                Dosen <span className="font-bold">Pembimbing 1</span>
            </h1>
          </div>
        </div>
        <div className="w-[300px]">
          <div>
            <Image
              width={300}
              height={400}
              src="https://picsum.photos/300/400"
              alt=""
              className="rounded-md mb-3"
            />
            <h1 className="text-white text-xl mb-3">I Made Arsa Suyadnya, ST., M.Eng.</h1>
            <hr className="mb-3" />
            <h1 className="text-white text-xl">Dosen <span className="font-bold">Pembimbing 2</span></h1>
          </div>
        </div>
      </div>
    </section>
  );
};

/*
 * Team Section
 */
const TeamSection = () => {
    return (
      <section className="min-h-svh bg-cover bg-[url('https://media.discordapp.net/attachments/890225688341270559/1258445836480811060/niklas-weiss--2WlTWZLnRc-unsplash_1.png?ex=66881284&is=6686c104&hm=50d2ecabafc1782ff4ca11770fb60302131864bb76f6da1048290233d200034a&=&format=webp&quality=lossless&width=1100&height=618')] flex flex-col justify-center items-center bg-white p-3 md:p-28">
        <h1 className="text-3xl md:text-5xl text-center text-white font-thin uppercase my-8 mb-7">
          <span className="font-bold">Our</span> Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="w-[300px]">
            <div>
              <Image
                width={300}
                height={400}
                src="https://picsum.photos/300/400"
                alt=""
                className="rounded-md mb-3"
              />
              <h1 className="text-white text-xl">I Wayan Aryana Cory</h1>
              <h1 className="text-white text-xl font-semibold mb-3">2005541149</h1>
              <hr className="mb-3" />
              <h1 className="text-white text-xl">Panoramic Photo Asset</h1>
            </div>
          </div>
          <div className="w-[300px]">
            <div>
              <Image
                width={300}
                height={400}
                src="https://picsum.photos/300/400"
                alt=""
                className="rounded-md mb-3"
              />
              <h1 className="text-white text-xl">Gusti Made Wijaya Kusuma</h1>
              <h1 className="text-white text-xl font-semibold mb-3">2005541150</h1>
              <hr className="mb-3" />
              <h1 className="text-white text-xl">UI/UX Designer</h1>
            </div>
          </div>
          <div className="w-[300px]">
            <div>
              <Image
                width={300}
                height={400}
                src="https://picsum.photos/300/400"
                alt=""
                className="rounded-md mb-3"
              />
              <h1 className="text-white text-xl">Surya Bima Putra</h1>
              <h1 className="text-white text-xl font-semibold mb-3">2005541161</h1>
              <hr className="mb-3" />
              <h1 className="text-white text-xl">Back-end Golang API</h1>
            </div>
          </div>
        </div>
      </section>
    );
  };

/*
 * Footer Section
 */
const FooterSection = () => {
  return (
    <section className="bg-neutral-950 p-2 md:p-7">
      <div className="flex flex-col justify-center items-center border-b p-2 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-2.5">
          <div>
            <iframe
              className="w-full md:w-[500px] h-auto md:h-[450px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4063.6680679150845!2d115.07731207518172!3d-8.547020186645682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x504576ba6f0b7cd%3A0xc30c2c19422036d6!2sPuri%20Agung%20Kerambitan!5e1!3m2!1sen!2sid!4v1720103697198!5m2!1sen!2sid"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex flex-col justify-center text-white">
            <div className="mb-3">
              <h1 className="uppercase text-base md:text-xl font-semibold">
                Contact Us
              </h1>
              <h1 className="text-base md:text-xl font-light">
                +(62)81999488778 - Phone
              </h1>
              <h1 className="text-base md:text-xl font-light">
                +(62)81999488778 - WhatsApp
              </h1>
            </div>
            <div>
              <h1 className="uppercase text-base md:text-xl font-semibold">
                Partner Kami
              </h1>
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
