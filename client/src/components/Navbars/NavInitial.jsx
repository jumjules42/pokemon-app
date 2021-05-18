import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/NavInitial.module.css';

function NavInitial() {
    return (
        <nav className={styles.navbar}>
            <a href='#top'>
                <img src='./img/main.png' alt='Page icon.' />
            </a>
            <a href='#aboutPokemon'>
                <button className={styles.button}>About Pokemon</button>
            </a>
            <a href='#aboutTypes'>
                <button className={styles.button}>About Pokemon's Types</button>
            </a>
            <a href='#aboutProject'>
                <button className={styles.button}>About This Project</button>
            </a>
            <NavLink to='/home' className={styles.navlink}>
                <button className={styles.button}>Home</button>
            </NavLink>
        </nav>
    );
}

export default NavInitial;
