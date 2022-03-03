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
    width: 13vw;
    height: 10vh;
    border-style: solid;
    font-size: .5vw;
    border-width: 1px;
`

export default MealSlot