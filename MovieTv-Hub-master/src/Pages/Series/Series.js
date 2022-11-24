import React,{useState,useEffect} from 'react';
import axios from "axios";
import SingleObject from "../../Components/SingleObject/SingleObject.js";
import CustomPagination from "../../Components/Pagination/CustomPagination.js";
import SearchIcon from "@material-ui/icons/Search";
import Button from '@mui/material/Button';
import { createMuiTheme, ThemeProvider ,Tabs,Tab} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Genres from "../../Components/Genres.js";
import "../../App.css";
import useGenres from "../../Hooks/useGenres.js";

const Series = () => {
    const [content,setContent]=useState([]);
    const [page,setPage]=useState(1);
    const [numOfPages,setNumberOfPages]=useState(1);
    const [selectedGenres,setSelectedGenres]=useState([]);
    const [normalGenres,setNormalGenres]=useState([]);
    const [country,setCountry]=useState("US");
    const genreforUrl=useGenres(selectedGenres);
    const theme = createMuiTheme({
        palette: {
         primary: {
          light: '#757ce8',
          main: '#ffffff',
          dark: '#002884',
          contrastText: '#fff',
                  },
                },
    });
    const fetchSeries= async () => {
        const {data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.React_App_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforUrl}&with_origin_country=${country}`)
        // the above line fetches the data from the tmdb api.
       //used to set content as data.results and numberOfPages as data.total_pages.
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    }
    useEffect(() => {
        fetchSeries();
        // eslint-disable-next-line
    }, [page,genreforUrl])
    return (
        <div >
            <span className="pageTitle" style={{fontSize:"170%"}}>Series</span>
            <ThemeProvider theme={theme}>
           <div style={{display:"flex",
              margin:"15px 0",
           }}>
               <TextField 
               style={{
                flex : "1",
                color : "#fff",
               }}
               className="searchBox"
               label="Enter the 2 letter code of your country ex IN , US , UK" 
               variant="filled"
                onChange={(event) => {
                         setCountry(event.target.value);
                   }}
                   onKeyPress={fetchSeries}
               />
               <Button variant="contained" style={{marginLeft:10, backgroundColor:"#39445a"}} 
               color="primary" onClick={fetchSeries}><SearchIcon/></Button>
            </div>
        </ThemeProvider>
            <Genres
            //genres available for series are dispalyed to the user
                type="tv" 
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                normalGenres={normalGenres}
                setNormalGenres={setNormalGenres}
                setPage={setPage}
            />
            <div className="trending">
                {
                   content && content.map((objContent) => {
                       
                       return <SingleObject key={objContent.id}
                        id={objContent.id}
                        title={objContent.original_title||objContent.name}
                        overview={objContent.overview}
                        date={objContent.release_date||objContent.first_air_date}
                        image={objContent.poster_path}
                        ratings={objContent.vote_average}
                        media_type="tv"
                        />
                       
                   })
                }
             </div>
             {numOfPages>1 && <CustomPagination setPage={setPage} numOfPages={numOfPages}/>}
        </div>
    )
}

export default Series;
