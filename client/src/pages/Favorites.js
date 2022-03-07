import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from '../components/RecipeCard'

function Favorites() {
  const favorites = useSelector((state) => state.favorites)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!favorites.length) {
      return
    }

    axios.get(`https://api.spoonacular.com/recipes/informationBulk/?apiKey=de796f2239c841b099773f5034406613&ids=${favorites.map((favorite) => favorite.recipeID).join(',')}`)
      .then((res) => {
        setResults(res.data)
      })

  }, [favorites])

  return (
    <div>
      <Box>
        <Center pt={10}>
          <img src="https://see.fontimg.com/api/renderfont4/83GA/eyJyIjoiZnMiLCJoIjo4OCwidyI6MTI1MCwiZnMiOjcwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/WW91ciBGYXZvcml0ZXMgLiAuIC4/rolleteqaku-regular.png" alt='favorites' />
        </Center>

        {favorites.length === 0 ? <Box p={10}>You have no recipes in your favorites!</Box> : <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }}>
          {results.map(recipe => {
            return <Box><RecipeCard key={recipe.id} recipe={recipe} /></Box>
          })}
        </SimpleGrid>}
      </Box>
    </div>
  )
}

export default Favorites