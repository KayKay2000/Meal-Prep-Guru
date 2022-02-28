import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Flex, Image } from '@chakra-ui/react';
import {menuItem} from '../data/mainMenuCategory';
const apiKey = "55caf27efe9b4306bf0977979a820a99";


export default function Home() {
  const [category, setCategory] = useState([])

  useEffect(() => {
    fetchCategories();
  },[]);

  axios.get('/api/v1/users')
  .then

// const fetchCategories = () => {menuItem.map((item) => {
// return axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=${item.searchParam}`)
//    .then((res) => {
//      setCategory([...category, res.data.recipes[0]])
// })
// })}

  if(!category) {
    return
  }

  console.log(category)
  
  return ( 
    <div>
        <Box boxShadow='dark-lg' p='6' rounded='md' bg='white'>
        <Flex justifyContent="space-evenly">
          {category.map((categoryItem) => {
          return <Image borderRadius="20px" src={categoryItem.image} alt={categoryItem.title} boxSize="250px">
          </Image>
          })}
          </Flex>
        </Box>
    </div>
  )
}
