import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { menuItem } from '../data/mainMenuCategory';
const apiKey = "933bd795ebbc44218ff61f94fb6e3575";


export default function Home() {
  const [category, setCategory] = useState([])
  const [name, setName] = useState([])

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
            return (
            <Box w="300px" rounded="20px"
            overflow="hidden" bg={'white'} mt={10}>
            <Box boxShadow='dark-lg' p='6' rounded='md' bg='white'>
              <Image rounded='md' src={categoryItem.image} alt={categoryItem.title} boxSize="250px">
              </Image>
            </Box>
            </Box>
          )})}
        </Flex>
        <Flex justifyContent="space-around" mt={-6}>
          <Box w="230px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            Breakfast
          </Box>
          <Box w="230px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            Lunch
          </Box>
          <Box w="230px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            Dinner
          </Box>
          <Box w="230px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            Dessert
          </Box>
        </Flex>
    </div>
  )
}