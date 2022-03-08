
import MealCalendar from './components/meal_calendar/MealCalendar';
import { Route, Routes, useNavigate} from 'react-router';
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
          <Link to="/home"><Heading as='h2' size='lg'  className='logo' fontFamily='fantasy' pt='10' color='white' alignContent='center' paddingBottom={10} paddingLeft={4}>Meal Prep Guru</Heading></Link>
          <nav>
                  <Link to="/recipes">Recipes</Link>
                  <Link to="/meal-planner">Meal Planner</Link>
                  <Link to="/favorites">Favorites</Link>
                  <Link to="/profile">Profile</Link>
          <div className='loginCredentials'>
            <div>Hello, {currentUser.firstName}</div>
              <Button onClick={handleLogout} colorScheme="blue" variant='link'>Logout</Button>
            </div>
          </nav>
          </div>}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/meal-planner" element={<MealCalendar />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/favorites" element={<Favorites />} />
       {/* <Route path="/profile" element={<Profile />} /> */}
       <Route path="/crock-pot" element={<CrockPot />} />
       <Route path="/under45" element={<Under45minutes />} />
       <Route path="/recipes" element={<Recipes />} />
       <Route path="/gluten-free" element={<GlutenFree />} />
       <Route path="/drinks" element={<Drinks />} />
       <Route path="/italian" element={<Italian />} />
       <Route path="/spanish" element={<Spanish />} />
       <Route path="/southern" element={<Southern />} />
       <Route path="/vegetarian" element={<Vegetarian />} />
       <Route path="/keto" element={<Keto />} />
      </Routes>
    </div >
  );
}

export default App;
