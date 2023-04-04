<script>
	import { page } from '$app/stores';
	import Player from '$lib/Player.svelte';
	export let data;
	const { videos } = data;

	const target = videos.find((el) => el.id === $page.params.id);
</script>

<div class="ml-2">
	<Player video={target} />
	<h4 class="my-5 text-xl font-semibold">{target.title}</h4>
	<div class="flex items-center gap-5">
		<div
			class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gray-200"
		>
			<a href={`/channel/${target.channel.username}`}>
				<img src={target.channel.image} alt={target.channel.username} class="h-16 w-16" />
			</a>
		</div>
		<div>
			<a href={`/channel/${target.channel.username}`} class=" font-semibold"
				>{target.channel.username}</a
			>
			<p class="text-xs text-gray-500">{`${target.channel.subscribers} iscritti`}</p>
		</div>
		<div>
			<button class="rounded-full bg-black px-3 py-1 text-white">Iscrivitti</button>
		</div>
	</div>
</div>
