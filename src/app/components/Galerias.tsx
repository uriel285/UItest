import Image from "next/image"
import Link from 'next/link';
import imagen1 from '../../../public/dsc.jpg';
import imagen2 from '../../../public/dsc2.jpg';

const Galerias = () => {
    const image = imagen1;
    const image2 = imagen2;
    return(
        <div className="grid grid-cols-3">

            <div className="bg-white shadow-lg text-gray-950 rounded-xl m-5">
                <a href="/galeriahotel5">
                <Image src={image} alt="imagen" className='w-[100%] h-auto rounded-t-xl mx-auto'/>
                <div className="text-center">
                    <p className="text-xl">Hotel 5, 15/02/2024, Mañana</p>
                </div>
                </a>
            </div>

            <div className="bg-white shadow-lg text-gray-950 rounded-xl m-5">
            <Link href={`/galeriaestafeta16-02-2024fin-de-tarde`}>

                <Image src={image2} alt="imagen" className="w-[100%] h-auto rounded-t-xl mx-auto" />
                <div className="text-center">
                    <p className="text-xl">Estafeta, 16/02/2024, fin de tarde</p>
                </div>

            </Link>
            </div>

            

        </div>
    )
}
export default Galerias;