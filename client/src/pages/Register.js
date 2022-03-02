import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Tacos from '../img/birria-tacos.webp'
import '../App.css'
import {
    FormControl,
    FormLabel,
    Button,
    ButtonGroup,
    Input,
    Heading
} from '@chakra-ui/react'
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')
    //send get request to our database send our username and email to spoonacular post then patch with spoonacular info
    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.post('https://api.spoonacular.com/users/connect', {
        //     username,
        //     firstName,
        //     lastName,
        //     email
            
        // }).then(res => {
        //     axios.post('/api/v1/users/register', {
        //         username,
        //         firstName,
        //         lastName,
        //         email,
        //         password,
        //         phoneNumber 
        //     }
        // }) 
        fetch('/api/v1/users/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                firstName,
                lastName,
                email,
                password,
                phoneNumber
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    setUsername('')
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setPassword('')
                    setPhoneNumber('')
                } else {
                    throw await res.json()
                }

            })
            .catch(res => {
                console.log(res)
                setError(res.error)
            })

    }

return (
    <div className='parent'>
        <div className='leftSide'>
            <img src={Tacos} alt="birria tacos" />
        </div>
        <div className='rightSide'>
            <Heading as='h2' size='2xl' isTruncated className='logo' fontFamily='fantasy' pt='10'>Meal Prep Guru</Heading>
            <br />
            <div className='features'>
                <div className='discover'>Discover new recipes</div>
                <div className='favorites'>Add them to your favorites</div>
                <div className='mealPlan'>Make your own meal plan</div>
            </div>
            <br />
            <Heading as='h2' size='md' className='join'>Join MPG Today.</Heading>
            <br />
            <div className='signUpForm' >
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input id='username' placeholder='Username' borderRadius={70} mb='1' value={username}
                            onChange={(e) => setUsername(e.target.value)} required />
                        <FormLabel htmlFor='first-name'>First name</FormLabel>
                        <Input id='first-name' placeholder='First name' borderRadius={70} mb='1' value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} required />
                        <FormLabel htmlFor='last-name'>Last name</FormLabel>
                        <Input id='last-name' placeholder='Last name' borderRadius={70} mb='1' value={lastName}
                            onChange={(e) => setLastName(e.target.value)} required />
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' placeholder='Email' type="email" borderRadius={70} mb='1' value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' placeholder='Password' type="password" borderRadius={70} mb='1' value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                        <FormLabel htmlFor='phone-number'>Phone Number</FormLabel>
                        <Input id='phone-number' placeholder='Phone Number' borderRadius={70} value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                    </FormControl>
                    <br />
                    <Button
                        size='md'
                        height='28px'
                        width='200px'
                        border='1px'
                        colorScheme='black'
                        borderRadius={70}
                        color='blue'
                        type="submit"
                    >
                        Register
                    </Button>
                </form>


            </div>
            <br /><br />
            <div >
                <div className='member'> Already a member?</div>
                <Link to="/Sign-In" className='signInButton'>
                    <Button
                        size='md'
                        height='28px'
                        width='200px'
                        border='1px'
                        colorScheme='black'
                        borderRadius={70}
                        color='blue'

                    >
                        Sign In
                    </Button>
                </Link>
            </div>
        </div>
    </div>
)
}

export default Register