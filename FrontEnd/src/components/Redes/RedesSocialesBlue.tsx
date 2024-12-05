import { Flex, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function RedesSocialesLight () {
    return (
        <Flex justifyContent={'center'}>
              <ButtonGroup spacing="7">
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebook />}
                fontSize="30px"
                color="#0B192C"
                size={'lg'}
                variant="outline"
                borderColor="#E4E0E1"
                _hover={{ bg: '#0B192C', color: '#E4E0E1' }}
              />
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                fontSize="30px"
                color="#0B192C"
                size={'lg'}
                variant="outline"
                borderColor="#E4E0E1"
                _hover={{ bg: '#0B192C', color: '#E4E0E1' }}
              />
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram />}
                fontSize="30px"
                color="#0B192C"
                variant="outline"
                size={'lg'}
                borderColor="#E4E0E1"
                _hover={{ bg: '#0B192C', color: '#E4E0E1' }}
              />
              <IconButton
                aria-label="Whatsapp"
                icon={<FaWhatsapp />}
                fontSize="30px"
                color="#0B192C"
                variant="outline"
                size={'lg'}
                borderColor="#E4E0E1"
                _hover={{ bg: '#0B192C', color: '#E4E0E1' }}
              />
            </ButtonGroup>
           </Flex>
    )
};

export default RedesSocialesLight;