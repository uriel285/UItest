import multer from 'multer';
import s3 from '../../../lib/backblaze'; // Asegúrate de tener la configuración de Backblaze
import fs from 'fs';
import path from 'path';

// Configuración de Multer
const upload = multer({
  dest: './tmp', // Directorio temporal para los archivos subidos
  limits: { fileSize: 50 * 1024 * 1024 }, // Límite de tamaño de archivo (50MB en este caso)
  fileFilter: (req: any, file: { mimetype: string; }, cb: (arg0: Error | null, arg1: boolean | undefined) => void) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Tipo de archivo no permitido'), undefined);
    }
    cb(null, true);
  },
});

// Exportamos la configuración de Next.js para deshabilitar el bodyParser
export const config = {
  api: {
    bodyParser: false, // Deshabilitar el analizador de cuerpo de Next.js para manejar la carga manualmente
  },
};

// Definir el tipo para la respuesta
type UploadResponse = {
  message: string;
  files?: string[]; // Array de URLs de archivos
  error?: string;
};

// Handler de la API
export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: UploadResponse): void | PromiseLike<void>; new(): any; }; }; }) {
  if (req.method === 'POST') {
    // Usamos Multer como middleware para manejar múltiples archivos
    upload.array('file')(req, res, async (err: { message: any; }) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({
          error: `Error de Multer: ${err.message}`,
          message: ''
        });
      } else if (err) {
        return res.status(500).json({
          error: `Error al procesar los archivos: ${err.message}`,
          message: ''
        });
      }

      try {
        // Verificar si hay archivos subidos
        const files = req.files;
        if (!files || files.length === 0) {
          return res.status(400).json({
            error: 'No se recibieron archivos.',
            message: ''
          });
        }

        const fileUrls: string[] = []; // Almacenar las URLs de los archivos subidos
        for (const file of files) {
          const filePath = file.path;
          const fileName = file.originalname;
          const fileMimeType = file.mimetype;

          const bucketName = process.env.BACKBLAZE_BUCKET_NAME;
          if (!bucketName) {
            return res.status(500).json({
              error: 'No se encontró el nombre del bucket en las variables de entorno',
              message: ''
            });
          }

          const params = {
            Bucket: bucketName,
            Key: fileName, // Puedes renombrar el archivo si lo deseas
            Body: fs.createReadStream(filePath),
            ContentType: fileMimeType,
          };

          const data = await s3.upload(params).promise();
          fileUrls.push(data.Location);
          console.log(data.Location)

          // Eliminar archivo temporal después de subirlo
          fs.unlinkSync(filePath);
        }

        // Responder con las URLs de los archivos subidos
        console.log(fileUrls)
        return res.status(200).json({ message: 'Archivos cargados exitosamente', files: fileUrls });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: 'Error al cargar los archivos',
          message: ''
        });
      }
    });
  } else {
    res.status(405).json({
      error: 'Método no permitido',
      message: ''
    });
  }
}

