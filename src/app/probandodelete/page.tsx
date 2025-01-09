// /src/app/deleteImage.tsx
'use client'; // Esto le indica a Next.js que el archivo usa funcionalidades de cliente (client-side)

import { useState } from 'react';

const DeleteImagePage = () => {
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const deleteFileFromBackblaze = async (fileName: string) => {
    try {
      const res = await fetch(`/api/backblaze/delete?fileName=${fileName}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage(data.message);
        setError(''); // Limpiamos el error si la eliminación es exitosa
      } else {
        setMessage('');
        setError(data.error || 'Error desconocido');
      }
    } catch (error) {
      setMessage('');
      setError('Error al eliminar el archivo');
      console.error('Error al eliminar el archivo:', error);
    }
  };

  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    if (fileName.trim() === '') {
      setError('Por favor ingresa el nombre de la imagen.');
      return;
    }
    deleteFileFromBackblaze(fileName);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Eliminar Imagen de Backblaze</h1>
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="fileName">Nombre del archivo:</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Escribe el nombre de la imagen"
            style={{ padding: '8px', marginTop: '10px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            marginTop: '10px',
            cursor: 'pointer',
          }}
        >
          Eliminar
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <strong>{message}</strong>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default DeleteImagePage;
