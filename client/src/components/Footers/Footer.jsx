import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/Footer.module.css';

function Footer({ history }) {
    const aboutMeLocation = history.location.pathname === '/aboutme';
    const addLocation = history.location.pathname === '/home/add';
    return (
        <footer
            className={
                aboutMeLocation || addLocation
                    ? styles.footerSimple
                    : styles.footer
            }
        >
            <img
                src='../..//img/footer.gif'
                alt='Pokemon sprite GIF'
                width='40px'
                height='40px'
            />
            <h4>Individual Project - HENRY 💛</h4>
            <NavLink to='/aboutme'>
                <h4>ABOUT ME</h4>
            </NavLink>
        </footer>
    );
}

export default Footer;
