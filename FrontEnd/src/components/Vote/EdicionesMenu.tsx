// EdicionesMenu.js
import { Button } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from "@chakra-ui/react";
import obras from '../../API/ObrasVote';

interface Obra {
  id: number;
  fotos: string;
  nombreObra: string;
  cantVotos: number;
  edicion: number;
}

interface EdicionesMenuProps {
  onChangeEdition: (obrasDeEdicion: Obra[]) => void;
}

const EdicionesMenu = ({ onChangeEdition }: EdicionesMenuProps) => {

  const handleEdicionSelect = (edicion: number) => {
    // Filtra las obras por la edición seleccionada
    const obrasDeEdicion = obras.filter(obra => obra.edicion === edicion);
    onChangeEdition(obrasDeEdicion); // Llama al callback con las obras filtradas
  };

  // Crear un array con los años únicos de la propiedad "edicion" de las obras
  const years = Array.from(new Set(obras.map((obra) => obra.edicion)));

  return (
    <Menu>
      <MenuButton p={4} bg="#1E2A5E" variant="solid" borderRadius={3} as={Button} size="sm" width="auto" minWidth="fit-content" paddingX={2}>
        <Text>Ediciones</Text>
      </MenuButton>
      <MenuList>
        {years.map((year) => (
          <MenuItem key={year} onClick={() => handleEdicionSelect(year)}>
            Bienal {year}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default EdicionesMenu;
