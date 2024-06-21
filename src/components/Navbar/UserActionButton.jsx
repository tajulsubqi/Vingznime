"use client";

import Link from "next/link";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserButton from "@/src/components/Navbar/UserButton";

const UserAction = () => {
  const user = useCurrentUser();

  return (
    <div className="flex">
      {user ? (
        <UserButton />
      ) : (
        <Link
          href="/auth/login"
          className="flex flex-none rounded-lg py-2 px-3 gap-1.5 bg-Absolute-White text-Black-8 transition-colors hover:bg-opacity-50 md:rounded-3xl"
        >
          <UserCircle size={24} />
          <p>Sign In</p>
        </Link>
      )}
    </div>
  );
};

export default UserAction;
