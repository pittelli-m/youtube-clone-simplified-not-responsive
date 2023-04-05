<script>
	export let channel;
	import appState, { update } from '../stores/appState';

	const handleUnsubscribe = (id) => {
		if (!$appState.iscrizioni.find((el) => el.id === id)) return;
		let index = $appState.iscrizioni.findIndex((el) => el.id === id);
		$appState.iscrizioni.splice(index, 1);
		channel.subscribers--;
		$appState.iscrizioni = [...$appState.iscrizioni];
		update({ ...$appState });
	};
</script>

<article>
	<div class="mb-5 flex flex-col items-center gap-4">
		<a
			class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gray-200"
			href={`/channel/${channel.username}`}
		>
			<img src={channel.image} alt={channel.username} class="h-20 w-20" />
		</a>
		<div class="flex flex-col gap-1">
			<a class="text-xl font-semibold" href={`/channel/${channel.username}`}>{channel.username}</a>
			<p class="text-sm text-gray-600">
				{`@${channel.username} `}
			</p>
			<p class="text-sm">
				{` ${channel.subscribers} iscritti `}
			</p>
			<p class="text-sm">
				{` ${channel.videos.length} video`}
			</p>
		</div>
		<button
			class="rounded-full bg-red-500 px-3 py-1 text-white"
			on:click={() => handleUnsubscribe(channel.id)}>Anulla iscrizione</button
		>
	</div>
</article>
