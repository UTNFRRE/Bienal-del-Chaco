import { Flex, FlexProps, Text } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon?: string;
  color?: string;
  title: string;
}

export default function NavItem({
  icon: Icon,
  color,
  title,
  ...props
}: NavItemProps) {
  return (
      <Flex
        align="center"
        justify="center"
        p={4}
        _hover={{ bg: "linear-gradient(to right, #000000, #434343)" }}
        {...props}
        //borderRadius="5px"
        backgroundColor={color}
        w="100%" 
        h="40px" 
      >
        {Icon && <Icon />}
          <Text as="b" fontSize="md" color="white"> 
        {title}
      </Text>
      </Flex>
  );
}