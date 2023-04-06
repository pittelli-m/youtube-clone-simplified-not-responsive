<script>
	import appState from '../stores/appState';
	import PlaylistItem from './PlaylistItem.svelte';
	export let playing;
	$: videos = $appState.piaciuti;

	let items = [...$appState.piaciuti];

	let dragIndex = null;
	let dropIndex = null;

	const handleDragOver = (e, index) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		dropIndex = index;
	};
	const handleDragStart = (e, index) => {
		dragIndex = index;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', dragIndex);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		const data = e.dataTransfer.getData('text/plain');
		const dragItem = items.splice(data, 1)[0];
		items.splice(dropIndex, 0, dragItem);

		items = [...items];

		dragIndex = null;
		dropIndex = null;
	};
</script>

<div
	class="aside--right absolute left-[920px] top-0 flex h-full w-[360px] flex-col gap-2 overflow-auto rounded-xl border border-gray-200 p-2"
>
	<div class="flex gap-8">
		<p class="text-xl font-semibold">Video Piaciuti</p>
		<p>User - {items.length}</p>
	</div>
	<ul class="list-none">
		{#each items as video, i}
			<PlaylistItem
				{video}
				draggable={true}
				dragstart={(e) => handleDragStart(e, i)}
				drop={handleDrop}
				dragover={(e) => handleDragOver(e, i)}
				index={i}
				{playing}
			/>
		{/each}
	</ul>
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
