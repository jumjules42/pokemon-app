import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './components/App';
import AddPokemon from './components/Add-Pokemon/AddPokemon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

let container;
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, setState]);

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddPokemon />
                </BrowserRouter>
            </Provider>,
            container
        );
    });
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('App component', () => {
    it('should can render', () => {
        const addPokemon = container.childNodes[0];
        expect(addPokemon.className).toBe('formContainer');
    });
    it('should state change when input change', () => {
        const addPokemon = container.childNodes[0];
        const inputName = addPokemon.childNodes[0].childNodes[2];
        inputName.value = 'newpokemon';
        const newPokemon = {
            name: 'newpokemon',
            attack: 102,
            defense: 100,
            speed: null,
            height: null,
            weight: null,
            types: null,
            spriteSrc: null,
        };

        console.log(inputName.value);
        console.log(setState);
    });
});
