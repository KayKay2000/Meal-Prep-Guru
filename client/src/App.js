import './App.css';
import MealCalendar from './components/MealCalendar';
import { useEffect, useState } from 'react';

function App() {
  const [ calendarData, setCalendarData ] = useState([])

  useEffect(() => {
    fetch('https://api.spoonacular.com/mealplanner/safehaven10170/week/2022-02-28?hash=0fb6857bd66e0696aeab9f75bf6cfe0c4494f179')
    .then(res => res.json())
    .then(data => {
      console.log(data.days);
      console.log(new Date(data.days[0].date).getHours());
    })
  }, [])
  return (
    <div className="App">
      <MealCalendar />
    </div>
  );
}

export default App;
