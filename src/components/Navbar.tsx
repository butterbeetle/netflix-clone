"use client";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import ChevronDownIcon from "./ui/icons/ChevronDownIcon";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "./ui/icons/SearchIcon";
import BellIcon from "./ui/icons/BellIcon";
import AccountMenu from "./AccountMenu";
import Link from "next/link";

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
        } px-4 lg:px-12 py-1 flex flex-row items-center transition duration-500`}
      >
        <Link href={"/"} className=" flex items-center w-10  lg:w-20">
          <Image
            className="object-cover"
            src="/images/logo.png"
            alt="Logo"
            priority
            width={100}
            height={100}
          />
        </Link>
        <div className="flex-row ml-12 gap-5 hidden lg:flex text-sm">
          <NavbarItem label="홈" />
          <NavbarItem label="시리즈" />
          <NavbarItem label="영화" />
          <NavbarItem label="New! 요즘 대세 콘텐츠" />
          <NavbarItem label="내가 찜한 리스트" />
          <NavbarItem label="언어별로 찾아보기" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="flex flex-row items-center gap-2 ml-8 cursor-pointer relative lg:hidden "
        >
          <p className="text-white text-[0.5rem]">메뉴</p>
          <ChevronDownIcon
            className={`text-white transition duration-300 ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-4 items-center">
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
            <div className="w-6 h-6 rounded-md overflow-hidden">
              <Image
                className="object-cover rounded-md"
                src="/images/default-blue.png"
                alt="profile"
                priority
                width={100}
                height={100}
              />
            </div>
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
