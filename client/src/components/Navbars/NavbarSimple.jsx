import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/NavbarSimple.module.css';

function NavbarSimple() {
    return (
        <nav className={styles.navbar}>
            <Link to='/home'>
                <img
                    className={styles.mainIcon}
                    src='../../img/main.png'
                    alt='Page icon.'
                />
            </Link>
        </nav>
    );
}

export default NavbarSimple;
