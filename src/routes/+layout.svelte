<script>
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
import Nav from '../components/Nav.svelte';
	import '../app.css';
	let { data, children } = $props();
</script>

<Nav />
<div class="transition-container">
	{#key data.pathname}
		<div
			in:fly={{ easing: cubicOut, y: 30, duration: 300, delay: 400 }}
			out:fly={{ easing: cubicIn, y: -0, duration: 220 }}
		>
			{@render children()}
		</div>
	{/key}
</div>

<style>
	.transition-container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		align-items: center;
	}

	.transition-container > * {
		grid-row: 1;
		grid-column: 1;
	}
</style>
