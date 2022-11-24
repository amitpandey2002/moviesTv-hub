import React from 'react';
import {img_300,unavailable} from '../../Config/Config.js';
import "./SingleObject.css";
import { Badge } from "@material-ui/core";
import  ObjectModal  from "../ObjectModal/ObjectModal.js";

function SingleObject(props) {
    const {id,title,date,image,ratings,media_type}=props;
    return (
        // creates a single modal of the movie or series with its rating,poster,title,media type and release date
        <ObjectModal media_type={media_type} id={id}>
            <Badge badgeContent={ratings} color={ratings>6?"primary":"secondary"}/>
            <img className="poster" src={image ? `${img_300}/${image}`: unavailable} alt={title}/>
            <b className="title">{title}</b>
            <span className="subtitle">
                {media_type==="movie"? "movie":"tv"}
                <span className="subtitle">
                    {date}
               </span>
            </span>
        </ObjectModal>
    )
}
export default SingleObject;

