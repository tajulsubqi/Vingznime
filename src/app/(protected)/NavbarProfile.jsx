import { currentUser } from "@/src/libs/auth";
import Image from "next/image";
import avatar from "@/public/images/avatar.svg";

const NavbarProfile = async () => {
  const user = await currentUser();

  return (
    <section className="flex container gap-3 item-center">
      <Image
        src={user?.image || avatar.src}
        alt="profile"
        width={48}
        height={48}
        className="aspect-square  h-12 w-12 shrink-0 object-cover object-center rounded-full"
      />
      <div className="flex flex-col justify-start items-start">
        <span className="flex w-full text-Absolute-White font-bold tracking-wide md:text-xl md:leading-6">
          {user?.name}
        </span>
        <span className="flex w-full text-Grey-60 font-semibold tracking-wide md:leading-6">
          ({user?.email})
        </span>
      </div>
    </section>
  );
};

export default NavbarProfile;
