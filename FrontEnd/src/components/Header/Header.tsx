import { Flex } from '@chakra-ui/react';
import { HeaderContent } from './HeaderContent';

interface NavContentProps {
  LINK_ITEMS: { title: string; url: string; rol:string }[];
}

export default function Header({LINK_ITEMS}:NavContentProps) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  //const element = useRoutes(routes);

  return (
    <Flex minW="100vh">
      <HeaderContent LINK_ITEMS={LINK_ITEMS} />
    </Flex>
  );
}