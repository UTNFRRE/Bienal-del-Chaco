import { useDropzone, FileRejection } from 'react-dropzone';
import {
  Flex,
  Box,
  VStack,
  useToast,
  Stack,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { CloseIcon } from '@chakra-ui/icons';

// Los archivos seleccionados se guardan en el estado/array files, y las previsualizaciones en filePreviews
// Se le debe pasar por props el maximo de archivos que se pueden cargar, por defecto es 10

interface DropZoneProps {
  maxFiles?: number;
  fileUploads?: string;
  onFilesChange?: (files: File[]) => void;
}

const ZonaCarga: React.FC<DropZoneProps> = ({
  maxFiles = 10,
  fileUploads,
  onFilesChange,
}) => {
  const toast = useToast();
  const [filePreviews, setFilePreviews] = useState<string[]>(
    fileUploads ? [fileUploads] : []
  ); // Guarda las URL de las previsualizaciones
  const [files, setFiles] = useState<File[]>([]); // Guarda los archivos seleccionados para dsp mandar al back

  useEffect(() => {
    // Actualiza el estado cuando cambien las props filesUpload
    setFilePreviews(fileUploads ? [fileUploads] : []);
    setFiles([]);
  }, [fileUploads]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        toast({
          title: 'Error',
          description: `Solo se pueden cargar hasta ${maxFiles} ${maxFiles === 1 ? 'archivo' : 'archivos'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const newFiles = acceptedFiles.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        return { file, previewUrl };
      });

      setFilePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newFiles.map((fileObj) => fileObj.previewUrl),
      ]);

      setFiles((prevFiles) => {
        const updatedFiles = [
          ...prevFiles,
          ...newFiles.map((fileObj) => fileObj.file),
        ];
        return updatedFiles;
      });

      // Llamar a la función de callback después de actualizar el estado
      if (onFilesChange) {
        onFilesChange([...files, ...newFiles.map((fileObj) => fileObj.file)]);
      }
    },
    [files, maxFiles, toast]
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        toast({
          title: 'Error',
          description: 'Solo se aceptan archivos .jpeg, .jpg, .png, .webp',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast]
  );

  console.log(files);

  const handleRemoveImage = (index: number) => {
    //Elimina la previsualizacion y el archivo seleccionado
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles,
  });

  return (
    <Stack direction="column">
      <Flex
        borderRadius="10px"
        w={610} // Cambien aca el ancho de la zona de carga
        justifyContent="center"
        direction={'column'}
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
            <HiOutlineDocumentAdd size={40} />
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
              <Box key={index} position="relative">
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  position="absolute"
                  top="2px"
                  right="2px"
                  variant={'delete'}
                  onClick={() => handleRemoveImage(index)}
                  aria-label="Remove image"
                />
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Stack>
  );
};

export default ZonaCarga;
