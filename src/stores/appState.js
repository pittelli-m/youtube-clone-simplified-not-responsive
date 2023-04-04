import { writable, get } from 'svelte/store';

const initialState = {
	iscrizioni: [],
	piaciuti: [],
	commenti: []
};

const isBrowser = typeof window !== 'undefined';

const localState = isBrowser && localStorage.getItem('state');

if (!localState) {
	isBrowser && localStorage.setItem('state', JSON.stringify(initialState));
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
