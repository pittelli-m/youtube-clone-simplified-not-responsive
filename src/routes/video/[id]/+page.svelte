<script>
	import { page } from '$app/stores';
	import Player from '$lib/Player.svelte';
	import appState from '../../../stores/appState';
	import authState from '../../../stores/authStore';
	import { update } from '../../../stores/appState';
	import ThumbUpOutline from 'svelte-material-icons/ThumbUpOutline.svelte';
	import ThumbDownOutline from 'svelte-material-icons/ThumbDownOutline.svelte';
	import ShareOutline from 'svelte-material-icons/ShareOutline.svelte';
	import DownloadOutline from 'svelte-material-icons/DownloadOutline.svelte';
	import DotsHorizontal from 'svelte-material-icons/DotsHorizontal.svelte';
	import VideoAsideRight from '../../../lib/VideoAsideRight.svelte';

	export let data;
	console.log(data);

	$: loggedOut = !$authState.isLoggedIn;

	$: videos = data.videos;
	$: target = videos.find((el) => el.id === $page.params.id);

	const handleSubscribe = (id) => {
		if ($appState.iscrizioni.find((el) => el.id === id)) return;
		$appState.iscrizioni = Array.from(new Set([...$appState.iscrizioni, target.channel]));
		update({ ...$appState });
		target.channel.subscribers++;
	};

	const handleLike = () => {
		if ($appState.piaciuti.find((el) => el.id === target.id)) return;
		$appState.piaciuti = Array.from(new Set([...$appState.piaciuti, target]));
		target.likes++;
		update({ ...$appState });
	};

	const handleDislike = () => {
		if (!$appState.piaciuti.find((el) => el.id === target.id)) return;
		let index = $appState.piaciuti.findIndex((el) => el.id === target.id);
		$appState.piaciuti.splice(index, 1);
		target.likes--;
		update({ ...$appState });
	};
</script>

<div class="ml-2 w-[900px]">
	<Player video={target} />
	<h4 class="my-2 text-xl font-semibold">{target.title}</h4>
	<div class="flex items-center justify-between">
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
				{#if $appState.iscrizioni.find((el) => el.id === target.channel.id) && !loggedOut}
					<a class="py- rounded-full bg-gray-200 px-3" href={`/channel/${target.channel.username}`}
						>Iscritto</a
					>
				{:else}
					<button
						class="rounded-full bg-black px-3 py-1 text-white"
						on:click={() => handleSubscribe(target.channel.id)}
						disabled={loggedOut}>Iscrivitti</button
					>
				{/if}
			</div>
		</div>
		<div class="flex items-center gap-3">
			<div class="flex rounded-full bg-gray-200 px-4 py-2">
				<button
					class="flex items-center gap-2 border-r border-gray-300 pr-2"
					on:click={handleLike}
					disabled={loggedOut}><ThumbUpOutline size={'1.5em'} /> {target.likes}</button
				>
				<button class="pl-2" on:click={handleDislike} disabled={loggedOut}
					><ThumbDownOutline size={'1.5em'} /></button
				>
			</div>
			<button class="flex gap-3 rounded-full bg-gray-200 px-4 py-2"
				><ShareOutline size={'1.5em'} />Condividi</button
			>
			<button class="flex gap-3 rounded-full bg-gray-200 px-4 py-2"
				><DownloadOutline size={'1.5em'} />Scarica</button
			>
			<button class="flex rounded-full bg-gray-200 px-4 py-2"
				><DotsHorizontal size={'1.5em'} /></button
			>
		</div>
	</div>
	<div class="mt-6 h-16 w-full rounded-lg bg-gray-100 p-3">
		<p class="font-semibold">{`${target.views} visualizazioni - ${target.uploaded}`}</p>
		<p class="font-semibold">Mostra altro</p>
	</div>
</div>
<VideoAsideRight video={target} {videos} />
