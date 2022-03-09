import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ModalBodyContainer } from './ModalBodyContainer';
import PlannerItemCard from './PlannerItemCard';

function PlannerFavorites(props) {
    const favorites = useSelector((state) => state.favorites)
    const [ results, setResults ] = useState();
    const [loadingState, setLoadingState ] = useState('NONE');
    const [ errorState, setErrorState ] = useState({});
    useEffect(() => {
        setLoadingState('LOADING');
        if (!favorites.length) {
          setLoadingState('NO RESULTS');
          return
        }
    
        axios.get(`https://api.spoonacular.com/recipes/informationBulk/?apiKey=${process.env.REACT_APP_API_KEY}&ids=${favorites.map((favorite) => favorite.recipeID).join(',')}`)
          .then((res) => {
            setResults(res.data)
            setLoadingState('LOADED');
          }).catch(error => {
            if (error.response) {
              setLoadingState('ERROR');
              setErrorState(error.response.data)
            }
          })
    
      }, [favorites])

      return (
    <ModalBodyContainer>
        {loadingState === 'LOADING' && <Spinner />}
        {loadingState === 'LOADED' && results.map((recipe, index) => <PlannerItemCard dateString={props.dateString} render={props.render} recipe={recipe} key={index} />)}
        {loadingState === 'NO RESULTS' && <p>NO FAVORITES</p>}
        {
          loadingState === 'ERROR' &&
          <div style={{textAlign: 'center'}}>
            <div>
              Unable to load favorites at this time. There may be an issue on the server, or the website is out of request points.
            </div>
            <div>
              Error Code: {errorState.code}
            </div>
            <div>
              {errorState.message}
            </div>
          </div>
        }
    </ModalBodyContainer>
  )
}

export default PlannerFavorites