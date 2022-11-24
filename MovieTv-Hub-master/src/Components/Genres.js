import React,{useEffect,useState} from 'react';
import { Chip } from "@material-ui/core";
import axios from "axios";

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    normalGenres,
    setNormalGenres,
    setPage,
}) => {
    const [content,setContent]=useState([]);
     const fetchGenres = async () => {
         const { data } =await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.React_App_API_KEY}&language=en-US`);
         setNormalGenres(data.genres);
         //data stores the results we get from api call and sets data.genres in normalGenres hook.
        }
        useEffect(() => {
            fetchGenres();
            return () => {
                setNormalGenres([]);
            }
            // eslint-disable-next-line
        }, [])
        //hanleAdd method is called when we select a genre and add it to selectedGenres hook.
        function handleAdd(genre)
        {
            setSelectedGenres([...selectedGenres,genre]);
            setNormalGenres(normalGenres.filter((genreName) => {
                return genreName.id!==genre.id;
            }));
            setPage(1);
        }
        //hanleRemove method is called when we select a genre and want to remove it from selectedGenres hook.
        function handleRemove(genre)
        {
            setSelectedGenres(selectedGenres.filter((genreName) => {
                return genreName.id!==genre.id;
            }));
            setNormalGenres([...normalGenres,genre]);
            setPage(1);
        }
    return (
        <div styles={{
            padding : "6px 0",
        }}>
        {selectedGenres && selectedGenres.map((genre) => {
            //checks selectedGenres and if elements are present then Chip for every genre is created and allows us to remove genres .
            return <Chip key={genre.id} 
            label={genre.name} 
            style={{ margin : "2px", fontFamily:"bold",fontSize:"15px"}}
             clickable 
             size="small"
             color="primary"
             onDelete={() => {handleRemove(genre)}}
              />
        })}
        {normalGenres && normalGenres.map((genre) => {
            //checks normalGenre and if elements are present then Chip for every genre is created and allows us to select a genre
            return <Chip key={genre.id} 
            label={genre.name} 
            style={{ margin : "2px",fontFamily:"bold",fontSize:"15px" }}
             clickable 
             size="small"
             onClick={() => {handleAdd(genre)}} />
        })}
            
        </div>
    )
}

export default Genres;
