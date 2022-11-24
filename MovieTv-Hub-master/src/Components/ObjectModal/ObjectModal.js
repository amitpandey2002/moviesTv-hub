import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../Config/Config.js";
import Carousel from "../Carousel/Carousel.js";
import "./ObjectModal.css";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const stylePaper = {
  position: 'absolute',
  width:"90%",
  height:"85%",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor:"#243658",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
    color: "white",
    overlfow: 'scroll'
};
const styleModal={
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
}

export default function ObjectModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchData = async() => {
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.React_App_API_KEY}&language=en-US`);
    //fetch the data from tmdb api and set it in content hook.
    setContent(data);
  }
  const fetchVideo = async () => {
         const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.React_App_API_KEY}&language=en-US`);
         //fetch the data about video of trailers from tmdb api and set it in video hook.
         setVideo(data.results[0]?.key);
     };
   useEffect(() => {
     fetchData();
     fetchVideo();
     // eslint-disable-next-line
   }, [])
   //We create a modal which pops up when user clicks on an element.
  return (
    <>
      <div className="media"
      style={{
        cursor: "pointer",
      }}
      onClick={handleOpen}
      >{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styleModal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
         {content && < Box sx={stylePaper}>
            <div className="ObjectModal" style={{overflow:'scroll',cursor:'pointer'}}>
              <img className="ObjectModal_portrait" 
              src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable} alt={content.name || content.title}/>
              <img className="ObjectModal_landscape"  src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailableLandscape} 
              alt={content.name || content.title}/>
             <div className="ObjectModal_about">
                 <span className="ObjectModal_title">
                    {content.name || content.title }({
                      (content.first_air_date||content.release_date||"....").substring(0,4)
                    })
                 </span>
                 {content.tagline&&<i className="tagline">{content.tagline}</i>}
                 <span className="ObjectModal_description">
                   {(content.overview)&&(content.overview).substring(0,300)+"........"}
                 </span>
                 <div>
                      <Carousel media_type={media_type} id={id}/>
                 </div>
                 <Button
                     variant="contained"
                     startIcon={<YouTubeIcon />}
                     color="secondary"
                     target="__blank"
                     href={`https://www.youtube.com/watch?v=${video}`}
                   >
                     Watch the Trailer
                   </Button>
             </div>
            
            </div>
          </Box>}
        </Fade>
      </Modal>
    </>
  );
}