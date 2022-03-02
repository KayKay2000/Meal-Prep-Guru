import {Route, Routes} from 'react-router';
import {Link} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { Center, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Dessert from './pages/Dessert';

function App() {
  return (
    <div className="App">
      <Center p={10}>
    <img src='https://see.fontimg.com/api/renderfont4/83GA/eyJyIjoiZnMiLCJoIjoxMTEsInciOjEyNTAsImZzIjo4OSwiZmdjIjoiIzAwMDAwMCIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/V2hhdCdzIEZvciBEaW5uZXIgPyA/rolleteqaku-regular.png' alt='whats for dinner'/>
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
    <Link to="/home">Home</Link>    </MenuItem>
  </MenuList>
</Menu>
</nav>
<Routes>
  <Route path="/home" element={<Home />} />
  <Route path="/breakfast" element={<Breakfast />} />
  <Route path="/lunch" element={<Lunch />} />
  <Route path="/dinner" element={<Dinner />} />
  <Route path="/dessert" element={<Dessert />} />

</Routes>
    </div>
  );
}

export default App;
