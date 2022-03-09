import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import MealSlot from './MealSlot';
import axios from 'axios';
import { Spinner, useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPlanner } from '../../redux/reducers/plannerReducer';
import { PrevButton } from './buttons/PrevButton';
import { NextButton } from './buttons/NextButton';
import AddItemModal from './modal/AddItemModal';
import { appearAnimation } from '../animations/appearAnimation';

function MealCalendar() {
  const addZero = (number) => {
    if (number.toString().length < 2) {
      return '0' + number;
    } else {
      return `${number}`;
    }
  }
  const removeZero = (numberString) => {
    if (numberString[0] === '0') {
      return numberString.substring(1);
    } else {
      return numberString;
    }
  }

  const getThisWeek = () => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    if (currentDayOfWeek === 1) {
      return `${currentDate.getFullYear()}-${addZero(currentDate.getMonth() + 1)}-${addZero(currentDate.getDate())}`;
    } else {
      const difference = currentDayOfWeek > 1 ? currentDayOfWeek - 1 : -1;
      currentDate.setDate(currentDate.getDate() - difference);
      return `${currentDate.getFullYear()}-${addZero(currentDate.getMonth() + 1)}-${addZero(currentDate.getDate())}`;
    }
  }

  const getAdjacentWeek = (direction) => {
    const splitDate = week.split('-');
    if (direction === 'previous') {
      const weekDateObject = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]) - 7);
      setWeek(`${weekDateObject.getFullYear()}-${addZero(weekDateObject.getMonth() + 1)}-${addZero(weekDateObject.getDate())}`)
    } else {
      const weekDateObject = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]) + 7);
      setWeek(`${weekDateObject.getFullYear()}-${addZero(weekDateObject.getMonth() + 1)}-${addZero(weekDateObject.getDate())}`)
    }
  }

  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL","AUG", "SEP", "OCT", "NOV", "DEC"];

  const printWeek = (dateString) => {
    const splitDate = dateString.split('-');
    return `${MONTHS[parseInt(splitDate[1]) - 1]} ${removeZero(splitDate[2])}`
  }

  const navigate = useNavigate();
  const weekdayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const planner = useSelector(state => state.planner);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [ plannerData, setPlannerData ] = useState(null);
  const [ renderPlan, setRenderPlan ] = useState(true);
  const [ week, setWeek ] = useState(getThisWeek);
  const [ loadingState, setLoadingState ] = useState('NOT LOADED');
  const [ errorState, setErrorState ] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleRerender = () => {
    setRenderPlan(!renderPlan);
  }

  useEffect(() => {
    if (!user.currentUser) return;
    setLoadingState('LOADING');
    axios.get(`https://api.spoonacular.com/mealplanner/${user.currentUser.spoonacularUsername}/week/${week}?hash=${user.currentUser.spoonacularHash}&apiKey=${process.env.REACT_APP_API_KEY}`)
    .then(res => {
    dispatch(setPlanner(res.data.days));
    }).catch(error => {
      if (error.response) {
        setLoadingState('ERROR');
        setErrorState(error.response.data)
      }
    })
  }, [dispatch, renderPlan, week, user.currentUser]);
  useEffect(() => {
    if (planner.length && loadingState !== 'ERROR') {
      setLoadingState('LOADING');
      const recipeIds = []; 
      planner.forEach(day => {
        day.items.forEach(item => {
          recipeIds.push(item.value.id);
        })
      })
      axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds.join(',')}&apiKey=${process.env.REACT_APP_API_KEY}`).then(res => {
        const imageObjectMap = {};
        res.data.forEach(recipe => {
          imageObjectMap[`${recipe.id}`] = recipe;
        })
        setPlannerData({
          mealPlan: planner,
          imageObjectMap
        });
        setLoadingState('LOADED');
      })
    } else {
      setPlannerData({noData: 'noData'});
      setLoadingState('NO DATA');
    }
  }, [planner]);
  
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
        return { items: planDay.items.filter(item => item.slot === 1), date: planDay.date, type: "meals" };
      case 1:
        return { items: planDay.items.filter(item => item.slot === 2), date: planDay.date, type: "meals" };
      case 2:
        return { items: planDay.items.filter(item => item.slot === 3), date: planDay.date, type: "meals" };
      case 3:
        const filteredNutrientsArray = planDay.nutritionSummary.nutrients.filter(nutrient => 
          nutrient.name === "Calories" || nutrient.name === "Fat" || nutrient.name === "Calories" || nutrient.name === "Protein" || nutrient.name === "Carbohydrates");
        return { items: filteredNutrientsArray.map(nutrient => `${nutrient.name}: ${nutrient.amount}${nutrient.unit}`), type: "nutrients" };
      default:
        return null;      
    }
  }
  
  !user.currentUser && navigate('/Sign-in');

  return (
    user.currentUser &&
      <PageContainer>
        {
          (loadingState === 'NOT LOADED' ||
          loadingState === 'LOADING') &&
          <Spinner size='xl' /> 
        }    
        {
          (loadingState === 'LOADED' ||
          loadingState === 'NO DATA') &&
            <DayAndGridContainer margin={Object.keys(planner).length ? true : false} >
              <WeekDiv>
                <PrevButton onClick={() => getAdjacentWeek('previous')} >◀</PrevButton>
                WEEK OF {printWeek(week)}
                <NextButton onClick={() => getAdjacentWeek('next')} >▶</NextButton>
              </WeekDiv>
              <DaysContainer>
                {new Array(7).fill().map((_, index) => <Day key={index} >{weekdayArray[index].toLocaleUpperCase()}</Day>)}
              </DaysContainer> 
                <Grid>
                  {new Array(28).fill().map((_, index) => {
                      if (loadingState === 'LOADED' && plannerData?.mealPlan) {
                        const weekday = weekdayArray[index % 7];
                        const mealPlanDay = getMealPlanDay(weekday, plannerData.mealPlan);
                        const slotData = mealPlanDay ? getSlotData(index, mealPlanDay) : '';
                        if (slotData.type === 'meals') {
                          slotData.items.forEach(item => {
                            item.additionalData = plannerData.imageObjectMap[`${item.value.id}`];
                          })
                        }
                        return <MealSlot slotData={slotData} index={index} onOpen={onOpen} status={true} render={handleRerender} key={index} />
                      } else {
                        return <MealSlot index={index} onOpen={onOpen} status={false} render={handleRerender} key={index} />
                      }
                  })}
                </Grid>  
            </DayAndGridContainer>
        }
        {
        <AddItemModal isOpen={isOpen} onClose={onClose}/>
        }
        {
          loadingState === 'ERROR' &&
          <div>
            <div>
              Unable to load the calendar at this time. There may be an issue on the server, or the website is out of request points.
            </div>
            <div>
              Error Code: {errorState.code}
            </div>
            <div>
              {errorState.message}
            </div>
          </div>
        }
      </PageContainer>
  )
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  transition: .5s;
  margin-top: 2vw;
`

const DayAndGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
  height: min-content;
  transition: .5s;
`

const WeekDiv = styled.div`
  align-self: center;
  font-weight: 900;
  font-size: 3vw;
  display: flex;
  transition: .5s;
`

const Grid = styled.div`
  width: min-content;
  height: min-content;
  margin: 5vh;
  margin-top: 1vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  box-shadow: 0px 0px 1vh .1vh #00000010;
  transition: .5s;
  animation-name: ${appearAnimation};
  animation-duration: .5s;
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