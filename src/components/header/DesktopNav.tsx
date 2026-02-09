import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function DesktopNav() {
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const totalFavoritesBook = favorites.length;
  return (
    <nav className="hidden xl:block">
      <ul className="flex gap-3 items-center text-[18px]">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-600" : "bg-gray-900"
              }`
            }
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Nos_Livres"
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
            to="/Enfants"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-600" : "bg-gray-900"
              }`
            }
          >
            Enfants
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Jeux-Cadeaux"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-600" : "bg-gray-900"
              }`
            }
          >
            Jeux & cadeaux
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Papeterie"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-600" : "bg-gray-900"
              }`
            }
          >
            Papeterie
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Evenement"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center ${
                isActive ? "bg-amber-600" : "bg-gray-900"
              }`
            }
          >
            Événements
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Mes_favoris"
            className={({ isActive }) =>
              ` px-2 py-1 rounded-lg text-center relative ${
                isActive ? "bg-amber-600" : "bg-gray-900"
              }`
            }
          >
            {favorites.length > 0 && (
              <span className="absolute bg-red-600 w-4 h-4 flex justify-center items-center top-[-8px] right-[-3px] rounded-full">
                {totalFavoritesBook}
              </span>
            )}
            Mes favoris
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/À_propos"
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
            to="/Contact"
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
