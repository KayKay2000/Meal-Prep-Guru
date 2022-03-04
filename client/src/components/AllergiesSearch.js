import { Box, Checkbox, Heading, SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { intolerances } from '../data/intolerances';
import { setSearch } from '../redux/reducers/searchReducer';

export default function AllergiesSearch() {
  const allergies = useSelector((state) => state.search.form.allergies);
  const dispatch = useDispatch();

  const handleChangeAllergy = (type, checked) => {
    if (checked) {
      dispatch(setSearch('allergies', [...new Set([...allergies, type])]))
    } else {
      dispatch(setSearch('allergies', [...allergies].filter(allergy => allergy !== type)))
    }
  }

  return (
    <div>
    <Box>
            <Heading as='h6' size='md' p={5} fontWeight='light' color='white'>
    Allergies
  </Heading>
      <SimpleGrid spacingX={10} columns={{ sm: 2, md: 2, lg: 2 }}>
        {intolerances.map((intolerance) => {
          return (
            <Checkbox key={intolerance.id} colorScheme='black' id={intolerance.type} name={intolerance.type} onChange={(e) => handleChangeAllergy(intolerance.type, e.target.checked)} value={intolerance.type} color='white'>
              {intolerance.type.toUpperCase()}
            </Checkbox>
        )})}
      </SimpleGrid>
    </Box>
    </div>
  ) 
}
