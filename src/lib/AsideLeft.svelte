<script>
	import authState from '../stores/authStore';
	import appState from '../stores/appState';
	import HomeVariantOutline from 'svelte-material-icons/HomeVariantOutline.svelte';
	import YoutubeSubscription from 'svelte-material-icons/YoutubeSubscription.svelte';
	import MusicBoxMultipleOutline from 'svelte-material-icons/MusicBoxMultipleOutline.svelte';
	import History from 'svelte-material-icons/History.svelte';
	import Youtube from 'svelte-material-icons/Youtube.svelte';
	import Fire from 'svelte-material-icons/Fire.svelte';
	import YoutubeTv from 'svelte-material-icons/YoutubeTv.svelte';
	import MovieOpenOutline from 'svelte-material-icons/MovieOpenOutline.svelte';
	import ClockTimeFiveOutline from 'svelte-material-icons/ClockTimeFiveOutline.svelte';
	import DownloadOutline from 'svelte-material-icons/DownloadOutline.svelte';
	import ChevronDown from 'svelte-material-icons/ChevronDown.svelte';
	import MusicNoteOutline from 'svelte-material-icons/MusicNoteOutline.svelte';
	import YoutubeGaming from 'svelte-material-icons/YoutubeGaming.svelte';
	import Basketball from 'svelte-material-icons/Basketball.svelte';
	import LightbulbOutline from 'svelte-material-icons/LightbulbOutline.svelte';
	import NewspaperVariantMultipleOutline from 'svelte-material-icons/NewspaperVariantMultipleOutline.svelte';
	import Music from '../assets/icons/ytMusic.svg';
	import Shorts from '../assets/icons/ytShorts.svg';
	import Live from '../assets/icons/ytLive.svg';
</script>

<div class="aside--left fixed left-0 top-14 flex h-full w-60 flex-col overflow-y-auto">
	<div class="px-2">
		<div class="flex flex-col border-b border-b-gray-300 py-2">
			<a href="/" class="flex gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<HomeVariantOutline size={'1.5em'} /> Home</a
			>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<img src={Shorts} alt="YouTube Shorts Logo" class="icon" /> Shorts
			</p>
			<a href="/iscrizioni" class="flex gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<YoutubeSubscription size={'1.5em'} />Iscrizioni</a
			>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<Youtube size={'1.5em'} /> Originals
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<img src={Music} alt="YouTube Music Logo" class="icon" />
				Youtube Music
			</p>
		</div>
	</div>
	<div class="px-2">
		<div class="flex flex-col border-b border-b-gray-300 py-2">
			<a href="/raccolta" class="flex gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<MusicBoxMultipleOutline size={'1.5em'} />Raccolta</a
			>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<History size={'1.5em'} />Cronologia
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<YoutubeTv size={'1.5em'} /> I tuoi video
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<MovieOpenOutline size={'1.5em'} /> I tuoi film
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<ClockTimeFiveOutline size={'1.5em'} /> Guarda più tardi
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<DownloadOutline size={'1.5em'} /> Download
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<ChevronDown size={'1.5em'} /> Mostra altro
			</p>
		</div>
	</div>
	<div class="px-2">
		<div class="flex flex-col border-b border-b-gray-300 py-2">
			<p class="rounded-lg px-3 py-2 hover:bg-gray-200">Iscrizioni</p>
			{#if $authState.isLoggedIn && $appState.iscrizioni.length > 0}
				{#each $appState.iscrizioni as channel}
					<a
						href={`/channel/${channel.username}`}
						class="flex gap-2 rounded-lg px-3 py-2 hover:bg-gray-200"
					>
						<img src={channel.image} alt={channel.username} class="icon" />
						{channel.username}
					</a>
				{/each}
			{:else}
				<p class="flex rounded-lg px-3 py-2 hover:bg-gray-200">-</p>
			{/if}
		</div>
	</div>
	<div class="px-2">
		<div class="flex flex-col border-b border-b-gray-300 py-2">
			<p class="rounded-lg px-3 py-2 hover:bg-gray-200">Esplora</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<Fire size={'1.5em'} />Tendenze
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<MusicNoteOutline size={'1.5em'} /> Musica
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<MovieOpenOutline size={'1.5em'} /> Film
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<img src={Live} alt="YouTube Live Logo" class="icon" /> Dal vivo
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<YoutubeGaming size={'1.5em'} /> Giochi
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<NewspaperVariantMultipleOutline size={'1.5em'} />Notizie
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<Basketball size={'1.5em'} /> Sport
			</p>
			<p class="flex cursor-pointer gap-4 rounded-lg px-3 py-2 hover:bg-gray-200">
				<LightbulbOutline size={'1.5em'} />Apprendimento
			</p>
		</div>
	</div>
	<div class="px-2">
		<div class="flex flex-col border-b border-b-gray-300 py-2">
			<p class="px-3 py-2">Altro da YouTube</p>
			<p class="flex cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-200">Youtube Studio</p>
			<p class="flex cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-200">YouTube Music</p>
			<p class="flex cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-200">Youtube Kids</p>
		</div>
	</div>
	<div class="px-2">
		<div class="flex flex-col border-b border-b-gray-300 py-2">
			<p class="flex cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-200">Impostazioni</p>
			<p class="flex cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-200">
				Cronologia segnala...
			</p>
			<p class="flex cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-200">Guida</p>
			<p class="flex cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-200">Invia Feedback</p>
		</div>
	</div>

	<div class="flex flex-col">7</div>
</div>

<style>
	.aside--left:hover::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.45);
	}
	.aside--left::-webkit-scrollbar {
		width: 0.5rem;
	}
	.aside--left::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 1rem;
	}
	.aside--left::-webkit-scrollbar-track-piece {
		background: transparent;
	}
	.aside--left::-webkit-scrollbar-thumb {
		background: transparent;
		border-radius: 0.3rem;
	}

	.icon {
		height: 1.5em;
		width: 1.5em;
	}
</style>
