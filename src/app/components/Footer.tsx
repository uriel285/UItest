// components/Footer.js
import Image from "next/image";
import instagram from "../../../public/icons/instagram.svg";
import wsp from "../../../public/icons/wsp.svg";
import logo from "../../../public/icono.png";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white text-black">
      {/* Logo */}
      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        <Image src={logo} alt="Logo" className="w-[10rem]" />
      </div>

      {/* Iconos de redes sociales */}
      <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-0">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
        >
          <Image src={instagram} alt="instagram-icon" className="w-[4rem] h-[4rem]" />
        </a>
      </div>

      {/* Texto de derechos reservados */}
      <p className="text-lg text-center sm:text-left">
        © 2024 ElQueBuscaEncuentra <br />
        Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
