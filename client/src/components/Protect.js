import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

function Protect(props) {
    const { currentUser, loaded } = useSelector(state => state.user);
    const navigate = useNavigate();
    if (!loaded) {
        return <Spinner margin={'2vh'} color={'white'} ></Spinner>
    }
    if (!currentUser) {
        navigate('/Sign-in');
        return null;
    }
    return (
    <>
        {props.children}
    </>
  )
}

export default Protect;