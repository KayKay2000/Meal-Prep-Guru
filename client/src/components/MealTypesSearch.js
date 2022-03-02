import { Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'
import { mealTypes } from '../data/mealTypes'
import { setSearch } from '../redux/reducers/searchReducer';


export default function MealTypesSearch() {
  const mealType = useSelector((state) => state.search.form.mealType);
  const dispatch = useDispatch();

const setMealType = (value) => {
  dispatch(setSearch('mealType',value))
}

  return (
    <div>
      <b>Select a meal type</b>
      <Select value={mealType} onChange={(e) => setMealType(e.target.value)} >
        <option value="">All</option>
        {mealTypes.map((mealType) => {
          return <option key={mealType.id}>{mealType.type}</option>
        })}
      </Select><br />
    </div>
  )
}
