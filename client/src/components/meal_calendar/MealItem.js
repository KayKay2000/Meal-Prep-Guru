import React from 'react';
import styled from 'styled-components';

function MealItem(props) {
  return (
    <ItemContainer image={props.item.imageLink} >
        <RecipeImage src={props.item.imageLink.image} />
        <RecipeNameContainer>
            {props.item.value.title}
        </RecipeNameContainer>
    </ItemContainer>
  )
}

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

const RecipeNameContainer = styled.div`
    width: 100%;
    height: 20%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
`

export default MealItem;