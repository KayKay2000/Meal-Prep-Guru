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
      <SimpleGrid mx={5} gap={5} columns={{ sm: 1, md: 2, lg: 3 }}>
        {results.map(recipe => {
          return <Box key={recipe.id}><RecipeCard key={recipe.id} recipe={recipe} /></Box>
        })}
      </SimpleGrid>
      </div>
  )
}