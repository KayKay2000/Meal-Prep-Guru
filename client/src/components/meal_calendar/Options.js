import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function Options(props) {
    const user = useSelector(state => state.user)
    const handleDuplicateItem = () => {
        axios.post(`https://api.spoonacular.com/mealplanner/safehaven1017/items?hash=${user.currentUser.spoonacularHash}&apiKey=${process.env.API_KEY}`, {
            date: props.date,
            slot: props.item.slot,
            position: props.duplicatePosition,
            type: props.item.type,
            value: props.item.value
        }).then(() => {
            props.render();
        });
    }

    const handleRemoveItem = () => {
        axios.delete(`https://api.spoonacular.com/mealplanner/safehaven1017/items/${props.item.id}?hash=${user.currentUser.spoonacularHash}&apiKey=${process.env.API_KEY}`)
        .then(() => {
            props.render();
        })
    }

    const handleViewRecipe = () => {
        window.open(props.item.additionalData.sourceUrl);
    }

    return (
    <OptionsContainer>
        <OptionButton onClick={handleDuplicateItem} >DUPLICATE</OptionButton>
        <OptionButton onClick={handleViewRecipe}>VIEW RECIPE</OptionButton>
        <OptionButton onClick={handleRemoveItem} > REMOVE</OptionButton>
    </OptionsContainer>
  )
}

const OptionsContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    opacity: 0;
    color: white;
    background-color: #00000050;
    transition: .2s;
    &:hover {
        opacity: 1;
    }
`

const OptionButton = styled.button`
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
    font-size: 1vw;
    font-weight: 400;
    &:hover {
        background-color: white;
        color: black;
    }
    &:active {
        opacity: .3;
    }
`

export default Options