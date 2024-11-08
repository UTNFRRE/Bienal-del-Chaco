import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';

const theme = extendTheme({
  ...globalStyles,
  colors: {
    ...globalStyles.colors,
    facebook: {
      500: '#3b5998',
      600: '#2d4373',
      700: '#1e2e50',
    },
    twitter: {
      500: '#1DA1F2',
      600: '#1A91DA',
      700: '#1572B6',
    },
    instagram: {
      500: '#E1306C',
      600: '#C13584',
      700: '#833AB4',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 3,
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorScheme ? `${props.colorScheme}.500` : 'principal',
          color: 'white',
          _hover: {
            bg: props.colorScheme
              ? `${props.colorScheme}.600`
              : 'principalHover',
          },
        }),
        bienal: {
          bg: 'principal',
          color: 'white',
          _hover: {
            bg: 'principalHover',
          },
        },
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
