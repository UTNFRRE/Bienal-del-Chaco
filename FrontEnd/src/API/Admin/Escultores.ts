const API_URL = 'https://bienalbackapi.azurewebsites.net';

export const getEscultorById = async (id: string) => {
  try {
      const response = await fetch(`${API_URL}/Escultor/${id}`);
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

//Obtener un escultor
export const getEscultor = async (currentPage: number, pageSize:number, filter:string, edicion: string) => {
  try {
    const response = await fetch(`${API_URL}/Escultor?pageNumber=${currentPage}&pageSize=${pageSize}&AnioEdicion=${edicion}&busqueda=${filter}`);
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
export const addEscultor = async (
  nombre: string,
  pais: string,
  telefono: string,
  fechaNacimiento: string,
  lugarNacimiento: string,
  premios: string,
  edicionAño: string,
  foto: File,
) => {
  const formData = new FormData();

  formData.append('Nombre', nombre);
  formData.append('Apellido', 'Lopez Soto');
  formData.append('DNI', '12345678');  
  formData.append('FechaNacimiento', fechaNacimiento);
  formData.append('LugarNacimiento', lugarNacimiento);
  formData.append('Premios', premios);
  formData.append('Pais', pais);
  formData.append('Telefono', telefono);
  formData.append('Biografia', 'Biografia');
  formData.append('Imagen', foto);
  formData.append('EdicionAño', edicionAño);

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

// export const editEscultor = async (
//   escultorId: string,
//   nombre: string,
//   pais: string,
//   contacto: string,
//   fechaNacimiento: string,
//   lugarNacimiento: string,
//   premios: string,
//   edicionAño: string,
//   foto: File | string,
// ) => {
//   const formData = new FormData();
//   var method = '';
//   if (typeof foto === 'string') {
//     formData.append('Nombre', nombre);    
//     formData.append('FechaNacimiento', fechaNacimiento);
//     formData.append('LugarNacimiento', lugarNacimiento);
//     formData.append('Premios', premios);
//     formData.append('Pais', pais);
//     formData.append('Telefono', contacto);
//   method = 'PATCH';
//   } else {
//     formData.append('Nombre', nombre);
//     formData.append('Apellido', 'Lopez Soto');
//     formData.append('DNI', '12345678');    
//     formData.append('FechaNacimiento', fechaNacimiento);
//     formData.append('LugarNacimiento', lugarNacimiento);
//     formData.append('Premios', premios);
//     formData.append('Pais', pais);
//     formData.append('Telefono', contacto);
//     formData.append('Biografia', 'Biografia');
//     formData.append('Imagen', foto);
//     formData.append('EdicionAño', edicionAño);
//     method = 'PUT';
//   }
//   console.log(method);
//   try {
//     const response = await fetch(`${API_URL}/Escultor/${escultorId}`, {
//       method: `${method}`,
//       body: formData,
//     });
//     if (response.ok) {
//       const data = await response.json();
//       return { fotoUrl: data.fotoUrl };
//     } else {
//       throw new Error('Error en la respuesta del servidor');
//     }
//   } catch (error) {
//     throw new Error('Network error: ' + error);
//   }
// };

export const editEscultor = async (
  escultorId: string,
  nombre: string,
  pais: string,
  contacto: string,
  fechaNacimiento: string,
  lugarNacimiento: string,
  premios: string,
  edicionAño: string,
  foto: File | string,
) => {
  const formData = new FormData();
  var method = '';
  if (typeof foto === 'string') {
    formData.append('Nombre', nombre);    
    formData.append('FechaNacimiento', fechaNacimiento);
    formData.append('LugarNacimiento', lugarNacimiento);
    formData.append('Premios', premios);
    formData.append('Pais', pais);
    formData.append('Telefono', contacto);
  method = 'PATCH';
  } else {
    formData.append('Nombre', nombre);
    formData.append('Apellido', 'Lopez Soto');
    formData.append('DNI', '12345678');    
    formData.append('FechaNacimiento', fechaNacimiento);
    formData.append('LugarNacimiento', lugarNacimiento);
    formData.append('Premios', premios);
    formData.append('Pais', pais);
    formData.append('Telefono', contacto);
    formData.append('Biografia', 'Biografia');
    formData.append('Imagen', foto);
    formData.append('EdicionAño', edicionAño);
    method = 'PUT';
  }
  console.log(method);
  try {
    const response = await fetch(`${API_URL}/Escultor/${escultorId}`, {
      method: `${method}`,
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
export const deleteEscultor = async (id: string)  => {
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
