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
          })
    
      }, [favorites])

      return (
    <ModalBodyContainer>
        {loadingState === 'LOADING' && <Spinner />}
        {loadingState === 'LOADED' && results.map((recipe, index) => <PlannerItemCard dateString={props.dateString} render={props.render} recipe={recipe} key={index} />)}
        {loadingState === 'NO RESULTS' && <p>NO FAVORITES</p>}
    </ModalBodyContainer>
  )
}

export default PlannerFavorites