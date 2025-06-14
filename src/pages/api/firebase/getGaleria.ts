/* import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Define los tipos de los parámetros y la estructura de los documentos
interface QueryParams {
  lugar?: string;
  fecha?: string;
  horario?: string;
}

interface Foto {
  ubicacion: string;
  fecha: string;
  turno: string;
  [key: string]: any; // Campos adicionales
}

export default async function handler(lugar: any, fecha: any, horario: any ) {

  try {
    //const { lugar, fecha, horario } = req.query as QueryParams;

    if (!lugar || !fecha || !horario) {
      return console.log('Faltan parámetros en la consulta');
    }

    const fotosRef = collection(db, 'Fotos');
    const fotosQuery = query(
      fotosRef,
      where('ubicacion', '==', lugar),
      where('fecha', '==', fecha),
      where('turno', '==', horario)
    );

    const querySnapshot = await getDocs(fotosQuery);

    const fotos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      path: doc.data().path,
      ...(doc.data() as Foto), // Define los datos como tipo Foto
    }));

    console.log(fotos)
    return  fotos ;
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
  }
}
 */
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// Define los tipos de los parámetros y la estructura de los documentos
interface Foto {
  ubicacion: string;
  fecha: string;
  turno: string;
  path: string;
  [key: string]: any; // Campos adicionales
}

// Modificación del handler para ser utilizado como función directa
export async function getGaleria(lugar: string, fecha: string, horario: string) {
  try {
    console.log("Accedida")
    if (!lugar || !fecha || !horario) {
      throw new Error("Faltan parámetros en la consulta");
    }

    

    const fotosRef = collection(db, "Fotos");
    const fotosQuery = query(
      fotosRef,
      where("ubicacion", "==", lugar),
      where("fecha", "==", fecha),
      where("turno", "==", horario)
    );

    const querySnapshot = await getDocs(fotosQuery);

    const fotos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      //path: doc.data().path,
      ...(doc.data() as Foto), // Define los datos como tipo Foto
    }));

    return fotos;
  } catch (error) {
    console.error("Error al obtener las fotos:", error);
    throw error; // Propaga el error al cliente
  }
}
