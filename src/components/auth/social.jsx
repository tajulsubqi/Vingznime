"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col w-full items-start gap-5 self-stretch md:flex-row">
      <button
        onClick={() => onClick("google")}
        className="flex w-full h-10 py-2.5 px-5 justify-center items-center gap-2 self-stretch rounded-lg border border-Grey-60 transition-colors hover:bg-Form-Blue hover:text-Absolute-White"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-sm font-medium">Sign in with Google</span>
      </button>

      <button
        onClick={() => onClick("github")}
        className="flex w-full h-10 py-2.5 px-5 justify-center items-center gap-2 self-stretch rounded-lg border border-Grey-60 transition-colors hover:bg-Form-Blue hover:text-Absolute-White"
      >
        <FaGithub className="h-5 w-5" />
        <span className="text-sm font-medium">Sign in with Github</span>
      </button>
    </div>
  );
};
