<script>
	import VideoAsideRight from '../../../lib/VideoAsideRight.svelte';
	import { page } from '$app/stores';

	export let data;

	let { videos } = data;
	let video = videos.find((el) => el.id === $page.params.id);
	console.log(videos, $page.params.id, video);
</script>

<VideoAsideRight {videos} {video} />
