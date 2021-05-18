/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useNameExists from '../../hooks/useNameExists';
import { getTypes } from '../../actions/getters.actions';
import { SERVER_URL } from '../../actions/constants.action';
import styles from './styles/AddPokemon.module.css';

function AddPokemon({ history }) {
    const allTypes = useSelector((state) => state.types);

    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        types: null,
        spriteSrc: null,
    });
    const [type, setType] = useState([]);
    const [errorsName, setErrorsName] = useState('');
    const [errorsNumbers, setErrorsNumbers] = useState('');

    useEffect(() => {
        dispatch(getTypes());
        const exists = async () => {
            try {
                const res = await useNameExists(input.name.toLowerCase());
                if (input.name.length !== 0 && res) {
                    setErrorsName('That name already exists.');
                }
            } catch (err) {
                console.error(err);
            }
        };

        exists();
    }, [input.name]);

    const handleChange = (e) => {
        const target = e.target;
        const regexName = /^[A-Za-z]+$/;
        setInput({
            ...input,
            [target.name]: target.value,
        });

        if (!input.name) {
            setErrorsName('Name is required');
        } else if (!regexName.test(input.name)) {
            setErrorsName('Name is invalid.');
        } else {
            setErrorsName(null);
        }

        if (!input.attack) {
            setErrorsNumbers('This attribute is missing.');
        } else if (!Number.isInteger(Number(input.attack))) {
            setErrorsNumbers('Must be a number.');
        } else {
            setErrorsNumbers(null);
        }
    };

    const handleChecked = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        if (checked) {
            setType([...type, parseInt(value)]);
        } else if (!checked) {
            setType(type.filter((el) => el !== parseInt(value)));
        }

        if (type.length >= 2) {
            const newType = [...type];
            document.getElementById(type[0]).checked = false;
            newType.shift();
            setType([...newType, parseInt(value)]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type.length === 1 || type.length === 2) {
            return await axios
                .post(`${SERVER_URL}/pokemons`, {
                    name: input.name,
                    hp: input.hp,
                    attack: input.attack,
                    defense: input.defense,
                    speed: input.speed,
                    height: input.height,
                    weight: input.weight,
                    types: type,
                    spriteSrc: input.spriteSrc || '../../img/missingno.png',
                })
                .then((res) =>
                    res.data.hasOwnProperty('message')
                        ? alert(res.data.message)
                        : history.push(`/home`)
                )
                .catch((err) => console.log(err));
        } else {
            alert('Falta seleccionar tipos o seleccionados de mas.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <section className={styles.inputs}>
                <h3>Properties</h3>
                <label htmlFor='name'>Name</label>
                <input
                    required
                    type='text'
                    name='name'
                    id='name'
                    onChange={handleChange}
                    className={
                        errorsName ? styles.errorName : styles.correctName
                    }
                    placeholder='Name…'
                />
                {errorsName ? (
                    <label htmlFor='name' className={styles.errorMessage}>
                        {errorsName}
                    </label>
                ) : null}

                <label htmlFor='hp'>HP</label>
                <input
                    required
                    id='hp'
                    name='hp'
                    type='number'
                    onChange={handleChange}
                    placeholder='Health Points…'
                />
                <label htmlFor='attack'>Attack</label>
                <input
                    required
                    id='attack'
                    name='attack'
                    type='number'
                    onChange={handleChange}
                    className={
                        errorsNumbers
                            ? styles.errorNumbers
                            : styles.correctNumber
                    }
                    placeholder='Attack…'
                />
                {errorsNumbers ? (
                    <label htmlFor='name' className={styles.errorMessage}>
                        {errorsNumbers}
                    </label>
                ) : null}
                <label htmlFor='defense'>Defense</label>
                <input
                    required
                    id='defense'
                    name='defense'
                    type='number'
                    onChange={handleChange}
                    placeholder='Defense…'
                />
                <label htmlFor='speed'>Speed</label>
                <input
                    required
                    name='speed'
                    id='speed'
                    type='number'
                    onChange={handleChange}
                    placeholder='Speed…'
                />
                <label htmlFor='weight'>Weight (Kg)</label>
                <input
                    required
                    id='weight'
                    name='weight'
                    type='number'
                    onChange={handleChange}
                    placeholder='Weight…'
                />
                <label htmlFor='height'>Height (cm)</label>
                <input
                    required
                    name='height'
                    id='height'
                    type='number'
                    onChange={handleChange}
                    placeholder='Height…'
                />
                <label htmlFor='spriteSrc'>Image Link</label>
                <input
                    type='text'
                    name='spriteSrc'
                    id='link'
                    className={styles.inputLink}
                    onChange={handleChange}
                    placeholder='Image link…'
                />
            </section>
            <input
                className={styles.submit}
                disabled={
                    errorsName ||
                    errorsNumbers ||
                    type.length < 1 ||
                    type.length > 2
                        ? true
                        : false
                }
                type='submit'
                value='Add Pokemon'
            />
            <section className={styles.typesContainer}>
                <h4>Types</h4>
                {allTypes.map((eachType) => (
                    <label className={styles.label} key={`type-${eachType.id}`}>
                        <input
                            className={styles.checkbox}
                            type='checkbox'
                            id={eachType.id}
                            value={eachType.id}
                            onChange={handleChecked}
                        />
                        <img
                            src={`../../img/types/${eachType.name}.png`}
                            alt={`${eachType.name} icon.`}
                        />
                    </label>
                ))}
            </section>
        </form>
    );
}

export default AddPokemon;
