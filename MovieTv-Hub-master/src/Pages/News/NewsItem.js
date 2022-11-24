import React from 'react';
import "./NewsItem.css";
import {unavailable} from '../../Config/Config.js';

 const NewsItem = (props) => {
  return (
    <div className="media" onClick={()=> window.open(props.url, "_blank")}>
        <img
          className="poster"
          style={{height:'250px'}}
          src={props.image ? props.image: unavailable}
          alt="imageicon"
        />
    <div className="title">{props.title.substring(0,100)+"..."}</div>
    <span className="subtitle">
                {props.author?props.author:"No Author"}
                <span className="subtitle">
                    {props.date.substring(0,10)}
               </span>
            </span>
      
    </div>
  )
}
export default NewsItem;