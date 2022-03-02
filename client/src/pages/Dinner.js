import React from 'react'
import {Grid, GridItem} from '@chakra-ui/react';

export default function Dinner() {
  return (
    <div><Grid
    h='200px'
    templateRows='repeat(1, 1fr)'
    templateColumns='repeat(3, 1fr)'
    gap={4}
  >
    <GridItem rowSpan={1} colSpan={1} bg='tomato' />
    <GridItem colSpan={2} bg='papayawhip' />
Dinner
  </Grid></div>
  )
}
