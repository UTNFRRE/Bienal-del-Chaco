import { useDropzone , FileRejection} from 'react-dropzone';
import { Flex, Box, VStack, useToast, Stack, SimpleGrid } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { HiOutlineDocumentAdd } from "react-icons/hi";

// Los archivos seleccionados se guardan en el estado/array files, y las previsualizaciones en filePreviews

const ZonaCarga = () => {
    const toast = useToast();
    const [filePreviews, setFilePreviews] = useState<string[]>([]);  // Guarda las URL de las previsualizaciones 
    const [files, setFiles] = useState<File[]>([]);  // Guarda los archivos seleccionados para dsp mandar al back

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const newFiles = acceptedFiles.map((file) => {
                const previewUrl = URL.createObjectURL(file);
                return { file, previewUrl };
            });

            setFilePreviews((prevPreviews) => [
                ...prevPreviews,
                ...newFiles.map((fileObj) => fileObj.previewUrl),
            ]);
            setFiles((prevFiles) => [...prevFiles, ...newFiles.map((fileObj) => fileObj.file)]);
        }
    }, []);

    
    const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length > 0) {
            toast({
                title: 'Error',
                description: 'Solo se aceptan archivos .jpeg, .jpg, .png, .webp',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [toast]);

    console.log(files);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
    });
    
    return (
        <Stack direction="column">
        <Flex
        borderRadius="10px"
        w={500}     // Cambien aca el ancho de la zona de carga
        justifyContent="center"
        direction={"column"}
        alignItems="center"
        border="2px solid #6f6f6f"
        borderStyle="dashed"
        {...getRootProps()}
        style={{
          padding: '40px',
        }}
        >
        <VStack spacing={4}>
            <Box>
                <HiOutlineDocumentAdd size={40}/>
            </Box>
            <input {...getInputProps()} />
            {isDragActive ? (
            <p>Soltar para cargar...</p>
            ) : (
            <p>Arrastrar y soltar archivo aquí</p>
             )}
        </VStack>
        {filePreviews.length > 0 && (
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mt="20px">
                {filePreviews.map((preview, index) => (
                    <Box key={index}>
                        <img
                            src={preview}
                            alt={`Preview ${index}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </Box>
                ))}
            </SimpleGrid>
        )}
        </Flex>
        </Stack>
    );



}

export default ZonaCarga;