import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { menuItem } from '../data/mainMenuCategory';
import ImageSlider from '../components/ImageSlider';
const apiKey = "de796f2239c841b099773f5034406613";


export default function Home() {
  const [category, setCategory] = useState([])

  useEffect(() => {
    const fetchImage = async (category) => {
      let response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=${category}`);
      return response.data.recipes[0].image ? response.data.recipes[0] : fetchImage(category);
    }
    
    const data = menuItem.map(item => fetchImage(item.searchParam));
    Promise.all(data).then(categories => {
      setCategory(categories)
    })  
  }, []);
  

  if (!category.length) {
    return null
  }

  return (
    <div>
        <Flex justifyContent="space-evenly">
          {category.map((categoryItem) => {
            console.log(menuItem)
            return (
            <Box w="270px" rounded="20px"
            overflow="hidden" bg={'white'} mt={10}>
            <Box boxShadow='dark-lg' p='6' rounded='md' bg='white'>
              <Image rounded='md' src={categoryItem.image} alt={categoryItem.title} boxSize="250px">
              </Image>
            </Box>
            </Box>
          )})}
        </Flex>
        <Flex justifyContent="space-evenly" mt={-6}>
        <a href="/breakfast"><Box w="260px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            <strong>Breakfast</strong>
          </Box></a>
          <a href="/lunch"><Box w="260px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            <strong>Lunch</strong>
          </Box></a>
          <a href="dinner"><Box w="260px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            <strong>Dinner</strong>
          </Box></a>
          <a href="dessert"> <Box w="260px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            <strong>Dessert</strong>
          </Box></a>
        </Flex>
        <Center>
          <Box>
            <ImageSlider />
          </Box>
          </Center>
    </div>
  )
}
