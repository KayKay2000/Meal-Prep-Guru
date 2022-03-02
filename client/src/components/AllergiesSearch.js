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
            <Heading as='h6' size='md' p={5} textDecoration='underline'>
    Allergies
  </Heading>
      <SimpleGrid spacing={5} columns={{ sm: 2, md: 3, lg: 4 }}>
        {intolerances.map((intolerance) => {
          return (
            <Checkbox key={intolerance.id} colorScheme='red' id={intolerance.type} name={intolerance.type} onChange={(e) => handleChangeAllergy(intolerance.type, e.target.checked)} value={intolerance.type}>
              {intolerance.type}
            </Checkbox>
        )})}
      </SimpleGrid>
    </Box>
    </div>
  ) 
}
