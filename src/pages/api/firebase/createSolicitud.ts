import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// Crear solicitud
const createSolicitud = async (solicitudId: string, nombre: any, mail: any, estado: any, fotos: any) => {
  try {
    const solicitudRef = doc(db, 'solicitudes', solicitudId);
    await setDoc(solicitudRef, {
      nombre: nombre,
      mail: mail,
      estado: estado,
      fotos: fotos, // Array con IDs de fotos
    });
    console.log('Solicitud creada exitosamente');
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
  }
};
