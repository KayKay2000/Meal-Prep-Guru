import React, { useEffect, useState } from 'react'
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import SearchForm from '../components/SearchForm'
import RecipeResults from '../components/RecipeResults'
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/reducers/searchReducer';

export default function Vegetarian() {
  const dispatch = useDispatch()
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 840;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);


    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    dispatch(setSearch('diet', "vegetarian"))
  }, [dispatch])

  return (
    <div style={{ backgroundColor: 'rgb(38, 45, 51)' }}>
      {width > breakPoint ? (
        <div className='background'>
          <Grid
            h='200px'
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(3, 1fr)'

          >
            <GridItem rowSpan={1} colSpan={1} bg='rgb(38, 45, 51)'><SearchForm hideDiet /></GridItem>
            <GridItem colSpan={2} bg='rgb(38, 45, 51)'>
              <br />
              <Heading as='h2' size='xl' className='logo' pt='10' color='white' alignContent='center' paddingBottom={10} paddingLeft={4}>Vegetarian Recipes</Heading>
              <br /><RecipeResults /></GridItem>
          </Grid>
        </div>
      ) : (
        <Grid
          h='200px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={3} bg='rgb(38, 45, 51)'><SearchForm hideDiet /></GridItem>
          <GridItem colSpan={3} bg='rgb(38, 45, 51)'>
            <br />
            <Heading as='h2' size='xl' className='logo' pt='10' color='white' alignContent='center' paddingBottom={10} paddingLeft={4}>Vegetarian Recipes</Heading>
            <br />
            <RecipeResults />
          </GridItem>
        </Grid>
      )}
    </div>
  );
}
