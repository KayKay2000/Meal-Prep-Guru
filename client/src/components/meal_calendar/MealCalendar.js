import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import MealSlot from './MealSlot';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react'

function MealCalendar() {
  const weekdayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [ plannerData, setPlannerData ] = useState({});
  const apiKey = '68389b1f8db2442ab7f2595d12160698'
  useEffect(() => {
    axios.get(`https://api.spoonacular.com/mealplanner/safehaven1017/week/2022-02-28?hash=9b8c0e9c4a44720444ed3a25134e0e2d3358ff79&apiKey=${apiKey}`)
    .then(res => {
      const mealPlan = res.data.days;
      const recipeIds = []; 
      res.data.days.forEach(day => {
        day.items.forEach(item => {
          recipeIds.push(item.value.id);
        })
      })
      axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds.join(',')}&apiKey=${apiKey}`).then(res => {
        const imageObjectMap = {};
        res.data.forEach(recipe => {
          imageObjectMap[`${recipe.id}`] = recipe;
        })
        setPlannerData({
          mealPlan,
          imageObjectMap
        });
      })
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
    <PageContainer>
      <DayAndGridContainer>
        <DaysContainer>
          {new Array(7).fill().map((_, index) => <Day key={index} >{weekdayArray[index].toLocaleUpperCase()}</Day>)}
        </DaysContainer>
        {
          Object.keys(plannerData).length === 0 ?
          <Spinner size='xl' /> : (
          <Grid>
            {new Array(28).fill().map((_, index) => {
                const weekday = weekdayArray[index % 7];
                const mealPlanDay = getMealPlanDay(weekday, plannerData.mealPlan);
                const slotData = mealPlanDay ? getSlotData(index, mealPlanDay) : '';
                if (slotData.type === 'meals') {
                  slotData.items.forEach(item => {
                    item.imageLink = plannerData.imageObjectMap[`${item.value.id}`];
                  })
                }
                return <MealSlot slotData={slotData} index={index} key={index} />
            })}
          </Grid> )
        }  
      </DayAndGridContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6vw;
`

const DayAndGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
  height: min-content;
  margin-top: 15vw;
`

const Grid = styled.div`
  width: min-content;
  height: min-content;
  margin: 5vh;
  margin-top: 1vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  box-shadow: 0px 0px 1vh .1vh #00000010;
`

const DaysContainer = styled.div`
  width: 91vw;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  margin: 0 5vh 0 5vh;
`

const Day = styled.div`
  width: 9vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vw;
  border-radius: 1vw;
  text-align: center;
  border-style: solid;
  border-color: black;
  font-weight: 200;
`

export default MealCalendar;