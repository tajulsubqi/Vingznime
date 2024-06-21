import Navbar from "@/src/components/Navbar";
import Seasonal from "@/src/app/(public)/season/Seasonal";

const page = () => {
  return (
    <main className="px-5 pb-2.5 md:pb-12">
      <Navbar />

      <Seasonal />
    </main>
  );
};

export default page;
