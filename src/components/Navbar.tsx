import Image from "next/image";
import React from "react";

interface INavbar {
  avatar?: string;
  title: string;
}

const Navbar: React.FC<INavbar> = ({ avatar, title }) => {
  return (
    <nav className="flex justify-between bg-gray-900 text-white min-w-screen cursor-default">
      <div className="px-5 xl:px-12 py-5 flex w-full items-center">
        <div className="flex flex-row justify-between items-center gap-2">
          {avatar && (
            <Image
              src={avatar}
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <h1 className="text-sm font-light font-heading sm:text-xl lg:font-base">
            {title}
          </h1>
        </div>
      </div>
      {/* <a className="flex mr-6 items-center" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
        </svg>
        <span className="flex absolute -mt-5 ml-4">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
      </a> */}
    </nav>
  );
};

export default Navbar;
