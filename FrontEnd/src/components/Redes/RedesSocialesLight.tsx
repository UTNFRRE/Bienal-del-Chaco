import { Flex, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function RedesSocialesLight () {
    return (
        <Flex justifyContent={'center'}>
              <ButtonGroup spacing="6">
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebook />}
                fontSize="20px"
                color="#CDC2A5"
                variant="outline"
                borderColor="#0B192C"
                _hover={{ bg: '#CDC2A5', color: '#0B192C' }}
              />
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                fontSize="20px"
                color="#CDC2A5"
                variant="outline"
                borderColor="#0B192C"
                _hover={{ bg: '#CDC2A5', color: '#0B192C' }}
              />
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram />}
                fontSize="20px"
                color="#CDC2A5"
                variant="outline"
                borderColor="#0B192C"
                _hover={{ bg: '#CDC2A5', color: '#0B192C' }}
              />
              <IconButton
                aria-label="Whatsapp"
                icon={<FaWhatsapp />}
                fontSize="20px"
                color="#CDC2A5"
                variant="outline"
                borderColor="#0B192C"
                _hover={{ bg: '#CDC2A5', color: '#0B192C' }}
              />
            </ButtonGroup>
           </Flex>
    )
};

export default RedesSocialesLight;