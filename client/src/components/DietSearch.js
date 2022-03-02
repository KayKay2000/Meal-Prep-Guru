import { Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { diets } from '../data/diets'
import { setSearch } from '../redux/reducers/searchReducer';


export default function DietSearch() {
  const diet = useSelector((state) => state.search.form.diet);
  const dispatch = useDispatch();

  const setDiet = (value) => {
    dispatch(setSearch('diet', value))
  }
  return (
    <div>
      <b>Select a diet</b>
      <Select value={diet} onChange={(e) => setDiet(e.target.value)}>
        <option value="">All</option>
        {diets.map((diet) => {
          return <option key={diet.id}>{diet.diet}</option>
        })}
      </Select><br />
    </div>
  )
}
