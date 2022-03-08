import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function PlannerFavorites() {
    const favorites = useSelector((state) => state.favorites)
    return (
    <ModalBodyContainer>
        Favs
    </ModalBodyContainer>
  )
}

const ModalBodyContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`



export default PlannerFavorites