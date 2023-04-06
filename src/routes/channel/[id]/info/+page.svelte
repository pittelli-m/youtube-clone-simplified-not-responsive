<script>
	import { page } from '$app/stores';
	export let data;

	const { channels } = data;
	let channel = channels.find((el) => parseInt(el.id) === parseInt($page.params.id));
</script>

<div class="flex h-full w-full">
	<div class="h-[80vh] w-[50vw] border-r border-gray-200 p-2">
		<p>Informazioni</p>
	</div>
	<div class="flex flex-col gap-2 p-2">
		<p class="font-semibold">Informazioni sul canale</p>
		<p class="ml-3">{`Nome: ${channel.name}`}</p>
		<p class="ml-3">{`Iscritto da: ${channel.birthDate}`}</p>
		<p class="ml-3">{`Città: ${channel.city}`}</p>
		<p class="ml-3">{`Università: ${channel.university}`}</p>
	</div>
</div>
