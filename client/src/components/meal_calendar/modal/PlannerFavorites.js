import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlannerItemCard from './PlannerItemCard';

function PlannerFavorites() {
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
        {loadingState === 'LOADED' && results.map((favorite, index) => <PlannerItemCard favorite={favorite} key={index} />)}
        {loadingState === 'NO RESULTS' && <p>No Results...</p>}
    </ModalBodyContainer>
  )
}

const ModalBodyContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    padding: 1%;
`



export default PlannerFavorites