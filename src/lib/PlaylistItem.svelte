<script>
	export let video;
	export let draggable;
	export let dragstart;
	export let dragover;
	export let drop;
	export let index;
	export let playing;
</script>

<div
	class={`mb-3 flex items-center gap-1 ${video.id === playing && 'bg-gray-300'}`}
	{draggable}
	on:dragstart={dragstart}
	on:drop={drop}
	on:dragover={dragover}
>
	<p>{index + 1}</p>
	<a class="flex items-center gap-2" href={`/video/${video.id}/list/piaciuti`}>
		<div class="flex min-w-[150px] items-start">
			<img src={video.thumb} alt={video.title} class=" h-[80px] w-[150px] rounded-xl" />
		</div>
		<div class="flex gap-1">
			<div>
				<p class="text-xs font-semibold">{video.title.toUpperCase()}</p>
				<a href={`/channel/${video.channel.id}`} class="text-xs">{video.channel.username}</a>
				<p class="text-xs">{video.views} - {video.uploaded}</p>
			</div>
		</div>
	</a>
</div>
