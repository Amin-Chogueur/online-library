import { RiShoppingBag4Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

export default function DesktopNav() {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-3 items-center text-[18px]">
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-700" : "bg-gray-900"
              }`
            }
          >
            Nos Livres
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-700" : "bg-gray-900"
              }`
            }
          >
            À propos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-700" : "bg-gray-900"
              }`
            }
          >
            Contact
          </NavLink>
        </li>
        <Link
          to="/cart"
          className="bg-gray-900 p-1 rounded-full cursor-pointer relative"
        >
          <RiShoppingBag4Fill className="text-orange-700 text-2xl " />
        </Link>
      </ul>
    </nav>
  );
}
