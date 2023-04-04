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
	<div class="main__app fixed left-60 top-14 h-full w-full">
		<slot />
	</div>
</div>
