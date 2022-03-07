import React from 'react';
import styled from 'styled-components';
import Options from './Options';

function MealItem(props) {
  return (
    <ItemContainer>
        <RecipeNameContainer>
            {props.item.value.title}
        </RecipeNameContainer>
        <RecipeImage src={props.item.additionalData.image} />
        <Options item={props.item} date={props.date} duplicatePosition={props.duplicatePosition} render={() => props.render()} />
    </ItemContainer>
  )
}

const RecipeNameContainer = styled.div`
    width: 100%;
    height: 25%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    font-weight: 500;
    font-size: .6vw;
`

const ItemContainer = styled.div`
    width: 12vw;
    height: 14vh;
    background-color: transparent;
    position: relative;
    flex-shrink: 0;
    margin-top: .5vw;
    overflow: hidden;
    border-radius: .2vw;
    box-shadow: 0px 0px 3px 1px #00000030;
`

const RecipeImage = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
`


export default MealItem;