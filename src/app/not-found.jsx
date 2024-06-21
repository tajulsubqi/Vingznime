"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

const Page = () => {
  const router = useRouter();
  return (
    <section className=" w-full h-screen flex items-center justify-center">
      <div className="bg-Black-10 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-24 py-8 rounded-lg md:rounded-3xl text-Red-60 gap-3">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold">404</p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold">
          Page Not Found
        </p>
        <p className="text-Absolute-White text-center">
          Sorry, the page you are looking for could not be found.
        </p>
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center py-2 text-Absolute-White gap-2"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Page;
