import React from 'react'
import {Grid, GridItem} from '@chakra-ui/react';
import SearchForm from '../components/SearchForm'
import RecipeResults from '../components/RecipeResults'

export default function Breakfast() {
  return (
    <div><Grid
    h='200px'
    templateRows='repeat(1, 1fr)'
    templateColumns='repeat(3, 1fr)'
    gap={4}
  >
    <GridItem rowSpan={1} colSpan={1} bg='tomato'><SearchForm /></GridItem>
    <GridItem colSpan={2} bg='papayawhip'><RecipeResults /></GridItem>

  </Grid></div>
  )
}
