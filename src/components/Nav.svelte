<script>
	import Icon from '@iconify/svelte';
	import DailyMenu from './DailyMenu.svelte';

	let dailyMenuHidden = $state(false);
	$inspect(dailyMenuHidden);
</script>

<nav id="nav" class="container absolute left-[50%] top-0 mx-auto translate-x-[-50%]">
	<div
		class="flex h-16 w-full flex-row items-center justify-between bg-transparent px-8 py-2 text-white sm:px-2"
	>
		<div class="text-rose500 flex flex-row items-center justify-center sm:gap-2 md:gap-5">
			<a href="/"> <Icon icon="maki:home" width="1.4rem" height="1.4rem" /></a>

			<div class="drop-down relative">
				<button
					class="font-fun text-rose500 text-xl transition-all hover:scale-[102%]"
					onclick={() => (dailyMenuHidden = !dailyMenuHidden)}><p>Daily Viz</p></button
				>
				<DailyMenu bind:dailyMenuHidden />
			</div>
		</div>
		<div
			class="menu-items text-rose500 flex flex-row items-end justify-center px-2 sm:gap-2 md:gap-5"
		>
			<h3 class="text-lg"><a href="http://www.samhooker.com" target="_blank">samhooker.com</a></h3>
			<div class="gh-icon h-full">
				<a href="https://github.com/35degrees" target="_blank">
					<Icon icon="mdi:github" width="2rem" height="2rem" />
				</a>
			</div>
		</div>
	</div>
</nav>

<style>
	.gh-icon {
		height: 2em;
	}
</style>
