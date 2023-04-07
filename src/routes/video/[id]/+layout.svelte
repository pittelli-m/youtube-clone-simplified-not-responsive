<script>
	import { page } from '$app/stores';
	import Player from '$lib/Player.svelte';
	import appState from '../../../stores/appState';
	import { update } from '../../../stores/appState';
	import ThumbUpOutline from 'svelte-material-icons/ThumbUpOutline.svelte';
	import ThumbDownOutline from 'svelte-material-icons/ThumbDownOutline.svelte';
	import ShareOutline from 'svelte-material-icons/ShareOutline.svelte';
	import DownloadOutline from 'svelte-material-icons/DownloadOutline.svelte';
	import DotsHorizontal from 'svelte-material-icons/DotsHorizontal.svelte';
	import CommentCard from '../../../lib/CommentCard.svelte';

	export let data;

	const { posts } = data;

	$: userComments = $appState.commenti.filter((el) => el.videoID === $page.params.id);

	$: comments = [...userComments, ...posts];

	let comment;

	$: loggedOut = !$appState.isLoggedIn;

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
		$appState.piaciuti = [...$appState.piaciuti];
		update({ ...$appState });
	};
	const loadMorePosts = async () => {
		const allPosts = await (
			await fetch(`https://dummyjson.com/posts?limit=30&skip=${comments.length}`)
		).json();
		const getPosts = async () => {
			const posts = await Promise.all(allPosts.posts.map((el) => getAuthor(el)));
			return posts;
		};

		const getAuthor = async (el) => {
			let user = await (await fetch(`https://dummyjson.com/users/${el.id}`)).json();
			const author = user.username;
			const avatar = user.image;
			return {
				post: el.body,
				authorID: el.userId,
				author,
				avatar
			};
		};

		const posts = await getPosts();

		comments = [...comments, ...posts];
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!comment) return;

		const newComment = {
			post: comment,
			author: 'User',
			videoID: target.id,
			id: Math.round(Math.random() * 9999999),
			isEditing: false
		};
		$appState.commenti.push(newComment);
		update({ ...$appState });
		comments.unshift(newComment);
		comments = [...comments];
		comment = '';
	};
</script>

<div class="ml-2 w-[900px]">
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

	<div class="mt-5 flex flex-col gap-3">
		<div>
			<p>{`${posts.length} commenti`}</p>
		</div>
		<form class="mb-4 flex flex-col items-start gap-3" on:submit={(e) => handleSubmit(e)}>
			{#if !loggedOut}
				<div class="mb-3 flex items-center gap-3">
					<div
						class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xl text-white"
					>
						U
					</div>
					<textarea
						cols="60"
						rows="1"
						bind:value={comment}
						class="resize-none border-b-2 border-gray-200 outline-none"
					/>
				</div>
				<button class="rounded-full bg-blue-700 px-3 py-1 text-white" disabled={!comment}
					>Commenta</button
				>
			{:else}
				<div class="flex flex-col items-start gap-3">
					<textarea cols="60" rows="2" disabled class="resize-none" />
					<button class="rounded-full bg-gray-200 px-3 py-1" disabled>Commenta</button>
				</div>
			{/if}
		</form>
		{#key comments}
			<div class="flex flex-col gap-4">
				<!-- TODO Intersectional Observer - fetch more comments -->
				{#each comments as post}
					<CommentCard {post} />
				{/each}
			</div>
		{/key}

		<button class="m-auto rounded-full bg-gray-200 px-3 py-1" on:click={loadMorePosts}>
			Show more
		</button>
	</div>
</div>
<slot />
