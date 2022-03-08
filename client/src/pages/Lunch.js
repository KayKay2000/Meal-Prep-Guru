import React, { useEffect, useState } from 'react'
import { Center, Grid, GridItem, Heading } from '@chakra-ui/react';
import SearchForm from '../components/SearchForm';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/reducers/searchReducer';
import RecipeResults from '../components/RecipeResults';

export default function Lunch() {
  const dispatch = useDispatch()
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 840;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);


    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    dispatch(setSearch('mealType', "lunch"))
  }, [dispatch])

  return (
    <div className='background'>
      {width > breakPoint ? (
        <div>
          <Grid
            h='200px'
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(3, 1fr)'
          >
            <GridItem rowSpan={1} colSpan={1} bg='rgb(38, 45, 51)'><SearchForm hideMealType /></GridItem>
            <GridItem colSpan={2} bg='rgb(38, 45, 51)'><br />
              <Heading as='h2' size='xl' className='logo' pt='10' color='white' alignContent='center' paddingBottom={10} paddingLeft={4}>Lunch</Heading>
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
          <GridItem rowSpan={1} colSpan={3} bg='rgb(38, 45, 51)'><SearchForm hideMealType /></GridItem>
          <GridItem colSpan={3} bg='rgb(38, 45, 51)'><br /><Center p={10}>
            <Heading as='h2' size='xl' className='logo' pt='10' color='white' alignContent='center' paddingBottom={10} paddingLeft={4}>Lunch</Heading>
          </Center><br /><RecipeResults /></GridItem>
        </Grid>
      )}
    </div>
  );
}
