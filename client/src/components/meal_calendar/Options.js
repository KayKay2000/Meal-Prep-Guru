import axios from 'axios';
import React from 'react'
import styled from 'styled-components';

function Options(props) {
    // const removeItem = () => {
    //     axios.delete
    // }
  
    return (
    <OptionsContainer>
        <OptionButton>DUPLICATE</OptionButton>
        <OptionButton>VIEW RECIPE</OptionButton>
        <OptionButton> REMOVE</OptionButton>
    </OptionsContainer>
  )
}

const OptionsContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    opacity: 0;
    color: white;
    background-color: #00000050;
    transition: .2s;
    &:hover {
        opacity: 1;
    }
`

const OptionButton = styled.button`
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
    font-size: 1vw;
    font-weight: 400;
    &:hover {
        background-color: white;
        color: black;
    }
    &:active {
        opacity: .3;
    }
`

export default Options