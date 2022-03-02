import React from 'react'
import styled from 'styled-components'

function MealSlot(props) {
    return (
    <SlotContainer>
        {props.slotData === 'No Data' ? 
            'No Data' 
            : 
            props.slotData.type === 'meals' ? 
            props.slotData.items.length > 0 ?
                props.slotData.items.map(item => item.value.title)
                :
                'No Data'
            :
            props.slotData.items
        }
    </SlotContainer>
  )
}

const SlotContainer = styled.div`
    width: 10vw;
    height: 10vw;
    border-style: solid;
    font-size: .5vw;
`

export default MealSlot