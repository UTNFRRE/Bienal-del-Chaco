import React from 'react'; // Add import statement for React
import {
    Box,
    Flex,
    HStack,
    CloseButton,
    useMediaQuery,
    BoxProps,
  } from '@chakra-ui/react';
  import { Link, useLocation } from 'react-router-dom';
  import { LINK_ITEMS } from './LinksItems';
  import NavItem from './NavItem';
  

  
  export function NavContent() {
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
              icon={link.icon}
              title={link.title}
              color={
                location.pathname === '/admin/' + link.url
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