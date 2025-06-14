/* "use client"
import { useState } from 'react';
import { FileDrop } from "react-file-drop";
import createFoto from "../../pages/api/firebase/createFoto";


const MyGalleryForm = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles);  // Verifica si acceptedFiles es un FileList o un array
  const filesArray: File[] = Array.from(acceptedFiles);  // Convierte FileList a Array si es necesario
  setFiles(filesArray);  // Guardar las imágenes seleccionadas
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date || !shift || files.length === 0) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Subir la imagen a Backblaze
      const formData = new FormData();
      files.forEach(file => formData.append("file", file)); // Agregar los archivos al FormData

      const res = await fetch('/api/backblaze/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error || 'Error al cargar la imagen');
      }

      const fileUrl = data.files[0]; // URL del archivo en Backblaze

      // Crear el registro en Firebase
      const fotoId = `${shift}-${date}-${location}-${new Date().getTime()}`; // Crear un ID único
      
      await createFoto(fotoId, shift, date, location, fileUrl); // Llamar a la función que guarda en Firebase

      alert('Galería subida exitosamente!');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al subir la galería.');
    }
  };

  return (
     <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-black mb-6">Subir Galería</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-black mb-2">
                Ubicación
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingresa la ubicación"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
                Fecha
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="shift" className="block text-sm font-medium text-black mb-2">
                Turno
              </label>
              <select
                id="shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option  className="text-black"value="">Selecciona el turno</option>
                <option className="text-black" value="mañana">Mañana</option>
                <option className="text-black" value="tarde">Tarde</option>
                <option className="text-black" value="noche">Noche</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Imágenes
              </label>
              <FileDrop
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer hover:bg-gray-50"
              >
                <p className="text-gray-500">Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar</p>
              </FileDrop>
              <div className="mt-4">
                {files.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-black b-2">Imágenes seleccionadas:</h3>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index} className="text-black">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Subir Galería
            </button>
          </form>
        </div>
      </div>
  );
};

export default MyGalleryForm; */
/* "use client"
import { useState } from 'react';
import { FileDrop } from "react-file-drop";
import createFoto from "../../pages/api/firebase/createFoto";


const MyGalleryForm = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles);  // Verifica si acceptedFiles es un FileList o un array
  const filesArray: File[] = Array.from(acceptedFiles);  // Convierte FileList a Array si es necesario
  setFiles(prevFiles => [...prevFiles, ...filesArray]);
  console.log(filesArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date || !shift || files.length === 0) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Subir la imagen a Backblaze
      const formData = new FormData();
      files.forEach(file => formData.append("file", file)); // Agregar los archivos al FormData

      const res = await fetch('/api/backblaze/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error || 'Error al cargar la imagen');
      }

      const fileUrls = data.files; // URL del archivo en Backblaze
      for (let i = 0; i < fileUrls.length; i++) {
        const fileUrl = fileUrls[i];

      // Crear el registro en Firebase
      const fotoId = `${shift}-${date}-${location}-${new Date().getTime()}`; // Crear un ID único
      
      await createFoto(fotoId, shift, date, location, fileUrl); // Llamar a la función que guarda en Firebase
      }

      alert('Galería subida exitosamente!');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al subir la galería.');
    }
  };

  return (
     <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-black mb-6">Subir Galería</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-black mb-2">
                Ubicación
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingresa la ubicación"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
                Fecha
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="shift" className="block text-sm font-medium text-black mb-2">
                Turno
              </label>
              <select
                id="shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option  className="text-black"value="">Selecciona el turno</option>
                <option className="text-black" value="mañana">Mañana</option>
                <option className="text-black" value="tarde">Tarde</option>
                <option className="text-black" value="noche">Noche</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Imágenes
              </label>
              <FileDrop
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer hover:bg-gray-50"
              >
                <p className="text-gray-500">Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar</p>
              </FileDrop>
              <div className="mt-4">
                {files.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-black b-2">Imágenes seleccionadas:</h3>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index} className="text-black">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Subir Galería
            </button>
          </form>
        </div>
      </div>
  );
};

export default MyGalleryForm; */
"use client"
import { useState } from 'react';
import { FileDrop } from "react-file-drop";
import createFoto from "../../pages/api/firebase/createFoto";

const MyGalleryForm = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (fileList: FileList | null, event: DragEvent) => {
    if (fileList) {
      const filesArray: File[] = Array.from(fileList); // Convertir FileList a Array de File
      setFiles(prevFiles => [...prevFiles, ...filesArray]);
      console.log(filesArray); // Verifica los archivos recibidos
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date || !shift || files.length === 0) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Subir la imagen a Backblaze
      const formData = new FormData();
      files.forEach(file => formData.append("file", file)); // Agregar los archivos al FormData

      const res = await fetch('/api/backblaze/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error || 'Error al cargar la imagen');
      }

      const fileUrls = data.files; // URL del archivo en Backblaze
      for (let i = 0; i < fileUrls.length; i++) {
        const fileUrl = fileUrls[i];

        // Crear el registro en Firebase
        const fotoId = `${shift}-${date}-${location}-${new Date().getTime()}`; // Crear un ID único
        await createFoto(fotoId, shift, date, location, fileUrl); // Llamar a la función que guarda en Firebase
      }

      alert('Galería subida exitosamente!');
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al subir la galería.');
    }
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-semibold text-black mb-6">Subir Galería</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-black mb-2">
              Ubicación
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa la ubicación"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
              Fecha
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="shift" className="block text-sm font-medium text-black mb-2">
              Turno
            </label>
            <select
              id="shift"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option className="text-black" value="">Selecciona el turno</option>
              <option className="text-black" value="mañana">Mañana</option>
              <option className="text-black" value="tarde">Tarde</option>
              <option className="text-black" value="noche">Noche</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Imágenes
            </label>
            <FileDrop
              onDrop={handleDrop} // Aquí hemos corregido el tipo de la función
              className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer hover:bg-gray-50"
            >
              <p className="text-gray-500">Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar</p>
            </FileDrop>
            <div className="mt-4">
              {files.length > 0 && (
                <div>
                  <h3 className="font-semibold text-black b-2">Imágenes seleccionadas:</h3>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index} className="text-black">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Subir Galería
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyGalleryForm;
