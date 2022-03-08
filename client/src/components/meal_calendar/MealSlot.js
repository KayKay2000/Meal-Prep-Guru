import React from 'react';
import styled from 'styled-components';
import MealItem from './MealItem';
import AddRecipeButton from './buttons/AddRecipeButton';

export const MealLabel = styled.span`
    justify-self: flex-start;
    font-size: 1vw;
    font-weight: 200;
    margin-bottom: .2vw;
`

function MealSlot(props) {
    const maxPosition = props.status ? 
        props.slotData.type === 'meals' && props.slotData.items.map(item => item.position).reduce((a, b) => Math.max(a, b), -Infinity) 
        : 
        null;
    return (
    <SlotContainer type={props.status ? props.slotData.type : 'none'} >
        {
        props.status ? 
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
        :
        ''
        }
        {
        props.status ?
            props.slotData.type === 'meals' ?  
                props.slotData.items.length > 0 ?
                    props.slotData.items.map((item, index) => <MealItem item={item} date={props.slotData.date} duplicatePosition={maxPosition + 1} render={() => props.render()} key={index}/>)
                    :
                    ''
                :
            props.slotData.type === 'nutrients' && props.status &&
                props.slotData.items.map((item, index) => <p key={index} >{item}</p>)
        :
        ''
        }
        {
        props.index > 20 || <AddRecipeButton />
        }
    </SlotContainer>
  )
}

const SlotContainer = styled.div`
    width: 13vw;
    ${props => props.type === 'none' && 'height: 16vh;'}
    ${props => props.type === "nutrients" && 'height: 16vh;'}
    font-size: ${props => props.type === 'nutrients' ? '.8vw' : '.5vw'};
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    border-width: .1vh;
    padding-bottom: .5vw;
    border-color: #00000030;
`

export default MealSlot;