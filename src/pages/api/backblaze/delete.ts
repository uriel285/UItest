// /src/app/api/backblaze/delete.ts
import s3 from '../../../lib/backblaze';

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void | PromiseLike<void>; new(): any; }; }; }) {
  if (req.method === 'DELETE') {
    try {
      // Obtenemos el nombre del archivo desde los parámetros de la solicitud
      const { fileName } = req.query;
      if (!fileName) {
        return res.status(400).json({ error: 'Se debe proporcionar el nombre del archivo para eliminar.' });
      }

      const bucketName = process.env.BACKBLAZE_BUCKET_NAME;
      if (!bucketName) {
        return res.status(500).json({ error: 'No se encontró el nombre del bucket en las variables de entorno' });
      }

      // Parámetros para eliminar el archivo
      const params = {
        Bucket: bucketName,
        Key: fileName, // El nombre del archivo a eliminar
      };

      console.log(`Eliminando archivo: ${fileName} del bucket: ${bucketName}`);

      // Realizamos la eliminación
      const data = await s3.deleteObject(params).promise();

      // Verificamos si la respuesta contiene éxito
      if (data && data.DeleteMarker) {
        res.status(200).json({ message: 'Archivo eliminado exitosamente' });
      } else {
        res.status(500).json({ error: 'No se pudo eliminar el archivo. Verifique el nombre del archivo o inténtelo de nuevo.' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el archivo' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
