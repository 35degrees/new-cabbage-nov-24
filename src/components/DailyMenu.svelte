<script>
	import Icon from '@iconify/svelte';
	import { fade, slide } from 'svelte/transition';
	import dailymenu from '/src/components/utilities/dailymenu.json';
	let { dailyMenuHidden = $bindable() } = $props();

	// export const [send, receive] = crossfade({
	// 	duration: 800
	// });
	function handleClick() {
		dailyMenuHidden = !dailyMenuHidden;
	}
	const sortOptions = ['newest', 'oldest', 'A → Z', 'Z → A'];
	let sortBy = $state(0);
	$inspect(sortBy);

	const sorted = () =>
		sortBy === 0
			? dailymenu.sort((a, b) => b.id - a.id)
			: sortBy === 1
				? dailymenu.sort((a, b) => a.id - b.id)
				: sortBy === 2
					? dailymenu.sort((a, b) => (a.title < b.title ? -1 : 1))
					: dailymenu.sort((a, b) => (b.title > a.title ? 1 : -1));

	// const sorted = () => {
	// 	if (sortBy === 0) {
	// 		dailymenu.sort((a, b) => b.id - a.id);
	// 	} else if (sortBy === 1) {
	// 		dailymenu.sort((a, b) => a.id - b.id);
	// 	} else if (sortBy === 2) {
	// 		dailymenu.sort((a, b) => a.title - b.title);
	// 	} else if (sortBy === 3) {
	// 		dailymenu.sort((a, b) => b.title - a.title);
	// 	}
	// };
</script>

{#if dailyMenuHidden}
	<div
		transition:fade={{ duration: 120 }}
		class="daily-menu-container absolute -left-0 top-8 flex flex-col gap-2"
	>
		<ul class="daily-list z-99 relative">
			<div
				class="sort-row text-rose400 mb-1 flex w-full flex-row items-center justify-between gap-2 text-[0.78rem] opacity-70"
			>
				<p class="indent-0.5">Sort by:</p>
				{#each sortOptions as option, i}
					<p class="cursor-pointer capitalize" onclick={() => (sortBy = i)}>{option}</p>
				{/each}
			</div>
			{#each sorted(dailymenu) as item (item.id)}
				{#key sortBy}
					<!-- <div class="transition-container"> -->
					<li
						onclick={handleClick}
						class="text-rose500 wrap-none -mb-1 flex w-[280px] select-none flex-col gap-0 border-2 border-lime-500 bg-slate-50 px-4 py-1 py-1.5"
					>
						<a href={'/' + item.id + item.tagline}>
							<h3 class="text-[0.94rem] font-semibold">
								<span class="text-[0.65rem]">{item.id + 1}</span>
								{item.title}
							</h3>
							<p class="indent-4 text-[0.8rem] opacity-80">{item.date}</p>
						</a>
					</li>
					<!-- </div> -->
				{/key}
			{/each}
		</ul>
	</div>
{/if}

<style>
</style>
