<script>
	import { page } from '$app/stores';
	export let data;
	import appState from '../../../stores/appState.js';
	import { update } from '../../../stores/appState.js';
	import { browser } from '$app/environment';

	let selectedTab;

	if (browser) {
		const checkTab = () => {
			if (window.location.pathname.includes('community')) selectedTab = 'community';
			else if (window.location.pathname.includes('info')) selectedTab = 'info';
			else selectedTab = 'home';
		};

		checkTab();

		history.pushState = ((f) =>
			function pushState() {
				let ret = f.apply(this, arguments);
				window.dispatchEvent(new Event('pushstate'));
				window.dispatchEvent(new Event('locationchange'));
				return ret;
			})(history.pushState);

		history.replaceState = ((f) =>
			function replaceState() {
				let ret = f.apply(this, arguments);
				window.dispatchEvent(new Event('replacestate'));
				window.dispatchEvent(new Event('locationchange'));
				return ret;
			})(history.replaceState);

		window.addEventListener('popstate', () => {
			window.dispatchEvent(new Event('locationchange'));
		});

		window.addEventListener('locationchange', checkTab);
	}

	const { channels } = data;

	$: channel = channels.find((el) => parseInt(el.id) === parseInt($page.params.id));
	$: loggedOut = !$appState.isLoggedIn;

	const handleSubscribe = (id) => {
		if ($appState.iscrizioni.find((el) => el.id === id)) return;

		$appState.iscrizioni = Array.from(new Set([...$appState.iscrizioni, channel]));
		update({ ...$appState });
		channel.subscribers++;
	};

	const handleTabSelect = (str) => {
		return (selectedTab = str);
	};

	const handleUnsubscribe = (id) => {
		if (!$appState.iscrizioni.find((el) => el.id === id)) return;
		let index = $appState.iscrizioni.findIndex((el) => el.id === id);
		$appState.iscrizioni.splice(index, 1);
		channel.subscribers--;
		$appState.iscrizioni = [...$appState.iscrizioni];
		update({ ...$appState });
	};
</script>

<div class="px-8 py-6">
	<div class="mb-5 flex h-36 items-center gap-10">
		<div
			class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-gray-200"
		>
			<img src={channel.image} alt={channel.username} class="h-32 w-32" />
		</div>
		<div class="mr-80">
			<p class="text-xl font-semibold">{channel.username}</p>
			<p class="text-sm">
				{`@${channel.username} `}
				{` ${channel.subscribers} iscritti `}
				{` ${channel.videos.length} video`}
			</p>
		</div>
		<div class="ml-10">
			{#if $appState.iscrizioni.find((el) => el.id === channel.id) && !loggedOut}
				<button
					class="rounded-full bg-red-500 px-3 py-1 text-white"
					on:click={() => handleUnsubscribe(channel.id)}>Anulla iscrizione</button
				>
			{:else}
				<button
					class="rounded-full bg-black px-3 py-1 text-white"
					on:click={() => handleSubscribe(channel.id)}
					disabled={loggedOut}>Iscrivitti</button
				>
			{/if}
		</div>
	</div>
	<div>
		<div class="flex h-12 border-b border-gray-200">
			<a
				href={`/channel/${channel.id}`}
				class={`w-48 pt-2 text-center text-gray-600 ${
					(selectedTab === 'home' || !selectedTab) && '--selected'
				}`}
				on:click={() => handleTabSelect('home')}>HOME</a
			>
			<a
				href={`/channel/${channel.id}/community`}
				class={`w-48 pt-2 text-center text-gray-600 ${selectedTab === 'community' && '--selected'}`}
				on:click={() => handleTabSelect('community')}>COMMUNITY</a
			>
			<a
				href={`/channel/${channel.id}/info`}
				class={`w-48 pt-2 text-center text-gray-600 ${selectedTab === 'info' && '--selected'}`}
				on:click={() => handleTabSelect('info')}>INFORMATION</a
			>
		</div>
	</div>
	{#key $page.params.id}
		<slot />
	{/key}
</div>

<style>
	.--selected {
		border-bottom: 2px solid grey;
	}
</style>
