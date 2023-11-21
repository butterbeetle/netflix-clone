"use client";

import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import GithubIcon from "@/components/ui/icons/GithubIcon";
import FooterInfo from "@/components/ui/FooterInfo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AuthErrorString } from "@/util/error";

const footerMenu = [
  { title: "자주 묻는 질문" },
  { title: "고객 센터" },
  { title: "이용 약관" },
  { title: "개인정보 처리방침" },
  { title: "쿠키 설정" },
  { title: "회사 정보" },
];

export default function AuthPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const [error, setError] = useState<null | string>(null);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const login = useCallback(async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/profiles",
    });
    if (res?.error === null) router.push(res.url as string);
    else {
      router.push(
        `${pathname}?${createQueryString("error", res?.error as string)}`
      );
    }
  }, [email, password, router, pathname, createQueryString]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        router.push(
          `${pathname}?${createQueryString(
            "error",
            error.response?.data as string
          )}`
        );
      }
    }
  }, [email, name, password, login, router, createQueryString, pathname]);

  useEffect(() => {
    const errorHandler = () => {
      const error = searchParams.get("error");
      if (error !== null) {
        setError(error);
      }
    };
    errorHandler();
  }, [error, searchParams]);

  return (
    <div
      className="relative w-full h-screen md:h-full bg-[url('/images/hero.jpg')] 
    bg-no-repeat  bg-fixed bg-cover select-none"
    >
      <div className="bg-black w-full h-full md:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" width={150} height={150} />
        </nav>
        <main className="flex justify-center mb-0 md:mb-44 border-b border-b-[#737373] md:border-0">
          <div
            className="bg-black/80 min-h-[550px] md:min-h-[660px] p-16 self-center 
          mt-2 lg:w-2/5 md:max-w-md rounded-md w-full"
          >
            <h1 className="text-white text-3xl mb-8 font-semibold">
              {variant === "login" ? "로그인" : "회원가입"}
            </h1>
            <div className="flex flex-col gap-4">
              {error && (
                <div
                  className="bg-[#e87c03] rounded-md text-white text-sm
                w-full py-[10px] px-[20px]"
                >
                  {AuthErrorString(error)}
                </div>
              )}
              {variant === "register" && (
                <Input
                  id="name"
                  label="이름"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              )}
              <Input
                id="email"
                label="이메일 주소"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "로그인" : "회원가입"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
                w-10
                h-10
                bg-white 
                rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <GoogleIcon size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="
                w-10
                h-10
                bg-white 
                rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <GithubIcon size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 text-sm text-center ">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </main>
        <footer className="relative  bg-black md:bg-opacity-70 text-[#737373] p-8 pb-16">
          <div className="mx-auto max-w-[1000px]">
            <p className="mb-8 ">
              질문이 있으신가요? 문의 전화: 00-308-321-0161 (수신자 부담)
            </p>
            <ul className="text-sm flex flex-wrap w-full">
              {footerMenu.map(({ title }) => (
                <li className="w-1/3 md:w-1/4 mb-4 " key={title}>
                  <p className="w-fit cursor-pointer hover:underline">
                    {title}
                  </p>
                </li>
              ))}
            </ul>
            <FooterInfo />
          </div>
        </footer>
      </div>
    </div>
  );
}
