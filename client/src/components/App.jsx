import React from 'react';
import { Route } from 'react-router-dom';
import Initial from './Landing-Page/Initial';
import Footer from './Footers/Footer';
import NavInitial from './Navbars/NavInitial';
import Navbar from './Navbars/Navbar';
import NavbarSimple from './Navbars/NavbarSimple';
import Home from './Home/Home';
import PokemonDetails from './Pokemon-Details/PokemonDetails';
import Spinner from './Spinner/Spinner';
import AddPokemon from './Add-Pokemon/AddPokemon';
import AboutMe from './Landing-Page/AboutMe';

function App() {
    return (
        <React.Fragment>
            <Route exact path='/' component={NavInitial} />
            <Route exact path='/home' component={Navbar} />
            <Route path='/pokemon' component={Navbar} />
            <Route exact path='/home/add' component={NavbarSimple} />
            <Route path='/aboutme' component={NavbarSimple} />
            <Route path='/aboutme' component={AboutMe} />
            <Route exact path='/' component={Initial} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/pokemon/:id' component={PokemonDetails} />
            <Route path='/home/add' component={AddPokemon} />
            <Route exact path='/spinner' component={Spinner} />
            <Route path='/' component={Footer} />
        </React.Fragment>
    );
}

export default App;
