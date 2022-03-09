import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { appearAnimation } from '../../animations/appearAnimation';

function PlannerItemCard(props) {
    const { id, image, title, servings, readyInMinutes, pricePerServing, spoonacularScore, sourceUrl } = props.recipe;
    const user = useSelector(state => state.user);
    const handleViewRecipe = () => {
        window.open(sourceUrl);
    }
    const { index, slot, position } = useSelector(state => state.newItemSlotData);

    const getDateSeconds = (dateString) => {
        const splitArray = dateString.split('-');
        const mondayObject = new Date(parseInt(splitArray[0]), parseInt(splitArray[1]) - 1, parseInt(splitArray[2]));
        const dayOffset = 86400000 * (index % 7);
        return ((mondayObject.getTime() + dayOffset) / 1000);
    }

    const dateSeconds = getDateSeconds(props.dateString);

    const handleAddItem = () => {
        axios.post(`https://api.spoonacular.com/mealplanner/safehaven1017/items?hash=${user.currentUser.spoonacularHash}&apiKey=${process.env.REACT_APP_API_KEY}`, {
            date: dateSeconds,
            slot,
            position,
            type: 'RECIPE',
            value: {
                id,
                servings,
                title
            }
        }).then(() => {
            props.render();
        });
    }

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
                <CardButton onClick={handleViewRecipe} >VIEW RECIPE</CardButton>
                <CardButton onClick={handleAddItem} >ADD TO PLANNER</CardButton>
            </ButtonContainer>
        </DetailsContainer>
    </FavoriteCardContainer>
  )
}

const FavoriteCardContainer = styled.div`
    width: 90%;
    height: 20%;
    box-shadow: 0 0 10px 1px #00000030;
    display: flex;
    align-items: center;
    margin: 2%;
    overflow: hidden;
    border-radius: 5px;
    animation-name: ${appearAnimation};
    animation-duration: .5s;
    background-color: black;
    color: white;
    flex-shrink: 0;
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
    font-size: .9rem;
    font-weight: 400;
    text-align: center;
    margin-top: 1%;
    line-height: 100%;
`

const Detail = styled.div`
    font-weight: 200;
    font-size: 10%;
`

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 15%;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: 2%;
`

const CardButton = styled(Button)`
    font-size: 10%;
    height: 100%;
    width: 40%;
    margin: 1vh;
    background-color: white;
    color: black;
    transition: .5s;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    &:hover {
        color: white;
        background-color: black;
        border-color: white;
        border-width: 1px;
        width: 50%;
        border-style: solid;
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