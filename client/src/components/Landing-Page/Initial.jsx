import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/Initial.module.css';

function Initial() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.pContainer}>
                    <h3>Individual Project - Pokemon</h3>
                </div>
                <div className={styles.buttonContainer}>
                    <NavLink to='/home'>
                        <button className={styles.button}>HOME</button>
                    </NavLink>
                </div>
            </header>
            <section className={styles.section}>
                <article id='aboutPokemon' className={styles.articleToRight}>
                    <p>
                        Pokémon are creatures of all shapes and sizes who live
                        in the wild or alongside humans. For the most part,
                        Pokémon do not speak except to utter their names.
                    </p>
                    <img
                        src='./img/starterPokemons.png'
                        alt='Starters pokemons.'
                    />
                </article>
                <article id='aboutTypes' className={styles.articleToLeft}>
                    <p>
                        Types refer to different elemental properties associated
                        with both Pokémon and their moves. <br /> There are 18
                        total official types of Pokémon.
                    </p>
                    <img
                        src='./img/pokemonTypes.png'
                        alt='Types of pokemons.'
                    />
                </article>
                <article id='aboutProject' className={styles.articleToRight}>
                    <p>
                        This project is part of Henry Labs where we integrate
                        all the knowledge acquired in the bootcamp. Technologies
                        used: <br /> React.
                        <br /> Redux.
                        <br /> Express.
                        <br /> NodeJS.
                        <br /> Sequelize
                        <br /> PostgreSQL.
                    </p>
                    <img src='./img/pokemon.png' alt='Pokemon logo.' />
                </article>
            </section>
        </div>
    );
}

export default Initial;
