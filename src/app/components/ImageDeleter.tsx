const deleteFileFromBackblaze = async (fileName: any) => {
    try {
      const res = await fetch(`/api/backblaze/delete?fileName=${fileName}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (res.ok) {
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };
  