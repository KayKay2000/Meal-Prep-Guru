
import MealCalendar from './components/meal_calendar/MealCalendar';
import {Navigate, Route, Routes, useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import { checkUser, logout } from './redux/reducers/userReducer';
import { Button, Center, IconButton, Menu, MenuButton, MenuItem, MenuList, Heading } from '@chakra-ui/react';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Dessert from './pages/Dessert';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Favorites from './pages/Favorites';
import { fetchFavorites } from './redux/reducers/favoritesReducer';
import { useEffect } from 'react';


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
          <Heading as='h2' size='lg'  className='logo' fontFamily='fantasy' pt='10' color='white' alignContent='center' paddingBottom={10} paddingLeft={4}>Meal Prep Guru</Heading>
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
      </Routes>
    </div >
  );
}

export default App;
