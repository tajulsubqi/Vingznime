import Navbar from "@/src/components/Navbar";
import Populer from "@/src/app/(public)/populer/Populer";

const page = () => {
  return (
    <main className="px-5 pb-2.5 md:pb-12">
      <Navbar />

      <Populer />
    </main>
  );
};

export default page;
