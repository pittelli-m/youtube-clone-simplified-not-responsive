<script>
	import authState from '../stores/authStore';
	import Logo from '../assets/icons/ytLogo.svg';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte';

	let isUserExpanded = false;
	const handleLogInOut = async () => {
		if (!$authState.isLoggedIn) {
			await $authState.signInWithGooglePopup();
			$authState.onAuthStateChangedListener(() => {
				$authState.isLoggedIn = true;
			});
		} else
			$authState.onAuthStateChangedListener(() => {
				$authState.signOutUser();
				$authState.isLoggedIn = false;
			});
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
		{#if !$authState.isLoggedIn}
			<button
				on:click={handleLogInOut}
				class="flex items-center gap-1 rounded-full border border-blue-600 px-2 py-1 text-blue-600"
			>
				<AccountCircleOutline size={'1.5em'} color={'rgb(37 99 235)'} />
				Accedi
			</button>
		{:else}
			<button
				class="static"
				on:click={(() => {
					isUserExpanded = true;
				})()}>U</button
			>
			{#if isUserExpanded}
				<div class="absolute right-0 top-0 h-20 w-24">
					<button on:click={handleLogInOut}>Esci</button>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.mainLogo {
		width: 6rem;
	}
	.pointer {
		cursor: pointer;
	}
</style>
