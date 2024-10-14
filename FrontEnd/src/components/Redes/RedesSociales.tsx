import { Flex, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './RedesSociales.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function RedesSociales() {
    const currentUrl = window.location.href;
  return (
    <Flex className="wrapper" w="fit-content">
      <IconButton
        as="a"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        aria-label="Facebook"
        icon={<FaFacebook />}
        className="icon facebook"
        borderWidth={1}
        borderColor="#3b5998"
        bg="white"
        h="3.125rem" 
        w="3.925rem"
        color="#3b5998"
        _hover={{ bg: "white", color: "white" }}
      />
      <IconButton
        as="a"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        aria-label="Twitter"
        icon={<FaTwitter />}
        className="icon twitter"
        borderWidth={1}
        borderColor="#1da1f2"
        bg="white"
        h="3.125rem" 
        w="3.925rem"
        color="#1da1f2"
        _hover={{ bg: "white", color: "white" }}
      />
      <IconButton
        as="a"
        href={`https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        aria-label="Instagram"
        icon={<FaInstagram />}
        className="icon instagram"
        borderWidth={1}
        borderColor='#e1306c'
        bg="white"
        h="3.125rem" 
        w="3.925rem"
        color='#e1306c'
        _hover={{ bg: "white", color: "white" }}
      />
      <IconButton
        as="a"
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        aria-label="WhatsApp"
        icon={<FaWhatsapp />}
        className="icon whatsapp"
        borderWidth={1}
        borderColor="#25d366"
        bg="white"
        h="3.125rem" 
        w="3.925rem"
        color="#25d366"
        _hover={{ bg: "white", color: "white" }}
      />
    </Flex>
  );
}

export default RedesSociales;