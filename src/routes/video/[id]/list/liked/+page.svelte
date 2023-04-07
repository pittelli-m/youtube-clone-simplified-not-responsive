<script>
	import PlaylistPlayer from '../../../../../lib/PlaylistPlayer.svelte';
	import { page } from '$app/stores';
</script>

<div>
	<PlaylistPlayer playing={$page.params.id} />
</div>
