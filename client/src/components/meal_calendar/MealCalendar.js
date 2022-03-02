import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import MealSlot from './MealSlot';

function MealCalendar() {
  const weekdayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [ mealPlan, setMealPlan ] = useState([]);
  useEffect(() => {
    fetch('https://api.spoonacular.com/mealplanner/safehaven1017/week/2022-02-28?hash=9b8c0e9c4a44720444ed3a25134e0e2d3358ff79&apiKey=c45e6cbe895742f6a43c5da049a3f77c')
    .then(res => res.json())
    .then(data => {
      setMealPlan(data.days);
    })
  }, [])
  
  const getMealPlanDay = (day, mealPlan) => {
    return mealPlan.find(planDay => planDay.day === day);
  }
  
    // when determining if meal item is breakfast/lunch/dinner, the index needs to be divisible by 7
    // in an indexed grid with 7 columns, you can subtract the index of a weekday array to make the index divisible
    const offsetIndex = (index, day) => {
      const offset = weekdayArray.indexOf(day);
      return index - offset;
    }

  const getSlotData = (dayIndex, planDay) => {
    switch (offsetIndex(dayIndex, planDay.day) / 7) {
      case 0:
        return { items: planDay.items.filter(item => item.slot === 1), type: "meals" };
      case 1:
        return { items: planDay.items.filter(item => item.slot === 2), type: "meals" };
      case 2:
        return { items: planDay.items.filter(item => item.slot === 3), type: "meals" };
      case 3:
        const filteredNutrientsArray = planDay.nutritionSummary.nutrients.filter(nutrient => 
          nutrient.name === "Calories" || nutrient.name === "Fat" || nutrient.name === "Calories" || nutrient.name === "Protein" || nutrient.name === "Carbohydrates");
        return { items: filteredNutrientsArray.map(nutrient => `${nutrient.name}: ${nutrient.amount}${nutrient.unit}`), type: "nutrients" };
      default:
        return null;      
    }
  }
  return (
    mealPlan.length === 0 ?
    <div>No Data</div> :
    <CalendarContainer>
      {new Array(28).fill().map((_, index) => {
          const weekday = weekdayArray[index % 7];
          const mealPlanDay = getMealPlanDay(weekday, mealPlan);
          const slotData = mealPlanDay ? getSlotData(index, mealPlanDay) : 'No Data';
          return <MealSlot slotData={slotData} />
      })}
    </CalendarContainer>  
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

export default MealCalendar