import React, { useEffect, useState } from 'react'
import { Center, Grid, GridItem } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/reducers/searchReducer';
import SearchForm from '../components/SearchForm';
import RecipeResults from '../components/RecipeResults';

export default function Recipes() {
  const dispatch = useDispatch()
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 840;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);


    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    dispatch(setSearch(""))
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
            <GridItem rowSpan={1} colSpan={1} bg='rgb(38, 45, 51)'><SearchForm /></GridItem>
            <GridItem colSpan={2} bg='rgb(38, 45, 51)'><br />
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
          <GridItem rowSpan={1} colSpan={3} bg='rgb(38, 45, 51)'><SearchForm /></GridItem>
          <GridItem colSpan={3} bg='rgb(38, 45, 51)'><br /><Center p={10}>
          </Center><br /><RecipeResults /></GridItem>
        </Grid>
      )}
    </div>
  );
}
