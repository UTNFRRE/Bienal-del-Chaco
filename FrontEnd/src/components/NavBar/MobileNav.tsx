import {
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import NavItem from './NavItem';

interface NavContentProps {
  LINK_ITEMS: { title: string; url: string; rol: string }[];
}

export default function MobileNav({ LINK_ITEMS }: NavContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent="flex-start"
        bg="grey"
      >
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
          display={{ base: 'flex', md: 'none' }}
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <DrawerCloseButton />
          <DrawerHeader bg="black" color="white">
            Menú
          </DrawerHeader>
          <DrawerBody bg="linear-gradient(to right, #000000, #434343)">
            <VStack align="start">
              {LINK_ITEMS.map((link, key) => (
                <Link key={key} to={link.url} onClick={onClose} style={{ textDecoration: 'none' }}>
                  <NavItem title={link.title} />
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
