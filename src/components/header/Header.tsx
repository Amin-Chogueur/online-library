import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="fixed z-10 h-[60px] w-[90%] bg-gray-400 md:opacity-85 rounded-lg top-[20px] left-[5%] flex justify-between items-center px-[20px] py-[10px]">
      <Link to={"/"} className="bg-gray-900 p-1 rounded-full">
        <img src={"/logoBook1.png"} width={60} height={60} alt="logo" />
      </Link>
      <DesktopNav />

      <MobileNav />
    </header>
  );
}

export default Header;
