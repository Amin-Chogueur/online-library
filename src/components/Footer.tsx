import { FaRegMap } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="  p-5  bg-gray-950 text-gray-300">
      <div className="flex flex-col items-center gap-5 w-[90%] mx-auto   md:flex-row md:justify-between">
        <h2>
          <Link to={"/"}>
            <img src={"/logoBook1.png"} width={60} height={60} alt="logo" />
          </Link>
        </h2>
        <p className="text-lg text-center">
          Copyright © 2025{" "}
          <Link to={"/"} className="text-amber-600 text-2xl">
            Ghizlene BookShop
          </Link>
          . Tous droits réservés.
        </p>
        <div className="flex items-center">
          <a
            href="https://www.google.com/maps/search/25+cite+oudjlida+tlemcen/@34.9323754,-1.3372834,4749m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="cursor-pointer"
          >
            <FaRegMap className="text-3xl mr-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
