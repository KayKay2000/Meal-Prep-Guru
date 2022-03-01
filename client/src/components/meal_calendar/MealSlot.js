import React from 'react'
import styled from 'styled-components'

function MealSlot(props) {
    return (
    <SlotContainer>
        {props.slotData}
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