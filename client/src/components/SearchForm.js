import CuisineSearch from './CuisineSearch';
import MealTypesSearch from './MealTypesSearch';
import DietSearch from './DietSearch';
import AllergiesSearch from './AllergiesSearch';
import NumberOfResults from './NumberOfResults';
import { useDispatch } from 'react-redux';
import { search } from '../redux/reducers/searchReducer';
import { Flex, Button, Center, Spacer, Box, Heading } from '@chakra-ui/react';


export default function SearchForm() {
const dispatch = useDispatch();
  const fetchRecipe = () => {
dispatch(search)
  }

  return <div>
<Center>
  <Box boxShadow='dark-lg' p='6' rounded='md' bg='white' m={20}>
  <Heading as='h4' size='md'>
    Search through 5000+ recipes tailored to your needs...
  </Heading>
    <Flex justify='center' m={5} pe={10} align='center'>
    <Flex direction={'column'} m={10}>
    <MealTypesSearch />
    <Spacer/>
    <CuisineSearch />
    <Spacer/>
    <DietSearch />
    <NumberOfResults />
    <Spacer/>
    </Flex>
    <AllergiesSearch />
    <Spacer/>
    </Flex>
    <Button colorScheme='green' variant='solid' onClick={fetchRecipe}>
    Generate Random Recipe
  </Button>
    </Box>
    </Center>
  </div>
}