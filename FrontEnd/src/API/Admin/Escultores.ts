const API_URL = 'http://localhost:5232'; // Reemplaza con la URL de tu backend


//Obtener un escultor
export const getEscultor = async () => {
    try {
        const response = await fetch(`${API_URL}/escultoresAdmin`);
        if (response.ok) { 
            const data = await response.json(); //lo convierto a formato jason 
            return data; //lo muestro
          } else {
            throw new Error('Error en la respuesta del servidor'); //sino algo paso con el back 
          }
    } catch (error) {
          throw new Error('Network error: ' + error); //hice mal el request 
    }
};

//Agregar un nuevo escultor
export const addEscultor = async (nombre: string, foto: File, Pais: string, contacto: string ) => {

    const Apellido = "Marain";
    const DNI = '45000000';
    const Email = 'usuario@gmail.com';
    const Contraseña = '12345';
    const formData = new FormData();
    formData.append('Nombre', nombre);
    formData.append('Apellido', Apellido);
    formData.append('DNI', DNI);
    formData.append('Pais', Pais);
    formData.append('Email', Email);
    formData.append('Contraseña', Contraseña);
    formData.append('Telefono', contacto);
    formData.append('Imagen', foto);
    
    
   
    try {
        const response = await fetch(`${API_URL}/Escultor`, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
    } catch (error) {
          throw new Error('Network error: ' + error);
    }
};

// Editar un escultor existente
export const editEscultor = async (id:string, Nombre:string, fechaNacimiento:string, lugarNacimiento:string, premios:string, obras:string, foto: File | string ) => {
  
  const formData = new FormData();
  formData.append('Id', id);
  formData.append('Nombre', Nombre);
  formData.append('FechaNacimiento', fechaNacimiento);
  formData.append('LugarNacimiento', lugarNacimiento);
  formData.append('Premios', premios);
  formData.append('Obras', obras);
  formData.append('Foto', foto); 
  
  try {
  const response = await fetch(`${API_URL}/Escultores/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (response.ok) {
    return;
    } else {
    throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};

// Eliminar un escultor
export const deleteEscultor = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/Escultor/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            return;
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
    } catch (error) {
          throw new Error('Network error: ' + error);
    }

};