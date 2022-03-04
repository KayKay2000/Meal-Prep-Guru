import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { cuisines } from '../data/cuisines';
import axios from 'axios'
const apiKey = "933bd795ebbc44218ff61f94fb6e3575";
const apiKey2 = '2006cf2c3e4c4763861230ad68a14371';

export default function ImageSlider() {

  const [cuisine, setCuisines] = useState([])

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = () => {
    const data = cuisines.map((cuisine) => {
      return axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=${cuisine.cuisine}`)
        .then((res) => {
          return res.data.recipes[0]
        })     
    })
    Promise.all(data).then(cuisines => {
      setCuisines(cuisines)
    })  
  }

  if (!cuisine.length) {
    return null
  }

  console.log(cuisine)

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img className="scroll" src="https://i.ibb.co/7vVYZq3/italian.jpg" alt="italian" border="0" onDragStart={handleDragStart} role="presentation" />,
    <img className="scroll" src="https://i.ibb.co/7vVYZq3/italian.jpg" alt="italian" border="0" onDragStart={handleDragStart} role="presentation" />,
    <img className="scroll" src="https://i.ibb.co/7vVYZq3/italian.jpg" alt="italian" border="0" onDragStart={handleDragStart} role="presentation" />,
    <img className="scroll" src="https://i.ibb.co/7vVYZq3/italian.jpg" alt="italian" border="0" onDragStart={handleDragStart} role="presentation" />,
    <img className="scroll" src="https://i.ibb.co/7vVYZq3/italian.jpg" alt="italian" border="0" onDragStart={handleDragStart} role="presentation" />,
    <img className="scroll" src="https://i.ibb.co/7vVYZq3/italian.jpg" alt="italian" border="0" onDragStart={handleDragStart} role="presentation" />,
  ];

  return (
    <AliceCarousel disableDotsControls mouseTracking items={items} />
  )
}