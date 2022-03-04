import { Box, Image, Badge, Text, Stack, Button, Collapse, Center, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, fetchFavorites, removeFavorite } from '../redux/reducers/favoritesReducer';

export default function RecipeCard(props) {
  const { recipe } = props
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites)
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  const handleAddFavorite = async () => {
    const res = await fetch('/api/v1/favorites', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch(fetchFavorites)
  }

  const handleRemoveFavorite = async () => {
    const res = await fetch(`/api/v1/favorites/${recipe.id}`, {
      method: 'DELETE',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    dispatch(fetchFavorites)
  }

  const isAlreadySaved = favorites.find((savedFavorite) => {
    return savedFavorite.recipeID === recipe.id
  });

  if (!recipe) {
    return "No results, Please broaden your search!"
  }
// console.log(recipe)
  return (
<div>
    <Center>
      <Box w="300px" rounded="20px" 
        overflow="hidden" bg={'black'} mt={10} >
        <Box p='6' rounded='md' bg='black' border='solid' borderColor='white' borderWidth='thin' >
          <Image rounded='md' src={recipe.image} alt={recipe.title} boxSize="250px">
          </Image>
        </Box>
        <Box p={5} bg='black' >
          <Stack align="center" bg='black'>
            <Text as="h2" fontWeight="bold" my={2} color='white'>
              {recipe.title}
            </Text>
            <Badge variant="solid" colorScheme="blue"
                  rounded="full" px={2} m={5}>
                  Recipe Info
                </Badge>
                <Text pb={5} color='white'>
                  Servings : {recipe.servings}<br />
                  Price Per Serving: ${(recipe.pricePerServing / 100).toFixed(2)}<br />
                  Ready in: {recipe.readyInMinutes} minutes<br />
                  Taste Score: {recipe.spoonacularScore}%<br />
                </Text>
            <Button  size='md'
            height='28px'
            width='200px'
            border='1px'
            colorScheme='black'
            borderRadius={70}
            color='blue'      
            onClick={handleToggle}>
              {show ? 'Hide' : 'Show'} Recipe
            </Button>
            <Collapse mt={4} in={show}>
              <Box border='1px' borderColor='black.200' pb={5}>
                <Badge variant="solid" colorScheme="green"
                  rounded="full" px={2} m={5}>
                  Ingredients
                </Badge>
                <Text fontWeight="light">
                  {recipe.extendedIngredients.map((ingredient) => {
                    return <div>
                      <Box mb={5} color='white'>
                      <Center><Image src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={ingredient.name}></Image></Center>
                      {ingredient.name} ({ingredient.amount.toFixed(2)} {ingredient.unit})
                      </Box>
                    </div>
                  })}
                  <Badge variant="solid" colorScheme="green"
                    rounded="full" px={2} m={5}>
                    Instructions
                  </Badge>
                  {recipe.analyzedInstructions.map((instruction) => {
                    return instruction.steps.map((step) => {
                      return <div className="instructions">
                        <span>{step.number}. {step.step}</span><br /><br />
                      </div>
                    })
                  })}
                  </Text>
              </Box>
            </Collapse>
          </Stack>
          <VStack>
            {isAlreadySaved ? (
              <Button   
            size='md'
            height='28px'
            width='200px'
            border='1px'
            colorScheme='black'
            borderRadius={70}
            color='red'    
            onClick={handleRemoveFavorite} 
            mt={5}>Remove From Favorites</Button>
            ) : (
              <Button
            size='md'
            height='28px'
            width='200px'
            border='1px'
            colorScheme='black'
            borderRadius={70}
            color='green'   
            onClick={handleAddFavorite} 
            mt={5}>Add To Favorites</Button>
            )}
          </VStack>
        </Box >
      </Box >
    </Center>
    </div>
  )
}
