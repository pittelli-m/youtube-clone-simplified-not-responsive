<script>
	export let video;
	export let mw;
	export let mh;
</script>

<a class={`relative mb-8 flex flex-col items-start`} href={`/video/${video.id}`}>
	<img
		src={video.thumb}
		alt={video.title}
		class={`${mw} ${mh} rounded-xl transition-all duration-300 hover:rounded-none`}
	/>
	<div class="mt-3 flex gap-4">
		<a
			class="flex h-12 w-12 items-center justify-center rounded-full"
			href={`channel/${video.channel.username}`}
		>
			<img src={video.channel.image} alt="channel pfp" class="icon" />
		</a>
		<div>
			<p class="w-${mw} font-semibold">{video.title}</p>
			<a href={`channel/${video.channel.username}`}>{video.channel.username}</a>
			<p>{video.views} - {video.uploaded}</p>
		</div>
	</div>
</a>

<style>
	.icon {
		height: 2em;
		width: 2em;
	}
</style>
