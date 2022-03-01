import React from 'react';
import styled from 'styled-components';

function MealCalendar() {
  return (
    <div>
        <CalendarContainer>
            {new Array(28).fill().map((_, index) => 
                <Box>{index}</Box>
            )}
        </CalendarContainer>
    </div>
  )
}

const CalendarContainer = styled.div`
  width: min-content;
  margin: 5vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-width: 3px;
  box-shadow: 0px 0px 10px 1px #00000030;
`

const Box = styled.div`
    width: 10vw;
    height: 10vw;
    border-style: solid;
`

export default MealCalendar