<script>
	import authState from '../../stores/authStore';
	import appState from '../../stores/appState';
	import YoutubeSubscription from 'svelte-material-icons/YoutubeSubscription.svelte';
	import ChannelCard from '../../lib/ChannelCard.svelte';
</script>

<div class="p-5">
	{#if !$authState.isLoggedIn}
		<div class="ml-[-400px] mt-36 flex flex-col items-center">
			<div>
				<YoutubeSubscription size={'10em'} />
			</div>
			<h2>Non perderti i nuovi video</h2>
			<p>Accedi per vedere gli aggiornamenti dei tuoi canali preferiti di YouTube</p>
		</div>
	{:else if $appState?.iscrizioni?.length > 0}
		<div>
			<h2 class="mb-6 flex items-center gap-3 text-lg font-semibold">
				<YoutubeSubscription size={'1.5em'} />Iscrizioni
			</h2>
			<div class="flex gap-20 p-5">
				{#each $appState.iscrizioni as channel}
					<ChannelCard {channel} />
				{/each}
			</div>
		</div>
	{:else}
		<div class="ml-[-400px] mt-36 flex flex-col items-center">
			<div>
				<YoutubeSubscription size={'10em'} />
			</div>
			<h2>Non perderti i nuovi video</h2>
			<p>Aggiugi canali per vedere gli aggiornamenti</p>
		</div>
	{/if}
</div>
