<script>
	import VideoCard from '../lib/VideoCard.svelte';

	export let data;
	const { videos, channels } = data;
	let button = 'cursor-pointer rounded-lg bg-gray-100 px-3 py-1 hover:bg-gray-200';
</script>

<div class="px-2">
	<div class="categories flex h-14 items-center gap-4">
		<p class="cursor-pointer rounded-lg bg-black px-3 py-1 text-white">Tutti</p>
		<p class={button}>Dal vivo</p>
		<p class={button}>Musica</p>
		<p class={button}>Destinazioni turistiche</p>
		<p class={button}>Giochi</p>
		<p class={button}>Sitcom</p>
		<p class={button}>Animazione</p>
		<p class={button}>Natura</p>
		<p class={button}>Calcio</p>
		<p class={button}>Cucina</p>
		<p class={button}>Caricamenti Recenti</p>
	</div>
	<div
		class="videoList grid h-[80vh] grid-cols-[repeat(3,_360px)] gap-12 overflow-y-auto pr-60 pt-10"
	>
		{#each videos as video}
			<VideoCard {video} mw={'w-[360px]'} mh={'h-[180px]'} />
		{/each}
	</div>
</div>

<style>
</style>
