import React,{useState,useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import { img_300, noPicture } from "../../Config/Config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({media_type,id}) => {
    const [credits,setCredits]=useState([]);
   //carousel of images of the cast of movie and their names is shown.
    const items=credits?.map((cred) => {
       return  <div className="carouselItem">
           <img
               src={cred.profile_path?`${img_300}/${cred.profile_path}`:noPicture}
               className="carouselItem_img"
               onDragStart={handleDragStart}
               alt={cred?.name}
           />
           <b className="carouselItem_txt">{cred?.name}</b>
        </div>
    })
    const responsive={
        0:{
            items:3,
        },
        700:{
            items:5,
        },
        1024:{
            items:7,
        },
    }
    const fetchCredits= async () => {
        const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.React_App_API_KEY}&language=en-US`);
        //fetch the data from tmdb api and set it to credits hook.
        setCredits(data.cast);
    }
    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);
  return (
    <AliceCarousel 
    autoPlay
    responsive={responsive}
    infinite
    disableDotsControls
    disableButtonsControls
    mouseTracking items={items} 

    />
  );
}
export default Carousel;
