import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function createFoto(fotoId: string, turno: any, fecha: any, ubicacion: any, path: any) {
  try {
    console.log({ turno, fecha, ubicacion, path });  // Verifica los valores antes de enviar a Firebase

    if (!turno || !fecha || !ubicacion || !path) {
      throw new Error("Uno o más campos son inválidos o undefined");
    }

    const fotoRef = doc(db, 'fotos', fotoId);
    await setDoc(fotoRef, {
      turno: turno,
      fecha: fecha,
      ubicacion: ubicacion,
      path: path, // El path puede ser la URL de la imagen en Firebase Storage
    });

    console.log('Foto creada exitosamente');
  } catch (error) {
    console.error('Error al crear la foto:', error);
  }
}
