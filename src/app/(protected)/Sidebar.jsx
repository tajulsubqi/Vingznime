"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="relative flex flex-col items-start w-full text-Absolute-White">
      <Link
        href="/users"
        className="relative flex group items-center w-full"
      >
        <div
          className={`absolute -left-2 flex w-1 h-6 rounded-lg ${
            pathname === "/users" ? "bg-Red-60" : "invisible"
          }`}
        />

        <div
          className={`flex group items-center text-start w-full h-8 p-3 rounded-lg transition-colors group-hover:bg-Grey-60/20 ${
            pathname === "/users" && "bg-Grey-60/10"
          }`}
        >
          Profile
        </div>
      </Link>

      <Link
        href="/users/collection"
        className="relative flex group items-center w-full"
      >
        <div
          className={`absolute -left-2 w-1 h-6 rounded-lg ${
            pathname === "/users/collection" ? "bg-Red-60" : "invisible"
          }`}
        />

        <div
          className={`flex group items-center text-start w-full h-8 p-3 rounded-lg transition-colors group-hover:bg-Grey-60/20 ${
            pathname === "/users/collection" && "bg-Grey-60/10"
          }`}
        >
          Collection
        </div>
      </Link>

      <Link
        href="/users/comment"
        className="relative flex group items-center w-full"
      >
        <div
          className={`absolute -left-2 w-1 h-6 rounded-lg ${
            pathname === "/users/comment" ? "bg-Red-60" : "invisible"
          }`}
        />

        <div
          className={`flex group items-center text-start w-full h-8 p-3 rounded-lg transition-colors group-hover:bg-Grey-60/20 ${
            pathname === "/users/comment" && "bg-Grey-60/10"
          }`}
        >
          Comment History
        </div>
      </Link>
    </aside>
  );
};
