<script>
	import authState from '../stores/authStore';
	import appState, { update } from '../stores/appState';
	import Logo from '../assets/icons/ytLogo.svg';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte';
	import VideoOutline from 'svelte-material-icons/VideoOutline.svelte';
	import BellOutline from 'svelte-material-icons/BellOutline.svelte';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';

	let isUserExpanded = false;

	const handleLogIn = async () => {
		await $authState.signInWithGooglePopup();
		$authState.onAuthStateChangedListener(() => {
			$authState.isLoggedIn = true;
			$appState.isLoggedIn = true;
			update({ ...$appState });
		});
		isUserExpanded = false;
	};

	const handleLogOut = () => {
		$authState.onAuthStateChangedListener(() => {
			$authState.signOutUser();
			$authState.isLoggedIn = false;
			$appState.isLoggedIn = false;
			update({ ...$appState });
		});
		isUserExpanded = false;
	};

	const handleToggleUserExp = () => {
		isUserExpanded = !isUserExpanded;
	};
</script>

<div class="fixed left-0 top-0 flex h-14 w-full items-center justify-between px-4">
	<div class="flex items-center gap-5">
		<Menu size={'1.5em'} class="pointer" />
		<img src={Logo} alt="YouTube Logo" class="mainLogo" />
	</div>

	<div>
		<div class="flex h-10 w-[40rem] overflow-hidden rounded-full border border-gray-200">
			<button class="showOnFocus" />
			<input type="text" class="mx-4 my-2 grow border-none outline-none" placeholder="Cerca" />
			<button class="flex w-16 items-center justify-center border-l border-gray-200 bg-gray-100"
				><Magnify size={'1.5em'} /></button
			>
		</div>
	</div>
	<div>
		{#if !$appState.isLoggedIn}
			<button
				on:click={handleLogIn}
				class="flex items-center gap-1 rounded-full border border-blue-600 px-2 py-1 text-blue-600"
			>
				<AccountCircleOutline size={'1.5em'} color={'rgb(37 99 235)'} />
				Accedi
			</button>
		{:else}
			<div class="flex items-center gap-5">
				<button><VideoOutline size={'1.5em'} /></button>
				<button><BellOutline size={'1.5em'} /></button>
				<button
					class="ml-16 h-9 w-9 rounded-full bg-blue-600 text-xl text-white"
					on:click={handleToggleUserExp}>U</button
				>
			</div>

			{#if isUserExpanded}
				<div class="absolute right-14 top-3 z-40">
					<button
						on:click={handleLogOut}
						class=" flex items-center gap-2 rounded-full border border-red-500 px-2 py-1 font-thin text-red-500"
					>
						<WindowClose size={'1.2em'} color={'rgb(239 68 68)'} />Esci
					</button>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.mainLogo {
		width: 6rem;
	}
</style>
