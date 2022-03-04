import { Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { cuisines } from '../data/cuisines';
import { setSearch } from '../redux/reducers/searchReducer';

export default function CuisineSearch() {
const cuisine = useSelector((state)=> state.search.form.cuisine);
const dispatch = useDispatch();

const setCuisine = (value) => {
  dispatch(setSearch('cuisine',value ))

}

  return (
    <div className='option'>
      Select a cuisine
      <Select value={cuisine} onChange={(e) => setCuisine(e.target.value)} color='white'>
        <option value="">All</option>
        {cuisines.map((cuisine) => {
          return <option key={cuisine.id}>{cuisine.cuisine}</option>
        })}
      </Select><br />
    </div>
  )
}
