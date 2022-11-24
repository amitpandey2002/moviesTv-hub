import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import "./MainNav.css";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from '@material-ui/icons/Search';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const useStyles = makeStyles({
    root: {
      width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
    },
    selected: {
      color: "red"
   }
  });

export default function SimpleBottomNavigation() {
    const classes=useStyles();
  const [value, setValue] = React.useState(0);
   const history= useNavigate ();
  //use effect changes the history according to the icons selected in bottom navigation bar.
  useEffect(() => {
    if(value===0)
    {
      history("/");
    }
    else if(value===1){
      history("/movies");
    }
    else if(value===2){
      history("/series");
    }
    else if(value===3){
      history("/search");
    }
    else if(value===4){
      history("/news");
    }
    
  }, [value,history])

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        className={classes.root}
        style={{backgroundColor:"#2a416d"}}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
      <BottomNavigationAction
         label="Trending"  style={value===0?{ color: "#f50057" }:{color:"white"}} icon={<WhatshotIcon/>} />
      <BottomNavigationAction  style={value===1?{ color: "#f50057" }:{color:"white"}} label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction   style={value===2?{ color: "#f50057" }:{color:"white"}} label="Series" icon={<LiveTvIcon />} />
      <BottomNavigationAction  style={value===3?{ color: "#f50057" }:{color:"white"}} label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction  style={value===4?{ color: "#f50057" }:{color:"white"}} label="News" icon={<NewspaperIcon />} />
      </BottomNavigation>
    </Box>
  );
}
