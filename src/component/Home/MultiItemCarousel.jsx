import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { TopMeel } from './TopMeel';
import CarouselItem from './CarouselItem';

const MultiItemCarousel = () => {
    const setting ={
        dots : true,
        infinite: true,
        speed : 500,
        slidesToShow : 5,
        slidesToScroll : 1,
        autoplay: true,
        autoplaySpeed :2000,
        arrows :false,

    }
  return (
    <div>
        <Slider {...setting} >
            {TopMeel.map((item)=>(<CarouselItem 
            image={item.image} 
            title={item.title}
            
            />))}
        </Slider>
    </div>
  )
}

export default MultiItemCarousel