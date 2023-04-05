<script>
	import { page } from '$app/stores';
	import VideoCard from '../../../lib/VideoCard.svelte';
	export let data;
	const { channels } = data;

	let channel = channels.find((el) => el.username === $page.params.id);

	const videos = channel.videos;
</script>

<div>
	<div class="grid grid-cols-[repeat(3,_240px)] gap-20 overflow-y-auto pr-60 pt-10">
		{#each videos as video}
			<VideoCard {video} mw={'w-[240px]'} mh={'h-[120px]'} />
		{/each}
	</div>
</div>
