import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { ModalBodyContainer } from './ModalBodyContainer';
import PlannerItemCard from './PlannerItemCard';
import styled from 'styled-components';

function ModalResults(props) {
  const { results, loading } = useSelector(state => state.search)
  return (
    <ModalBodyContainer>
      {loading && <Spinner />}
      {!loading && results.map((recipe, index) => <PlannerItemCard dateString={props.dateString} render={props.render} recipe={recipe} key={index} />)}
      {!results.length && <Text>NO RESULTS <br/> If you haven't done a search, try searching in the 'RECIPE SEARCH' tab.</Text>}
    </ModalBodyContainer>
  )
}

const Text = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 2vw;
    margin: 1vw;
    font-weight: 200;
`
export default ModalResults