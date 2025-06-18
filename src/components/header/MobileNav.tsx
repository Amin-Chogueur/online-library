import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {" "}
      {isOpen && (
        <nav className=" absolute z-10 w-full left-0 top-[54px] h-fit p-[10px] rounded-bl-[5px] rounded-br-[5px] bg-gray-400  ">
          <ul className="flex flex-col justify-center text-[18px] items-center gap-[20px] ">
            <li className="w-full">
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `block w-full p-2 rounded-lg text-center ${
                    isActive ? "bg-amber-600" : "bg-gray-900"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Nos Livres
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block w-full p-2 rounded-lg text-center ${
                    isActive ? "bg-amber-600" : "bg-gray-900"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                À propos
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block w-full p-2 rounded-lg text-center ${
                    isActive ? "bg-amber-600" : "bg-gray-900"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <div className="flex items-center gap-3">
        {isOpen ? (
          <span
            className={`text-amber-600 text-2xl cursor-pointer`}
            onClick={() => setIsOpen(false)}
          >
            ✖
          </span>
        ) : (
          <GiHamburgerMenu
            className={`text-gray-900 text-3xl cursor-pointer`}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
    </div>
  );
}
