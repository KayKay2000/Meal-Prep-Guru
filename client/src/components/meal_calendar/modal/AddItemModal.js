import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
} from '@chakra-ui/react'
import PlannerFavorites from './PlannerFavorites';
import SearchForm from '../../SearchForm';
import ModalResults from './ModalResults';
import { useSelector } from 'react-redux';

function AddItemModal(props) {

    const getDateSeconds = (dateString) => {
      const splitArray = dateString.split('-');
      const mondayObject = new Date(parseInt(splitArray[0]), parseInt(splitArray[1]) - 1, parseInt(splitArray[2]));
      const dayOffset = 86400000 * (index % 7);
      return ((mondayObject.getTime() + dayOffset) / 1000);
    }

  const [ isSelected, setIsSelected ] = useState('favorites');
  const { index, slot, position } = useSelector(state => state.newItemSlotData);
  const dateSeconds = getDateSeconds(props.week);
  return (
    <Modal size={'lg'} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalBackground>
                <ModalNavContainer>
                    <TabSelector select={'favorites'} isSelected={isSelected} onClick={() => setIsSelected('favorites')} >FAVORITES</TabSelector>
                    <TabSelector select={'search'} isSelected={isSelected} onClick={() => setIsSelected('search')} >RECIPE SEARCH</TabSelector>
                    <TabSelector select={'results'} isSelected={isSelected} onClick={() => setIsSelected('results')} >RESULTS</TabSelector>
                    <MyModalCloseButton />
                </ModalNavContainer>
                {
                    isSelected === 'favorites' && <PlannerFavorites />
                }
                {
                    isSelected === 'search' && <ModalComponentContainer><SearchForm isModal={true} setIsSelected={setIsSelected} /></ModalComponentContainer>
                }
                {
                    isSelected === 'results' && <ModalResults />
                }
            </ModalBackground>
        </ModalContent>
    </Modal>
  )
}

const ModalBackground = styled.div`
    background-color: white;
    height: 80vh;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    overflow: scroll;
    position: relative;
`

const ModalNavContainer = styled.div`
    display: flex;
    background-color: white;
    height: 7%;
    width: 100%;
    flex-direction: row;
    border-color: black;
    align-items: center;
    border-radius: 0px;
    top: 0px;
`

const TabSelector = styled.button`
    height: 20vh;
    width: 30%;
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
    border-radius: 0px;
    color: black;
    border-style: solid;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: solid;
    border-color: black;
    border-width: .1vh;
    box-sizing: border-box;
    &:hover {
        border-style: none;
        border-color: black;
        background-color: black;
        color: white;
        border-color: white;
        border-width: .1vh;
        border-style: solid;
    }
`

const ModalComponentContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
`
export default AddItemModal;