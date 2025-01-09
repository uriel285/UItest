import Image from "next/image";
import imagen from '../../../public/dsc.jpg';
import close from "../../../public/icons/close.svg"
import plus from "../../../public/icons/plus.svg"
import arrow from "../../../public/icons/arrow.svg"

const Detalle = () => {
    const image = imagen;
    return(
        <div className="semiblack">

            <Image src={close} alt="Close Icon" className="absolute h-10 w-10 cursor-pointer right-8 top-3" />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black z-50">
                <div className="relative rounded-xl w-[50vw]">
                    <Image src={image} alt="imagen" className='w-[100%] h-auto object-cover cursor-pointer'/>
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white opacity-80">ElQueBuscaEncuentra</p>
                </div>
                <div className="flex p-10">
                    <button className="text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mx-auto">Agregar Imagen <Image src={plus} alt="Arrow Icon" className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>

        </div>
    )
}
export default Detalle;