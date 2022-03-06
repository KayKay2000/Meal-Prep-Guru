import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { checkPlanner } from '../../redux/reducers/plannerReducer';
// import { removeItem } from '../../redux/reducers/plannerReducer';

function Options(props) {
    const dispatch = useDispatch();
    const apiKey = '9cf4d082fd9f4fdb90897ddfc4582935';
    const handleRemoveItem = () => {
        axios.delete(`https://api.spoonacular.com/mealplanner/safehaven1017/items/${props.recipeId}?hash=9b8c0e9c4a44720444ed3a25134e0e2d3358ff79&apiKey=${apiKey}`);
        props.render();
    }
    return (
    <OptionsContainer>
        <OptionButton>DUPLICATE</OptionButton>
        <OptionButton>VIEW RECIPE</OptionButton>
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