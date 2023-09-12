"use client";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import ChevronDownIcon from "./ui/icons/ChevronDownIcon";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "./ui/icons/SearchIcon";
import BellIcon from "./ui/icons/BellIcon";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((cur) => !cur);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((cur) => !cur);
  }, []);
  return (
    <nav className="w-full fixed z-40 select-none">
      <div
        className={`${
          showBackground ? "bg-zinc-900/90" : ""
        } px-4 lg:px-16 py-6 flex flex-row items-center transition duration-500`}
      >
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
          <ChevronDownIcon
            className={`text-white transition duration-300 ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <SearchIcon />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                className="object-cover rounded-md"
                src="/images/default-blue.png"
                alt="profile"
                width={100}
                height={100}
              />
            </div>
            <ChevronDownIcon
              className={`text-white transition duration-300 ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
