import React, { useState } from 'react';
import styled from 'styled-components';
// import { MealLabel } from '../MealSlot';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

const MealLabel = styled.span`
    justify-self: flex-start;
    font-size: 1vw;
    font-weight: 200;
    margin-bottom: .2vw;
`

function AddRecipeButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { tabFocusArray, setTabFocusArray } = useState({favorites: true, recipes: false, results: false});
    const bool = false;
    return (
    <>
        <RecipeButton>
            <PlusSpan onClick={onOpen} >+</PlusSpan>
        </RecipeButton>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBackground>
                    <ModalNavContainer>
                        <TabSelector isSelected={bool} >FAVORITES</TabSelector>
                        <TabSelector isSelected={bool} >RECIPE SEARCH</TabSelector>
                        <TabSelector isSelected={bool} >RESULTS</TabSelector>
                        <MyModalCloseButton />
                    </ModalNavContainer>
                </ModalBackground>
            </ModalContent>
        </Modal>
    </>
  )
}

const RecipeButton = styled.button`
    width: 3vw;
    height: 3vw;
    border-radius: 100px;
    background-color: transparent;
    border-style: solid;
    border-width: .1vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .5vw;
    padding: 0;
    transition: color .1s, background-color .3s, opacity .1s;
    &:hover {
        background-color: black;
        color: white
    }
    &:active {
        opacity: .3;
    }
`

const PlusSpan = styled(MealLabel)`
    font-weight: 100;
    font-size: 2vw;
    margin-bottom: 17%;
`

const ModalBackground = styled.div`
    background-color: white;
    height: 50vh;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    overflow: hidden;
`

const ModalNavContainer = styled.div`
    display: flex;
    background-color: white;
    height: 10%;
    width: 100%;
    flex-direction: row;
    border-color: black;
    align-items: center;
    overflow: hidden;
    border-radius: 0px;
`

const TabSelector = styled.button`
    height: 20vh;
    width: 28%;
    background-color: black;
    color: white;
    font-weight: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    border-right-style: solid;
    border-left-style: none;
    border-bottom-style: none;
    border-top-style: none;
    border-width: 1px;
    border-color: black;
    border-radius: 0px;
    cursor: pointer;
`

const MyModalCloseButton = styled(ModalCloseButton)`
    margin-left: auto;
    position: static;
    height: 100%;
    width: 10%;
    top: 0;
    bottom: 0;
    transition: .3s;
    background-color: white;
    color: black;
    border-radius: 0;
    border-style: none;
    border-color: black;
    border-width: 1px;
    &:hover {
        border-style: none;
        border-color: black;
        background-color: black;
        color: white;
    }
`

export default AddRecipeButton