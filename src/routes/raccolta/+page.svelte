<script>
	import PlaylistPlay from 'svelte-material-icons/PlaylistPlay.svelte';
	import ThumbUpOutline from 'svelte-material-icons/ThumbUpOutline.svelte';
	import appState from '../../stores/appState';
	import VideoCard from '../../lib/VideoCard.svelte';
	import authState from '../../stores/authStore';
</script>

<div class={`${!$authState.isLoggedIn && 'flex h-full w-full items-center justify-start'}`}>
	{#if !$authState.isLoggedIn}
		<div class="ml-80 flex flex-col items-center">
			<div>
				<PlaylistPlay size={'10em'} />
			</div>
			<h2>Goditi i tuoi video preferiti</h2>
			<p>Effettua l'accesso per guardare i video che ti sono piaciuti o che hai salvato</p>
		</div>
	{:else}
		<h2 class="flex items-center gap-4 font-semibold"><PlaylistPlay size={'2em'} />Playlist</h2>
		<p class=" ml-4 flex items-center gap-2">
			<ThumbUpOutline size={'1.2em'} /> Video Piaciuti
		</p>
		<div class="ml-4">
			{#if $appState.piaciuti}
				{#each $appState.piaciuti as liked}
					<VideoCard video={liked} />
				{/each}
			{/if}
		</div>
	{/if}
</div>
