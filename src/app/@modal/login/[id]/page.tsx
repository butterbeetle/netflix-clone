"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <div className="mt-8  bg-red-500">
      <span onClick={() => router.back()}>Close modal</span>
      <h1>Login</h1>
    </div>
  );
}
