<script>
	import authState from '../../stores/authStore';
	import appState from '../../stores/appState';
	import YoutubeSubscription from 'svelte-material-icons/YoutubeSubscription.svelte';
	import ChannelCard from '../../lib/ChannelCard.svelte';
</script>

<div class="flex h-full w-full items-center justify-start">
	{#if !$authState.isLoggedIn}
		<div class="ml-80 flex flex-col items-center">
			<div>
				<YoutubeSubscription size={'10em'} />
			</div>
			<h2>Non perderti i nuovi video</h2>
			<p>Accedi per vedere gli aggiornamenti dei tuoi canali preferiti di YouTube</p>
		</div>
	{:else if $appState?.iscrizioni?.length > 0}
		{#each $appState.iscrizioni as channel}
			<ChannelCard {channel} />
		{/each}
	{:else}
		<div class="ml-80 flex flex-col items-center">
			<div>
				<YoutubeSubscription size={'10em'} />
			</div>
			<h2>Non perderti i nuovi video</h2>
			<p>Aggiugi canali per vedere gli aggiornamenti</p>
		</div>
	{/if}
</div>
