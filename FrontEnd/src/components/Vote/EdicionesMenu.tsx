import { Button } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from "@chakra-ui/react";

const EdiccionesMenu = () => {

 
  const years = Array.from({ length: 10 }, (_, i) => 2015 + i);

  return (
    <Menu >
      <MenuButton p={4} bg="#1E2A5E" variant="solid" borderRadius={3}as={Button} size="sm" width="auto" minWidth='fit-content' paddingX={2}>
        <Text>Ediciones</Text>
      </MenuButton>
      <MenuList>
        {years.map((year) => (
          <MenuItem key={year}>Bienal {year}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}


export default EdiccionesMenu;
