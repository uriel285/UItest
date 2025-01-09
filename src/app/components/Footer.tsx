// components/Footer.js
//import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from "next/image";
import instagram from "../../../public/icons/instagram.svg"
import wsp from "../../../public/icons/wsp.svg"
import logo from "../../../public/icono.png"

const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-4 bg-white text-black">

        <Image src={logo} alt="Logo" className="w-[10rem]" />
        

        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <Image src={instagram} alt="instagram-icon" className="w-[4rem] text-white"/>
        </a>

        <p className="text-lg mb-5">© 2024 ElQueBuscaEncuentra<br/> Todos los derechos reservados.</p>


    </footer>
  );
};

export default Footer;
