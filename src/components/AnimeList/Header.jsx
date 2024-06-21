import Link from "next/link";
import { Play } from "@phosphor-icons/react/dist/ssr";

const Header = ({ title, link, className }) => {
  return (
    <div
      className={`flex justify-between items-center text-Absolute-White mb-3 md:h-12 ${className}`}
    >
      <div className="flex items-center gap-3 cursor-default">
        <div className="text-Red-60">
          <Play size={20} weight="fill" />
        </div>

        <p className="text-Absolute-White font-bold text-xl leading-6 md:text-2xl md:leading-8">
          {title}
        </p>
      </div>

      {link && (
        <Link
          href={link}
          className="py-1 px-3 rounded-3xl bg-Grey-60/10 transition-colors hover:bg-Grey-60/20"
        >
          <p className="text-sm">see more</p>
        </Link>
      )}
    </div>
  );
};
export default Header;
