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

function Register() {

    return (
        <div className='parent'>
            <div className='leftSide'>
                <img src={Tacos} alt="birria tacos"  />
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
                <FormControl isRequired>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input id='username' placeholder='Username' borderRadius={70} mb='1' />
                    <FormLabel htmlFor='first-name'>First name</FormLabel>
                        <Input id='first-name' placeholder='First name' borderRadius={70} mb='1' />
                    <FormLabel htmlFor='last-name'>Last name</FormLabel>
                        <Input id='last-name' placeholder='Last name' borderRadius={70} mb='1' />
                    <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' placeholder='Email' type="email" borderRadius={70} mb='1' />
                    <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' placeholder='Password' type="password" borderRadius={70} mb='1'/>
                    <FormLabel htmlFor='phone-number'>Phone Number</FormLabel>
                        <Input id='phone-number' placeholder='Phone Number' borderRadius={70} />
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
                        justifySelf='flex-start'
                        >
                        Register
                    </Button>


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