<script>
	export let video;
	export let mw;
	export let mh;
</script>

<a class={`relative mb-8 flex flex-col items-start`} href={`/video/${video.id}`}>
	<img
		src={video.thumb}
		alt={video.title}
		class={`${mw} ${mh} rounded-xl transition-all hover:rounded-none`}
	/>
	<p class="w-${mw}">{video.title}</p>
	<p>{video.views} - {video.uploaded}</p>
</a>

<style></style>
