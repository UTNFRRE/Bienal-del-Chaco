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
                bg: props.colorMode === 'dark' ? 'blue.300' : 'blue',
                color: 'white',
                _hover: {
                  bg: props.colorMode === 'dark' ? 'blue.200' : 'blue.600',
                },
              }),
        },
      },
    },
  });
  
  export default theme;