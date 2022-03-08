import { Button } from '@chakra-ui/react';
import React from 'react'
import styled from 'styled-components';
import { appearAnimation } from '../../animations/appearAnimation';



function PlannerItemCard(props) {
    const { image, title, servings, readyInMinutes, pricePerServing, spoonacularScore } = props.favorite;
    return (
    <FavoriteCardContainer>
        <ImageContainer>
            <RecipeImage src={image} />
        </ImageContainer>
        <DetailsContainer>
            <RecipeTitle>{title}</RecipeTitle>
            <Detail>SERVINGS: {servings}</Detail>
            <Detail>READY IN: {readyInMinutes} MINUTE(S)</Detail>
            <Detail>PRICE PER SERVING: {pricePerServing}</Detail>
            <Detail>SCORE: {spoonacularScore}</Detail>
            <ButtonContainer>
                <CardButton>VIEW RECIPE</CardButton>
                <CardButton>ADD TO PLANNER</CardButton>
            </ButtonContainer>
        </DetailsContainer>
    </FavoriteCardContainer>
  )
}

const FavoriteCardContainer = styled.div`
    width: 90%;
    height: 40%;
    box-shadow: 0 0 10px 1px #00000030;
    display: flex;
    align-items: center;
    margin: 2%;
    overflow: hidden;
    border-radius: 5px;
    animation-name: ${appearAnimation};
    animation-duration: .5s;
`

const ImageContainer = styled.div`
    width: 40%;
    height: 100%;
    box-shadow: 0 0 7px 1px #00000050;
`

const RecipeImage = styled.img`
    width: 100%;
    height: 100%;
`

const DetailsContainer = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RecipeTitle = styled.h4`
    font-size: 1.1vw;
    font-weight: 400;
    color: black;
    text-align: center;
`

const Detail = styled.div`
    font-weight: 200;
    font-size: 1vw;
`

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 15%;
    justify-content: center;
    align-items: center;
`

const CardButton = styled(Button)`
    font-size: .6vw;
    height: 100%;
    width: 50%;
    margin: 1vw;
    margin-top: 10%;
    background-color: black;
    color: white;
    transition: .5s;
    border-style: none;
    &:hover {
        color: black;
        background-color: white;
        border-color: black;
        border-width: 1px;
        width: 50%;
    }
    &:active {
        width: 50%;
        background-color: grey;
    }
    &:focus {
        border-style: none;
        border-color: transparent;
    }
`

export default PlannerItemCard;