<script>
	import { page } from '$app/stores';
	export let data;
	const { channels, videos } = data;

	let channel = channels.find((el) => el.username === $page.params.id);
</script>

<div>
	<div>
		inside the {channel.username} channel page
		<img src={channel.image} alt={channel.username} />

		<a href={`/channel/${channel.username}`}>Home</a>
		<a href={`/channel/${channel.username}/community`}>Community</a>
		<a href={`/channel/${channel.username}/info`}>Information</a>
	</div>

	<slot />
</div>
