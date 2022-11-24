
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Components/Header/Header.js';
import SimpleBottomNavigation from './Components/MainNav.js';
import { Container } from "@material-ui/core";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import News from "./Pages/News/News";

function App() {
  return (
    // <div className="app"></div>
    <BrowserRouter>
      <Header></Header>
      <div className="app">
        <Container>
           <Routes>
            <Route  path="/" element={<Trending/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/news" element={<News/>} />
           </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation/>
      </BrowserRouter>
    // </div>
  );
}

export default App;
