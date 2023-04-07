import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialState = {
	iscrizioni: [],
	piaciuti: [],
	commenti: [],
	isLoggedIn: false
};

const localState = browser && localStorage.getItem('state');

if (!localState) {
	browser && localStorage.setItem('state', JSON.stringify(initialState));
}

const state = localState ? await JSON.parse(localState) : initialState;

const stored = writable(state);

const appState = writable(state);

export const update = (state) => {
	const updatedState = state;
	stored.update(() => updatedState);
	localStorage.setItem('state', JSON.stringify(updatedState));
};

export default appState;
