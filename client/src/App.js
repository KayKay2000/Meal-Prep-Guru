
import MealCalendar from './components/meal_calendar/MealCalendar';
import {Route, Routes} from 'react-router';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import { logout } from './redux/reducers/userReducer';
import { Button, Center, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Dessert from './pages/Dessert';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  console.log(currentUser)
  const handleLogout = () => {
    dispatch(logout)
  }

  return (
    <div className="App">
        { currentUser && <div className='hide'>
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
                <Link to="/meal-planner">Meal Planner</Link>
                </MenuItem>  
              </MenuList>
            </Menu>
            <div>Hello, {currentUser.username}</div>
              <Button onClick={handleLogout} colorScheme="blue" variant='link'>Logout</Button>
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
      </Routes>
    </div >
  );
}

export default App;
