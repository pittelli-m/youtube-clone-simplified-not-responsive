<script>
	import '../app.postcss';
	import AsideLeft from '../lib/AsideLeft.svelte';
	import MainNav from '../lib/MainNav.svelte';
</script>

<svelte:head>
	<title>Youtube Clone</title>
</svelte:head>

<div>
	<AsideLeft />
	<MainNav />
	<div class="main__app main__scroll fixed left-60 top-14 h-[90vh] w-full overflow-y-auto">
		<slot />
	</div>
</div>

<style>
	.main__scroll:hover::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.45);
	}
	.main__scroll::-webkit-scrollbar {
		width: 0.5rem;
	}
	.main__scroll::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 1rem;
	}
	.main__scroll::-webkit-scrollbar-track-piece {
		background: transparent;
	}
	.main__scroll::-webkit-scrollbar-thumb {
		background: transparent;
		border-radius: 0.3rem;
	}
</style>
