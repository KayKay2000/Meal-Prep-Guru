import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { Center, IconButton, Menu, MenuButton, MenuItem, MenuList, Show, Box } from '@chakra-ui/react';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

function App() {
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
      </Routes>
    </div >
  );
}

export default App;
