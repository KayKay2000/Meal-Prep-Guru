
import MealCalendar from './components/meal_calendar/MealCalendar';
import {Route, Routes} from 'react-router';
import {Link} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { Box, Center, IconButton, Menu, MenuButton, MenuItem, MenuList, Show } from '@chakra-ui/react';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Dessert from './pages/Dessert';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Favorites from './pages/Favorites';
import { fetchFavorites } from './redux/reducers/favoritesReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFavorites)
  }, [dispatch])

  return (
    <div className="App">
      {/* only want logged in users to see nav and Center */}
      <Show breakpoint='(max-width: 400px)'>
        <Box>
          <Center p={10}>
            <img src='https://see.fontimg.com/api/renderfont4/83GA/eyJyIjoiZnMiLCJoIjoxMTEsInciOjEyNTAsImZzIjo4OSwiZmdjIjoiIzAwMDAwMCIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/V2hhdCdzIEZvciBEaW5uZXIgPyA/rolleteqaku-regular.png' alt='whats for dinner' />
          </Center>
          <nav>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                variant='outline'
                borderColor={'black'}
                m={5}
                p={5}
              >Main Menu </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/home">Home</Link>
                </MenuItem>
                <MenuItem>
                <Link to="/favorites">Favorites</Link>
                </MenuItem>
                <MenuItem>
                <Link to="/meal-planner">Meal Planner</Link>
                </MenuItem>  
                <MenuItem>
                  <Link to="/register">Register</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </nav>
        </Box>
      </Show>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/meal-planner" element={<MealCalendar />} />
        <Route path="/breakfast" element={<Breakfast />} />
  <Route path="/lunch" element={<Lunch />} />
  <Route path="/dinner" element={<Dinner />} />
  <Route path="/dessert" element={<Dessert />} />
  <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div >
  );
}

export default App;
