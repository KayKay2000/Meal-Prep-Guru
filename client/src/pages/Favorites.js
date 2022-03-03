import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from '../components/RecipeCard'

function Favorites() {
  const favorites = useSelector((state) => state.favorites)

  return (
    <div>
    <Box>
      <Center pt={10}>
      <img src="https://see.fontimg.com/api/renderfont4/83GA/eyJyIjoiZnMiLCJoIjo4OCwidyI6MTI1MCwiZnMiOjcwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/WW91ciBGYXZvcml0ZXMgLiAuIC4/rolleteqaku-regular.png" alt='favorites'/>
      </Center>

      {favorites.length === 0 ? <Box p={10}>You have no recipes in your favorites!</Box> : <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }}>
        {favorites.map(recipe => {
          return <Box><RecipeCard key={recipe.id} recipe={recipe} /></Box>
        })}
      </SimpleGrid>}
      </Box>
      </div>
  )
}

export default Favorites