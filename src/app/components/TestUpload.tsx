"use client"
import { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Maneja el cambio de archivo
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const getAwsHeaders = () => {
    // Definir los valores de autenticación
    const accessKey = '00549d36c174fa30000000001';
    const secretKey = 'key-prueba-uriel';
    const region = 'us-east-005';
    const service = 's3';
    const signature = 'firma-v4-generada';

    const headers = {
      'Authorization': `AWS4-HMAC-SHA256 Credential=${accessKey}/20231201/${region}/${service}/aws4_request, SignedHeaders=host;x-amz-date, Signature=${signature}`,
      'x-amz-date': new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' // Formato de fecha requerido por AWS
    };

    return headers;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!file) {
      console.log("Falta file")
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    const headers = getAwsHeaders();

    try {
      const res = await fetch('/api/backblaze/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.file); // Suponiendo que la URL del archivo se retorna en `file`
        alert('Imagen cargada exitosamente');

        if (data.file) {
          console.log("Realizando solicitud GET a:", data.file);

          const respuesta = await axios.get(data.file, { headers });
          if (respuesta.status === 200) {
            console.log("Imagen obtenida:", respuesta.data); // o puedes manejarla según tu tipo de respuesta
          } else {
            console.error("Error al obtener la imagen:", respuesta.statusText);
          }
        }
        
      } else {
        const data = await res.json();
        setError(data.error || 'Error desconocido');
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };
  
    

  return (
    <div>
      <h1>Cargar Imagen</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Subir Imagen'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {imageUrl && (
        <div>
          <h3>Imagen cargada:</h3>
          <img src={imageUrl} alt="Imagen cargada" width="300" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
