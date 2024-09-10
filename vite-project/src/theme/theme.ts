import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';

const theme = extendTheme({
    ...globalStyles,
    components: {
      Button: {
        baseStyle: {
          fontWeight: 'bold',
          borderRadius: 3,
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
          light: {
            background: 'transparent',
            color: '#022855',
            border: '1px solid #022855',
            _hover: {
              bg: '#º  ',
              background: '#e9eef4',
            },
            _focus: {
              boxShadow: 'none',
            },
          },
        },
      },
    },
  });
  
  export default theme;