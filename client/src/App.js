
import MealCalendar from './components/meal_calendar/MealCalendar';
import {Route, Routes, useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import { checkUser, logout } from './redux/reducers/userReducer';
import { Button, Heading } from '@chakra-ui/react';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Dessert from './pages/Dessert';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Favorites from './pages/Favorites';
import CrockPot from './pages/CrockPot'
import Under45minutes from './pages/Under45minutes'
import { fetchFavorites } from './redux/reducers/favoritesReducer';
import { useEffect } from 'react';
import Recipes from './pages/Recipes';
import GlutenFree from './pages/GlutenFree';
import Drinks from './pages/Drinks';
import Italian from './pages/Italian';
import Spanish from './pages/Spanish';
import Southern from './pages/Southern';
import Vegetarian from './pages/Vegetarian';
import Keto from './pages/Keto';
import Protect from './components/Protect';


function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFavorites)
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout)
    navigate('/Sign-in')
  }
  useEffect(()=> {
    dispatch(checkUser)
  }, [dispatch])

  return (
    <div className="App">
        { currentUser && 
        <div className='hide'>
          <Heading as='h2' size='lg'  className='logo' fontFamily='fantasy' pt='10' color='white' alignContent='center' paddingBottom={10} paddingLeft={4}><Link to='/home'>Meal Prep Guru</Link></Heading>
          <nav>
                  <Link to="/recipes">Recipes</Link>
                  <Link to="/meal-planner">Meal Planner</Link>
                  <Link to="/favorites">Favorites</Link>
          <div className='loginCredentials'>
            <div>Hello, {currentUser.firstName}!</div>
              <Button onClick={handleLogout} colorScheme="blue" variant='link'>Logout</Button>
            </div>
          </nav>
          </div>}
      <Routes>
        <Route path="/home" element={<Protect><Home /></Protect>} />
        <Route path="/" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/meal-planner" element={<Protect><MealCalendar /></Protect>} />
        <Route path="/breakfast" element={<Protect><Breakfast /></Protect>} />
        <Route path="/lunch" element={<Protect><Lunch /></Protect>} />
        <Route path="/dinner" element={<Protect><Dinner /></Protect>} />
        <Route path="/dessert" element={<Protect><Dessert /></Protect>} />
        <Route path="/favorites" element={<Protect><Favorites /></Protect>} />
       <Route path="/crock-pot" element={<Protect><CrockPot /></Protect>} />
       <Route path="/under45" element={<Protect><Under45minutes /></Protect>} />
       <Route path="/recipes" element={<Protect><Recipes /></Protect>} />
       <Route path="/gluten-free" element={<Protect><GlutenFree /></Protect>} />
       <Route path="/drinks" element={<Protect><Drinks /></Protect>} />
       <Route path="/italian" element={<Protect><Italian /></Protect>} />
       <Route path="/spanish" element={<Protect><Spanish /></Protect>} />
       <Route path="/southern" element={<Protect><Southern /></Protect>} />
       <Route path="/vegetarian" element={<Protect><Vegetarian /></Protect>} />
       <Route path="/keto" element={<Protect><Keto /></Protect>} />
      </Routes>
    </div >
  );
}

export default App;
