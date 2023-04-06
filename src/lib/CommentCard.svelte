<script>
	export let post;
	import ThumbUpOutline from 'svelte-material-icons/ThumbUpOutline.svelte';
	import ThumbDownOutline from 'svelte-material-icons/ThumbDownOutline.svelte';
	import TrashCanOutline from 'svelte-material-icons/TrashCanOutline.svelte';
	import appState, { update } from '../stores/appState';

	$: loggedOut = !$appState.isLoggedIn;

	let comment = post.post;

	const handleEdit = () => {
		post.isEditing = true;
	};
	const handleSubmit = () => {
		let newPost = comment;
		post = { ...post, post: newPost };
		post.isEditing = false;
		let oldPost = $appState.commenti.find((el) => el.id === post.id);
		oldPost = { ...oldPost, post: newPost, isEditing: false };
		$appState.commenti.splice(
			$appState.commenti.findIndex((el) => el.id === oldPost.id),
			1,
			oldPost
		);

		update({ ...$appState });
	};
	const handleDelete = () => {
		$appState.commenti.splice(
			$appState.commenti.findIndex((el) => el.id === post.id),
			1
		);
		$appState.commenti = [...$appState.commenti];
		update({ ...$appState });
	};
</script>

<article class="flex flex-col gap-3">
	<div class="flex items-center gap-3">
		<div
			class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200"
		>
			{#if post.author === 'User'}
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white"
				>
					U
				</div>
			{:else}
				<img src={post.avatar} alt={post.author} class="h-12 w-12" />
			{/if}
		</div>
		<div>
			<p class="text-sm font-semibold">
				{post.author}
			</p>
			{#if post.isEditing && !loggedOut}
				<textarea
					cols="60"
					rows="1"
					bind:value={comment}
					class="resize-none border-b-2 border-gray-200 outline-none"
				/>{:else}
				{post.post}
			{/if}
			<p />
		</div>
	</div>
	<div class="ml-14 flex items-center gap-2">
		<ThumbUpOutline size={'1.5em'} />
		<p class="text-xs">{Math.ceil(Math.random() * 30)}</p>
		<ThumbDownOutline size={'1.5em'} />
		{#if post.isEditing && !loggedOut}
			<button
				class="ml-6 rounded-full border border-blue-600 px-3 py-1 text-sm font-semibold text-blue-600"
				on:click={handleSubmit}>Aggiorna</button
			>
		{:else}
			<p class="ml-6 text-sm font-semibold">Rispondi</p>
		{/if}
		{#if post.author === 'User' && !loggedOut}
			<button class="ml-6 text-sm font-semibold" on:click={handleEdit}>Modifica</button>
			<button on:click={handleDelete}><TrashCanOutline size={'1.5em'} /></button>
		{/if}
	</div>
</article>
