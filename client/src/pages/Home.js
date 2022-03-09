import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Center, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import { menuItem } from '../data/mainMenuCategory';
import crockpot from "../img/crockpot.jpeg";
import drinks from "../img/drinks.jpeg";
import glutenFree from "../img/gluten-free.jpeg";
import italian from "../img/italian.jpeg";
import keto from "../img/keto.jpeg";
import spanish from "../img/spanish.jpeg";
import under45minutes from "../img/45minutes.jpeg";
import vegetarian from "../img/vegetarian.jpeg";
import "../styles.css"
import { Link } from 'react-router-dom';
const apiKey = "a305942736b44f9aa6879f92ab78f647";



export default function Home() {
  const [category, setCategory] = useState([])
  const [menuTitle, setMenuTitle] = useState([])

  useEffect(() => {
    const fetchImage = async (category) => {
      let response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags=${category}`);
      return response.data.recipes[0].image ? response.data.recipes[0] : fetchImage(category);
      
    }
    
    const data = menuItem.map(item => fetchImage(item.searchParam));
    Promise.all(data).then(categories => {
      setCategory(categories)
      
    })  
  }, []);

  useEffect(() => {
    menuItem.map((title) => {
      return setMenuTitle(title)
    })
  }, [])
  

  if (!category.length) {
    return null
  }


  return (
    <div className='homeBackground'>
      <Center>
      <SimpleGrid mt={10} mx={5} gap={5} columns={{ sm: 1, md: 2, lg: 4 }}>

          {category.map((categoryItem, i) => {
            
            return (
            <Box w="270px" rounded="20px"
            overflow="hidden" bg={'black'} mt={10} color='white' boxShadow='4px 7px 10px 1px #80808066'>
            <Image rounded='md' src={categoryItem.image} alt={categoryItem.title} >
              </Image>
            <Box mt={5}><a href={menuItem[i].link}><Box w="260px" height="50px" rounded="20px" border="1px solid black" pt={3}>
            <strong>{menuItem[i].title.toUpperCase()}</strong>
          </Box></a>
          </Box>
            </Box>
            
          )})}
        </SimpleGrid>
        </Center>
        <Center>
          <Box mt={10} bg='rgb(38, 45, 51)' color='white'>
            <Heading color='white'>Explore More Options...</Heading>
          <SimpleGrid mt={10} mx={5} gap={5} columns={{ sm: 1, md: 2, lg: 4 }}>
          <Link to="/crock-pot"><Box><img className="item" src={crockpot} alt="crock pot"/>Crock Pot</Box></Link>
          <Link to="/drinks"><Box><img className="item" src={drinks} alt="drinks"/>Drinks</Box></Link>
          <Link to="/gluten-free"><Box><img className="item" src={glutenFree} alt="gluten free"/>Gluten Free</Box></Link>
          <Link to="/under45"><Box><img className="item" src={under45minutes} alt="under forty five minutes"/>Ready in 45</Box></Link>
          <Link to="/italian"><Box><img className="item" src={italian} alt="italian"/>Italian</Box></Link>
          <Link to="/keto"><Box><img className="item" src={keto} alt="keto"/>Keto</Box></Link>
          <Link to="/spanish"><Box><img className="item" src={spanish} alt="spanish"/>Spanish</Box></Link>
          <Link to="/vegetarian"><Box><img className="item" src={vegetarian} alt="vegetarian"/>Vegetarian</Box></Link>
      </SimpleGrid>
          </Box>
          </Center>
    </div>
  )
}
