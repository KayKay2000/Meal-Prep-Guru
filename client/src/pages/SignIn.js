import React from 'react'
import { Link } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Button, 
    ButtonGroup, 
    Input,
    Heading,
    CloseButton
} from '@chakra-ui/react'


function SignIn() {
    return (
    <div className='signInBackground'>
        
        <div className='modal'>
        <Link to="/register">
        <CloseButton color='white' pt={2} pl={2} />
        </Link>
        <div className='signIn'>
        <Heading as='h2' size='lg' className='join'>Sign In To Meal Plan Guru.</Heading>
            <br /> <br/>
            <FormControl isRequired>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input id='username' placeholder='Username' borderRadius={70} />
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' placeholder='Password' type="password" borderRadius={70}/>
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
                
                >
                Sign In
                </Button>
                </div>
        </div>
    </div>
    )
}

export default SignIn