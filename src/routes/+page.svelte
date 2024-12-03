<script>
	import { fly,fade } from 'svelte/transition';
</script>

<div
transition:fade={{ duration: 220}}
	class=" font-fun text-rose500 title-container flex w-auto flex-col items-start justify-center gap-1"
>
	<h1 class=" sm:text-5xl md:text-7xl lg:text-8xl">studioCabbage</h1>
	<p class="indent-1 sm:text-[0.97rem] md:text-xl">data visualization studio by Sam Hooker</p>
</div>
