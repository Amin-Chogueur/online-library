import { NavLink } from "react-router-dom";

export default function DesktopNav() {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-3 items-center text-[18px]">
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-600" : "bg-gray-900"
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
                isActive ? "bg-amber-600" : "bg-gray-900"
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
                isActive ? "bg-amber-600" : "bg-gray-900"
              }`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
