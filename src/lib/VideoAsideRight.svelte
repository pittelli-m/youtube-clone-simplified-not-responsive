<script>
	export let videos;
	export let video;
	const filteredVideos = videos.filter((el) => el.id !== video);
</script>

<div
	class="aside--right absolute left-[920px] top-0 flex h-full w-[360px] flex-col gap-2 overflow-auto"
>
	<div class="flex gap-8">
		<button class="rounded-lg bg-black px-2 py-1 text-white">Tutti</button>
		<button class="rounded-lg bg-gray-200 px-2 py-1"> Di {video.channel.username}</button>
		<button class="rounded-lg bg-gray-200 px-2 py-1"> Video correlati</button>
	</div>
	<div class="flex flex-col gap-2">
		{#each filteredVideos as preview}
			<a class="flex items-center gap-2" href={`/video/${preview.id}`}>
				<div class="flex min-w-[150px] items-start">
					<img src={preview.thumb} alt={preview.title} class=" h-[80px] w-[150px] rounded-xl" />
				</div>
				<div class="flex gap-1">
					<div>
						<p class="text-xs font-semibold">{preview.title.toUpperCase()}</p>
						<a href={`/channel/${preview.channel.id}`} class="text-xs">{preview.channel.username}</a
						>
						<p class="text-xs">{preview.views} - {preview.uploaded}</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.aside--right:hover::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.45);
	}
	.aside--right::-webkit-scrollbar {
		width: 0.5rem;
	}
	.aside--right::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 1rem;
	}
	.aside--right::-webkit-scrollbar-track-piece {
		background: transparent;
	}
	.aside--right::-webkit-scrollbar-thumb {
		background: transparent;
		border-radius: 0.3rem;
	}
</style>
