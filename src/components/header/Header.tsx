import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { useAppSelector } from "../../hooks/reduxHooks";

function Header() {
  const cart = useAppSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce((acu, cur) => acu + cur.quantityInCart, 0);
  return (
    <header className="fixed z-10 h-[60px] w-[90%] bg-gray-400 md:opacity-85 rounded-lg top-[20px] left-[5%] flex justify-between items-center px-[20px] py-[10px]">
      <Link to={"/"} className="bg-gray-900 p-1 rounded-full">
        <img src={"/logoBook1.png"} width={60} height={60} alt="logo" />
      </Link>
      <div className="flex items-center gap-3">
        <DesktopNav />

        <MobileNav />
        <Link
          to="/cart"
          className="bg-gray-900 p-1 rounded-full cursor-pointer relative"
        >
          {cart.length > 0 && (
            <span className="absolute bg-red-600 w-4 h-4 flex justify-center items-center top-[-8px] right-[-3px] rounded-full">
              {totalQuantity}
            </span>
          )}

          <RiShoppingBag4Fill className="text-amber-600 text-2xl " />
        </Link>
      </div>
    </header>
  );
}

export default Header;
