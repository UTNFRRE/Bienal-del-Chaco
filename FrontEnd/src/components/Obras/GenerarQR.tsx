import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";

interface QRProps {

    urlcodigo: string;

    
}


const GenerarQR: React.FC<QRProps> = ({urlcodigo}) => {
    const [url, setUrl] = useState(urlcodigo);
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const qrCodeRef = useRef(null);
  
    const handleQrCodeGenerator = () => {
      if (!url) {
        return;
      }
      setQrIsVisible(true);
    };
  
    const downloadQRCode = () => {
      if (qrCodeRef.current) {
        htmlToImage
          .toPng(qrCodeRef.current)
          .then(function (dataUrl) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "qr-code.png";
            link.click();
          })
          .catch(function (error) {
            console.error("Error generating QR code:", error);
          });
      }
    };

    useEffect(() => {
        handleQrCodeGenerator();
      }, [urlcodigo]);
  
    return (
        <Box className="qrcode__container" p={4}>
          <VStack spacing={4}>
            {qrIsVisible && (
              <>
                <Box className="qrcode__image" ref={qrCodeRef} mb={4}>
                  <QRCode value={urlcodigo} size={300} />
                </Box>
                <Button leftIcon={<FaDownload />} onClick={downloadQRCode} variant="bienal">
                  Descargar
                </Button>
              </>
            )}
          </VStack>
        </Box>
      );
  };
  
  export default GenerarQR;