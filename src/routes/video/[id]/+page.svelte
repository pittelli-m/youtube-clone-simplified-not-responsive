<script>
	import { page } from '$app/stores';
	import Player from "$lib/Player.svelte"
	export let data;
	const { videos } = data;

	const target = videos.find((el) => el.id === $page.params.id);
</script>
<div>
	<Player video={target}/>
	<h4>{target.title}</h4>
</div>


