import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { loggedIn } from '../redux/reducers/userReducer'
import {
    FormControl,
    FormLabel,
    Button,
    Input,
    Heading,
    CloseButton,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import { fetchFavorites } from '../redux/reducers/favoritesReducer'


function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch('/api/v1/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                const data = await res.json()
                if (res.ok) {
                    setUsername('')
                    setPassword('')
                    setError('')
                    dispatch(loggedIn(data))
                    dispatch(fetchFavorites)
                    navigate('/')
                } else {
                    throw data
                }
            })
            .catch(res => {
                console.log(res)
                setError(res.error)
            })
    }
    return (
        <div className='signInBackground'>

            <div className='modal'>
                <Link to="/register">
                    <CloseButton color='white' pt={2} pl={2} />
                </Link>
                <div className='signIn'>
                    <Heading as='h2' size='lg' className='join'>Sign In To Meal Prep Guru.</Heading>
                    <br /> <br />
                    <form onSubmit={handleSubmit}>
                    { error && (
                        <Alert maxWidth="400px" mx="auto" my="5" status='error' variant='subtle'>
                        <AlertIcon />
                        Error!&nbsp;{error}
                        </Alert>
                    )}
                        <FormControl isRequired>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input id='username' placeholder='Username' borderRadius={70} value={username}
                                onChange={(e) => setUsername(e.target.value)} required />
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input id='password' placeholder='Password' type="password" borderRadius={70} value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
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
                            Sign In
                        </Button>
                    </form>
                </div>
        </div>
    </div >
    )
}

export default SignIn