import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
} from '@chakra-ui/react'
import PlannerFavorites from './PlannerFavorites';

function AddItemModal(props) {
  const [ isSelected, setIsSelected ] = useState('favorites');
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalBackground>
                <ModalNavContainer>
                    <TabSelector select={'favorites'} isSelected={isSelected} onClick={() => setIsSelected('favorites')} >FAVORITES</TabSelector>
                    <TabSelector select={'recipes'} isSelected={isSelected} onClick={() => setIsSelected('recipes')} >RECIPE SEARCH</TabSelector>
                    <TabSelector select={'results'} isSelected={isSelected} onClick={() => setIsSelected('results')} >RESULTS</TabSelector>
                    <MyModalCloseButton />
                </ModalNavContainer>
                {
                    isSelected === 'favorites' && <PlannerFavorites />
                }
            </ModalBackground>
        </ModalContent>
    </Modal>
  )
}

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
    background-color: ${props => props.isSelected === props.select ? 'white' : 'black'};
    color: ${props => props.isSelected === props.select ? 'black' : 'white'};
    font-weight: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    border-right-style: none;
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

export default AddItemModal;