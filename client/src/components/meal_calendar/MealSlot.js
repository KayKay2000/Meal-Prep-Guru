import React from 'react';
import styled from 'styled-components';
import MealItem from './MealItem';

function MealSlot(props) {
    return (
    <SlotContainer type={props.slotData.type} >
        {
            props.slotData.type === 'meals' ? 
                props.slotData.items.length > 0 ?
                    props.slotData.items.map((item, index) => <MealItem item={item} key={index}/>)
                    :
                    ''
            :
            props.slotData.type === 'nutrients' &&
                props.slotData.items.map((item, index) => <p>{item}</p>)
                
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
    ${props => props.type === 'nutrients' && 'justify-content: center;'}
    align-items: center;
    flex-shrink: 0;
    border-width: .1vh;
    padding-bottom: .5vw;
    border-color: #00000030;
`

export default MealSlot