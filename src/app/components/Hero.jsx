"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

const Hero = ({ header, text }) => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <section className="grid grid-cols-4 h-screen mb-28">
      <div className="h-full col-start-1 col-end-5 row-start-1 row-end-3 bg-trans z-10"></div>
      <img src="/hero.avif" alt="hero_img" className="h-screen w-full col-start-1 col-end-5 row-start-1 row-end-3 object-cover" />
      <div className="flex text-white flex-col justify-center self-center text-center col-start-2 col-end-4 row-start-1 row-end-3 z-20">
        <h1 className="text-5xl font-bold">{header}</h1>
        <p className="bayon text-lg mt-4">{text}</p>
      </div>

      <div className="bayon text-white text-3xl flex justify-around px-5 py-5 self-end col-start-1 col-end-5 row-start-2 text-center py-4z-20 z-20">
        <a href="/" className={`hover:text-gray-300 ${isActive("/") ? "underline" : ""}`}>
          FORSIDE
        </a>
        <a href="/tickets" className={`hover:text-gray-300 ${isActive("/tickets") ? "underline" : ""}`}>
          BILLETTER
        </a>
        <a href="/about" className={`hover:text-gray-300 ${isActive("/about") ? "underline" : ""}`}>
          OM OS
        </a>
      </div>

      <Header />
    </section>
  );
};

export default Hero;
