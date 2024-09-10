import {
    Flex,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Text,
  } from '@chakra-ui/react'
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
  
  const data = {
    isNew: true,
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    rating: 3.7,
  }
  
interface RatingProps {
    rating: number
  }

// saque esto de la templates de la comunidad
  function Rating({ rating }: RatingProps) {
    return (
      <Box display="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              )
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />
          })}
      </Box>
    )
  }

export default function ObraCard() {
    return (
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative">
    
            <Image src={data.imageURL} roundedTop="lg" />
    
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                {data.isNew && (
                  <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                    New
                  </Badge>
                )}
              </Box>
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated>
                  {data.name}
                </Box>
              </Flex>
    
              <Flex justifyContent="start" gap={2} alignItems="center" flexDirection="row">
                <Rating rating={data.rating} />
                <Text mt="5px"> ({data.rating})</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      )
    }
