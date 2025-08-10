import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { useAppSelector } from "../../hooks/reduxHooks";
import { FaHeart } from "react-icons/fa6";

function Header() {
  const cart = useAppSelector((state) => state.cart.cart);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const totalFavoritesBook = favorites.length;
  const totalQuantity = cart.reduce((acu, cur) => acu + cur.quantityInCart, 0);
  return (
    <header className="fixed z-50 h-[60px] w-[96%] bg-gray-400 md:opacity-85 rounded-lg top-[20px] left-[2%] flex  justify-between items-center px-[20px] py-[10px] ">
      <Link to={"/"} className="bg-gray-900 p-1 rounded-full">
        <img src={"/logoBook1.png"} width={60} height={60} alt="logo" />
      </Link>

      <DesktopNav />

      <div className="flex items-center  gap-3">
        <MobileNav />
        <Link className="xl:hidden relative" to={"/Mes_favoris"}>
          {favorites.length > 0 && (
            <span className="absolute bg-red-600 w-4 h-4 flex justify-center items-center top-[-8px] right-[-3px] rounded-full">
              {totalFavoritesBook}
            </span>
          )}
          <FaHeart className="text-red-500 text-lg w-8 h-8" />
        </Link>
        <Link
          to="/Panier"
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
