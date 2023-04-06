<script>
	import { page } from '$app/stores';
	export let data;

	const { posts, channels } = data;

	let channel = channels.find((el) => parseInt(el.id) === parseInt($page.params.id));
</script>

<div class="flex w-[500px] flex-col gap-3">
	Community page
	{#each posts as post}
		<article class="flex flex-col gap-3 border-2 border-gray-100 p-3">
			<div class="flex items-center gap-2">
				<div class="border-grey-100 flex h-16 w-16 items-center justify-center rounded-full border">
					<img src={channel.image} alt={channel.username} class="h-16 w-16" />
				</div>
				<p class="font-semibold">{channel.username}</p>
			</div>
			<div>
				<img
					src={`https://picsum.photos/id/${Math.ceil(Math.random() * 200)}/300/300`}
					alt="post depiction"
					class="m-auto"
				/>
			</div>
			<div>{post.post}</div>
		</article>
	{/each}
</div>
