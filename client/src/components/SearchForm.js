import CuisineSearch from './CuisineSearch';
import MealTypesSearch from './MealTypesSearch';
import DietSearch from './DietSearch';
import AllergiesSearch from './AllergiesSearch';
import NumberOfResults from './NumberOfResults';
import { useDispatch } from 'react-redux';
import { search } from '../redux/reducers/searchReducer';
import { Flex, Button, Center, Spacer, Box, Heading } from '@chakra-ui/react';


export default function SearchForm(props) {
const dispatch = useDispatch();
  const fetchRecipe = () => {
dispatch(search)
  }

  return <div className='background pageLength'>
<Center position='sticky' top='2'>
  <Box border='solid' boxShadow='4px 7px 10px 1px #80808066' p='6' rounded='md' bg='black' position='sticky'  m={15} top='10'>
  <Heading as='h4' size='md' fontWeight='medium' color='white'>
    Search through 5000+ recipes tailored to your needs...
  </Heading>
    <Flex direction="column" justify='center' m={5} pe={10} align='center'>
    {props.hideMealType || <>
    <MealTypesSearch />
    <Spacer/>
    </>}
    <CuisineSearch />
    <Spacer/>
    <DietSearch />
    <NumberOfResults />
    <Spacer/>
    <AllergiesSearch />
    <Spacer/>
    </Flex>
    <Button size='md'
            height='28px'
            width='200px'
            border='1px'
            colorScheme='black'
            borderRadius={70}
            color='blue'
            onClick={fetchRecipe}>
    Get Recipes
  </Button>
    </Box>
    </Center>
  </div>
}