import React from 'react';
import styled from 'styled-components';
import MealItem from './MealItem';

function MealSlot(props) {
    return (
    <SlotContainer type={props.slotData.type} >
        {
            props.index > 20 ?
                <MealLabel>NUTRITION SUMMARY</MealLabel>
                :
                props.index > 13 ?
                    <MealLabel>EVENING</MealLabel>
                    :
                    props.index > 6 ?
                        <MealLabel>NOON</MealLabel>
                        :
                        <MealLabel>MORNING</MealLabel>      
        }
        {
            props.slotData.type === 'meals' ? 
                props.slotData.items.length > 0 ?
                    props.slotData.items.map((item, index) => <MealItem item={item} date={props.slotData.date} render={() => props.render()} key={index}/>)
                    :
                    ''
            :
            props.slotData.type === 'nutrients' &&
                props.slotData.items.map((item, index) => <p key={index} >{item}</p>)
                
        }
        {
        props.index > 20 || <AddRecipeButton><PlusSpan>+</PlusSpan></AddRecipeButton>
        }
    </SlotContainer>
  )
}

const SlotContainer = styled.div`
    width: 13vw;
    ${props => props.type === "nutrients" && 'height: 16vh;'}
    font-size: ${props => props.type === 'nutrients' ? '.8vw' : '.5vw'};
    display: flex;
    flex-direction: column;
    /* ${props => props.type === 'nutrients' && 'justify-content: center;'} */
    align-items: center;
    flex-shrink: 0;
    border-width: .1vh;
    padding-bottom: .5vw;
    border-color: #00000030;
`

const MealLabel = styled.span`
    justify-self: flex-start;
    font-size: 1vw;
    font-weight: 200;
    margin-bottom: .2vw;
`

const AddRecipeButton = styled.button`
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
export default MealSlot;