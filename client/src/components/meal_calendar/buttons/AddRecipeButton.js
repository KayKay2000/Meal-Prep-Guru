import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setNewItemSlotData } from '../../../redux/reducers/addRecipeReducer';
// import { MealLabel } from '../MealSlot';

const MealLabel = styled.span`
    justify-self: flex-start;
    font-size: 1vw;
    font-weight: 200;
    margin-bottom: .2vw;
`

function AddRecipeButton(props) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setNewItemSlotData(props.index, props.slot, props.position));
        props.onOpen();
    }
    return (
        <RecipeButton onClick={handleClick} >
            <PlusSpan>+</PlusSpan>
        </RecipeButton>
    )
}

const RecipeButton = styled.button`
    width: 3vw;
    height: 3vw;
    border-radius: 100px;
    background-color: transparent;
    border-style: solid;
    border-width: .1vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .5vw;
    padding: 0;
    transition: color .1s, background-color .3s, opacity .1s;
    &:hover {
        background-color: black;
        color: white
    }
    &:active {
        opacity: .3;
    }
`

const PlusSpan = styled(MealLabel)`
    font-weight: 100;
    font-size: 2vw;
    margin-bottom: 17%;
`

export default AddRecipeButton;