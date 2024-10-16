import {
    Box,
    Flex,
  } from '@chakra-ui/react';
  import { Link, useLocation } from 'react-router-dom';
  import NavItem from './NavItem';
  
  interface NavContentProps {
    LINK_ITEMS: { title: string; url: string; rol:string }[];
  }

  
  export function NavContent({LINK_ITEMS}:NavContentProps) {
   // const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
    const location = useLocation();
  
    return (
      <Box
        h="100%"
      >
        {/* <HStack h="5" marginLeft="8">
          {!isLargerThanMd && <CloseButton onClick={onClose} marginRight="8" />}
        </HStack> */}
        <Flex
          flexDirection="row"
          gap="2"
          mt="4px"
          >
        {LINK_ITEMS.map((link, key) => (
          <Link key={key} to={link.url}>
            <NavItem
              title={link.title}
              color={
                location.pathname.startsWith(`/${link.rol}/${link.url}`)
                  ? '#61677A'
                  : 'none'
              }
            />
          </Link>
        ))}
      </Flex>
      </Box>
    );
  }