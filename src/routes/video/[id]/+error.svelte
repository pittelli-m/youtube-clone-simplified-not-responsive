<script>
	import { page } from '$app/stores';
	import Player from '$lib/Player.svelte';
	import appState from '../../../stores/appState';
	import ThumbUpOutline from 'svelte-material-icons/ThumbUpOutline.svelte';
	import ThumbDownOutline from 'svelte-material-icons/ThumbDownOutline.svelte';
	import ShareOutline from 'svelte-material-icons/ShareOutline.svelte';
	import DownloadOutline from 'svelte-material-icons/DownloadOutline.svelte';
	import DotsHorizontal from 'svelte-material-icons/DotsHorizontal.svelte';

	export let data;

	$: userComments = $appState.commenti.filter((el) => el.videoID === $page.params.id);

	$: comments = [...userComments];

	let comment;

	$: loggedOut = !$appState.isLoggedIn;

	$: videos = data.videos;
	$: target = videos.find((el) => el.id === $page.params.id);
</script>

<div class="anchor ml-2 w-[900px]">
	{#key target}
		<Player video={target} />
	{/key}
	<h4 class="my-2 text-xl font-semibold">{target.title}</h4>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-5">
			<div
				class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gray-200"
			>
				<a href={`/channel/${target.channel.id}`}>
					<img src={target.channel.image} alt={target.channel.username} class="h-16 w-16" />
				</a>
			</div>
			<div>
				<a href={`/channel/${target.channel.id}`} class=" font-semibold"
					>{target.channel.username}</a
				>
				<p class="text-xs text-gray-500">{`${target.channel.subscribers} iscritti`}</p>
			</div>
			<div>
				{#if $appState.iscrizioni.find((el) => el.id === target.channel.id) && !loggedOut}
					<a class="py- rounded-full bg-gray-200 px-3" href={`/channel/${target.channel.id}`}
						>Iscritto</a
					>
				{:else}
					<button class="rounded-full bg-black px-3 py-1 text-white" disabled={loggedOut}
						>Iscrivitti</button
					>
				{/if}
			</div>
		</div>
		<div class="flex items-center gap-3">
			<div class="flex rounded-full bg-gray-200 px-4 py-2">
				<button class="flex items-center gap-2 border-r border-gray-300 pr-2" disabled={loggedOut}
					><ThumbUpOutline size={'1.5em'} /> {target.likes}</button
				>
				<button class="pl-2" disabled={loggedOut}><ThumbDownOutline size={'1.5em'} /></button>
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

	<div class="mt-5 flex flex-col gap-3">
		<div>
			<p>{`${comments.length} commenti`}</p>
		</div>
		<div class="mb-4 flex flex-col items-start gap-3">
			<div class="flex flex-col items-start gap-3">
				<textarea cols="60" rows="2" disabled class="resize-none" />
				<button class="rounded-full bg-gray-200 px-3 py-1" disabled>Commenta</button>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<p>Failed Loading Comments</p>
		</div>
	</div>
</div>
<slot />
