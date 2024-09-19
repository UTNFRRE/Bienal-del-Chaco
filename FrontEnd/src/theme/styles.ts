import { border } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const globalStyles = {
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#ffffff',
    gray: {
      50: '#f7fafc',
      900: '#171923',
    },
    principalHover: '#3F72AF',
    principal: '#1E2A5E',
    secundaryBg: '#E9EFEC',
    secundary: '#c4daf4',
    secundaryHover: '#B4B4B8',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: '#FCFAEE', //color de fondo de la pagina completa
        fontFamily: "'Roboto', sans-serif",
      },
      html: {
        fontFamily: "'Roboto', sans-serif", //tipo de letra de la pagina completa
      },
    }),
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
};