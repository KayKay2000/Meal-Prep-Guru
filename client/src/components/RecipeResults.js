import React from 'react'
import { Box, SimpleGrid, Spinner} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import RecipeCard from './RecipeCard'

export default function RecipeResults() {
  const {results, loading} = useSelector(state => state.search)

  if (loading) {
    return (
    <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  />
    )}
  return (
<div>
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }}>
        {results.map(recipe => {
          return <Box key={recipe.id}><RecipeCard key={recipe.id} recipe={recipe} /></Box>
        })}
      </SimpleGrid>
      </div>
  )
}