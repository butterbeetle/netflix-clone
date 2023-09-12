"use client";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import ChevronDownIcon from "./ui/icons/ChevronDownIcon";
import MobileMenu from "./MobileMenu";
import { useCallback, useState } from "react";
import SearchIcon from "./ui/icons/SearchIcon";
import BellIcon from "./ui/icons/BellIcon";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((cur) => !cur);
  }, []);

  return (
    <nav className="w-full fixed z-40 select-none">
      <div className="px-4 lg:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900/90 ">
        <Image
          className="h-4 lg:h-7"
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="flex flex-row items-center gap-2 ml-8 cursor-pointer relative lg:hidden "
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon className="text-white transition" />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <SearchIcon />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                className="object-cover rounded-md"
                src="/images/default-blue.png"
                alt="profile"
                width={100}
                height={100}
              />
            </div>
            <ChevronDownIcon className="text-white transition" />
          </div>
        </div>
      </div>
    </nav>
  );
}
