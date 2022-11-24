import React,{useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { createMuiTheme, ThemeProvider ,Tabs,Tab} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SingleObject from "../../Components/SingleObject/SingleObject.js";
import CustomPagination from "../../Components/Pagination/CustomPagination.js";
import Button from '@mui/material/Button';
import axios from "axios";

const Search = () => {
    const [type,setType]=useState(0);
    const [page,setPage]=useState(1);
    const [searchText,setSearchText]=useState("");
    const [numOfPages, setNumOfPages] = useState(1);
    const [content,setContent]=useState();
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
    
    const fetchSearch= async () => {
        if(searchText.length>0)
        {
            const {data} =await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.React_App_API_KEY}&language=en-US&query=${searchText}&page=${page}`);
            // the above line fetches the data from the tmdb api.
           //used to set content as data.results
            setContent(data.results);
            setNumOfPages(data.total_pages);
        }
    };
    useEffect(() => {
        window.scroll(0,0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type,page]);
    return (
        <div>
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
               label="Search" 
               variant="filled"
                onChange={(event) => {
                         setSearchText(event.target.value);
                   }}
                   onKeyPress={fetchSearch}
               />
               <Button variant="contained" style={{marginLeft:10, backgroundColor:"#39445a"}} 
               color="primary" onClick={fetchSearch}><SearchIcon/></Button>
            </div>
            <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={(event,newValue) => {
                 setType(newValue);
                     setPage(1);
            }}> 
               <Tab style={{width:"50%"}} label="Search Movies"/>
               <Tab style={{width:"50%"}} label="Search Tv Series"/>
            </Tabs>
        </ThemeProvider>
        <div className="trending">
                {
                   content && content.map((objContent) => {
                       //checks for content and if content is present then makes a single component for every element in content
                       return <SingleObject key={objContent.id}
                        id={objContent.id}
                        title={objContent.original_title||objContent.name}
                        overview={objContent.overview}
                        date={objContent.release_date||objContent.first_air_date}
                        image={objContent.poster_path}
                        ratings={objContent.vote_average}
                        media_type={type?"tv":"movie"}
                        />
                       
                   })
                }
                {searchText&&!content&&(type?<h2>No Series Found</h2>:<h2>No Movies found</h2>)}
             </div>
             {numOfPages>1 && <CustomPagination setPage={setPage} numOfPages={numOfPages}/>}
        </div>
    )
}

export default Search;
