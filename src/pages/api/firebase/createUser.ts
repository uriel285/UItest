import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// Crear usuario
const createUser = async (userId: string, nombre: any, password: any) => {
  try {
    const userRef = doc(db, 'usuarios', userId);
    await setDoc(userRef, {
      nombre: nombre,
      password: password,
    });
    console.log('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
};