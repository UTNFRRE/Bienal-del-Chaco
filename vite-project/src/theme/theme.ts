import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';

const theme = extendTheme({
    ...globalStyles,
    components: {
      Button: {
        baseStyle: {
          fontWeight: 'bold',
        },
        variants: {
          solid: (props: any) => ({
            bg: props.colorMode === 'dark' ? 'principalHover' : 'principal',
            color: 'white',
            _hover: {
              bg: props.colorMode === 'dark' ? 'principalHover' : 'principalHover',
            },
          }),
          delete: {
            bg: '#C7253E',
            color: 'white',
            _hover: {
              bg: 'red.600',
            },
          },
        },
      },
    },
  });
  
  export default theme;