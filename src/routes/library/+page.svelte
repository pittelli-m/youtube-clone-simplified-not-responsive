<script>
	import PlaylistPlay from 'svelte-material-icons/PlaylistPlay.svelte';
	import ThumbUpOutline from 'svelte-material-icons/ThumbUpOutline.svelte';
	import appState from '../../stores/appState';
	import VideoCard from '../../lib/VideoCard.svelte';
</script>

<div class={`${!$appState.isLoggedIn && 'flex h-full w-full items-center justify-start'}`}>
	{#if !$appState.isLoggedIn}
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
				<div class="grid grid-cols-[repeat(3,_360px)] gap-12 overflow-y-auto pr-60 pt-10">
					{#each $appState.piaciuti as liked}
						<VideoCard video={liked} mw={'w-[360px]'} mh={'h-[180px]'} piaciuti={true} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
