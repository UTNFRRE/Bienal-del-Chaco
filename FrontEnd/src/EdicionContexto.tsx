import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EdicionContextProps {
  edicion: string;
  setEdicion: (edicion: string) => void;
}

const EdicionContext = createContext<EdicionContextProps | undefined>(undefined);

export const EdicionProvider = ({ children }: { children: ReactNode }) => {
  const [edicion, setEdicion] = useState<string>('2024'); // Valor inicial

  return (
    <EdicionContext.Provider value={{ edicion, setEdicion }}>
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