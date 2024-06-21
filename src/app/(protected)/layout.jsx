import Navbar from "@/src/components/Navbar";
import { Sidebar } from "@/src/app/(protected)/Sidebar";
import NavbarProfile from "@/src/app/(protected)/NavbarProfile";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="px-5 pb-2.5 md:pb-12">
      <Navbar />

      <section className="container flex flex-col justify-center max-w-7xl gap-5">
        <NavbarProfile />

        <div className="w-full border-b-2 border-Grey-60/10" />

        <section className="flex flex-col gap-5 md:gap-7 md:flex-row">
          <div className="w-full md:max-w-[272px]">
            <Sidebar />
          </div>

          <div className="md:hidden w-full border-b-2 border-Grey-60/10" />

          <div className="w-full">{children}</div>
        </section>
      </section>
    </div>
  );
};

export default ProtectedLayout;
