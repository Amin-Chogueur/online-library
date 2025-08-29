import { FaMapMarkerAlt, FaTelegramPlane } from "react-icons/fa";
import { FaEnvelope, FaFacebookF, FaInstagram, FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-gray-950  text-gray-300 mt-8">
      <div className="container mx-auto  px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8  w-fit text-center md:w-full md:text-left">
        {/* logo*/}
        <div>
          <Link to="/">
            <img
              src={"/logoBook1.png"}
              width={100}
              height={100}
              alt="logo"
              className="mx-auto md:mx-0"
            />
          </Link>
        </div>
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-600">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-center md:text-left">
            <li>
              <Link to="/" className="hover:text-amber-600 transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/Nos_Livres"
                className="hover:text-amber-600 transition-colors"
              >
                Nos livres
              </Link>
            </li>
            <li>
              <Link
                to="/Enfants"
                className="hover:text-amber-600 transition-colors"
              >
                Enfants
              </Link>
            </li>
            <li>
              <Link
                to="/Jeux-Cadeaux"
                className="hover:text-amber-600 transition-colors"
              >
                Jeux et Cadeaux
              </Link>
            </li>
            <li>
              <Link
                to="/Papeterie"
                className="hover:text-amber-600 transition-colors"
              >
                Papeterie
              </Link>
            </li>

            <li>
              <Link
                to="/Mes_favoris"
                className="hover:text-amber-600 transition-colors"
              >
                Mes Favoris
              </Link>
            </li>
            <li>
              <Link
                to="/À_propos"
                className="hover:text-amber-600 transition-colors"
              >
                À propos
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="hover:text-amber-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-600">
            Contactez-nous
          </h3>
          <ul className="space-y-2 text-sm text-center">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaEnvelope className="w-4 h-4" />
              <a href="mailto:ghizlenebambrik@gmail.com">
                ghizlenebambrik@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaPhone className="w-4 h-4" />
              <a href="tel:+213 540 08 73 47">+213 540 08 73 47</a>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>Oran, Algérie</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-600">
            {" "}
            Suivez-nous
          </h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              to="https://www.facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-gray-600 hover:text-[#1877F2] w-5 h-5 transition-colors duration-200" />
            </Link>

            <Link
              to="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-600 hover:text-[#E4405F] w-5 h-5 transition-colors duration-200" />
            </Link>

            <Link
              to="https://t.me/YourTelegramChannel"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane className="text-gray-600 hover:text-[#0088cc] w-5 h-5 transition-colors duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 text-center py-4 text-sm text-gray-500">
        <p className="text-lg text-center">
          Copyright © 2025{" "}
          <Link to={"/"} className="text-amber-600 text-2xl">
            Ghizo BookShop
          </Link>
          . Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
