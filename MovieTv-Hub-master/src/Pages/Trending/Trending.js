import React,{useState,useEffect} from 'react';
import axios from "axios";
import SingleObject from '../../Components/SingleObject/SingleObject.js';
import CustomPagination from '../../Components/Pagination/CustomPagination.js';
import "./Trending.css";
import "../../App.css";

const Trending = () => {
    const [content,setContent]=useState([]);
    const [page,setPage]=useState(1);
    const numOfPages=10;
    const fetchTrending = async () => {
     const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.React_App_API_KEY}&page=${page}`);
    
    // the above line fetches the data from the tmdb api.
    //used to set content as data.results
    setContent(data.results);
    }
    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line 
    }, [page]);

    return (
        <div>
             <span className="pageTitle" style={{fontSize:"150%"}}>Trending Today</span>
             <div className="trending">
                {
                    //checks for content and if content is present then makes a single component for every element in content
                   content && content.map((objContent) => {
                       
                       return <SingleObject key={objContent.id}
                        id={objContent.id}
                        title={objContent.original_title||objContent.name}
                        overview={objContent.overview}
                        date={objContent.release_date||objContent.first_air_date}
                        image={objContent.poster_path}
                        ratings={objContent.vote_average}
                        media_type={objContent.media_type}
                        />
                       
                   })
                }
             </div>
             <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
          
        </div>
    );
}

export default Trending;
