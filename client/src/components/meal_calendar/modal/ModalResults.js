import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { ModalBodyContainer } from './ModalBodyContainer';
import PlannerItemCard from './PlannerItemCard';

function ModalResults() {
  const { results, loading } = useSelector(state => state.search)
  return (
    <ModalBodyContainer>
      {loading && <Spinner />}
      {!loading && results.map((recipe, index) => <PlannerItemCard recipe={recipe} key={index} />)}
    </ModalBodyContainer>
  )
}

export default ModalResults