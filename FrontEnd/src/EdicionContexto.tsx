import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EditVotacion, GetVotacion } from './API/Ediciones';
import { useEffect } from 'react';

interface EdicionContextProps {
  edicion: string;
  setEdicion: (edicion: string) => void;
  votacionHabilitada: boolean;
  Habilitar: () => void;
  Deshabilitar: () => void;
}

const EdicionContext = createContext<EdicionContextProps | undefined>(undefined);

export const EdicionProvider = ({ children }: { children: ReactNode }) => {
  const [edicion, setEdicion] = useState<string>('2024'); // Valor inicial
  const [votacionHabilitada, setVotacionHabilitada] = useState<boolean>(true);

  useEffect(() => {
    const fetchVotacion = async () => {
      try {
        const data = await GetVotacion(edicion);
        // setVotacionHabilitada(data.votacionHabilitada);
        setVotacionHabilitada(true)
      } catch (error) {
        console.error('Error fetching votacion:', error);
      }
    };

    fetchVotacion();
  }, [edicion]);


  const Habilitar = async () => {
    await EditVotacion(edicion, true);
    setVotacionHabilitada(true);
  }

  const Deshabilitar = async () => {
    await EditVotacion(edicion, false);
    setVotacionHabilitada(false);
  }

  return (
    <EdicionContext.Provider value={{ edicion, setEdicion, votacionHabilitada, Habilitar, Deshabilitar }}>
      {children}
    </EdicionContext.Provider>
  );
};

export const useEdicion = () => {
  const context = useContext(EdicionContext);
  if (!context) {
    throw new Error('useEdicion debe usarse dentro de un EdicionProvider');
  }
  return context;
};