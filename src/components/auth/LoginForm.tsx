"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>("");
  //Fields ref
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Form submit
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/application/today");
    } else {
      setError(res?.error || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col rounded-lg bg-background-2 p-4 max-w-[400px]">
      <h1 className="text-3xl lg:text-4xl">Login with an existing account!</h1>

      <form className="mb-3" onSubmit={login}>
        <div className="mb-5">
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            maxLength={100}
            required={true}
            aria-required={true}
            id="email"
            name="email"
            placeholder="email@example.com"
            ref={emailRef}
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            maxLength={50}
            required={true}
            aria-required={true}
            id="password"
            name="password"
            placeholder="••••••••••"
            ref={passwordRef}
          />
        </div>
        <Input
          type="submit"
          value="Login"
          className="cursor-pointer bg-purple hover:bg-purple/80"
        />
      </form>
      {error && (
        <div className="text-red-500 font-medium text-xs mt-1">{error}</div>
      )}
    </div>
  );
}
