import React, {useEffect, useState} from 'react'
import {Center, Grid, GridItem} from '@chakra-ui/react';
import SearchForm from '../components/SearchForm'
import RecipeResults from '../components/RecipeResults'
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/reducers/searchReducer';

export default function Breakfast() {
  const dispatch = useDispatch()
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 840;

  useEffect(() => {
   const handleWindowResize = () => setWidth(window.innerWidth);
   window.addEventListener("resize", handleWindowResize);

    
   return () => window.removeEventListener("resize", handleWindowResize);
  },[]);

  useEffect(() => {
    dispatch(setSearch('mealType',"breakfast"))
  }, [dispatch])

  return (
    <div>
      {width > breakPoint? (
            <div>
      <Grid
    h='200px'
    templateRows='repeat(1, 1fr)'
    templateColumns='repeat(3, 1fr)'
    gap={4}
  >
    <GridItem rowSpan={1} colSpan={1} bg='tomato'><SearchForm hideMealType/></GridItem>
    <GridItem colSpan={2} bg='papayawhip'><br /><Center p={10}>
    <img src='https://see.fontimg.com/api/renderfont4/ALEmp/eyJyIjoiZnMiLCJoIjo1NiwidyI6MTI1MCwiZnMiOjQ1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/YnJlYWtmYXN0/mandhor.png' alt='breakfast'/>
  </Center><br /><RecipeResults /></GridItem>
  </Grid>
  </div>
      ) : (
        <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(3, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={3} bg='tomato'><SearchForm hideMealType/></GridItem>
        <GridItem colSpan={3} bg='papayawhip'><br /><Center p={10}>
        <img src='https://see.fontimg.com/api/renderfont4/ALEmp/eyJyIjoiZnMiLCJoIjo1NiwidyI6MTI1MCwiZnMiOjQ1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/YnJlYWtmYXN0/mandhor.png' alt='breakfast'/>
      </Center><br /><RecipeResults /></GridItem>
      </Grid>
      )}
    </div>
  );
}
