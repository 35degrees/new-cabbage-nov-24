<script>
	import * as d3 from 'd3';
	import { fade } from 'svelte/transition';
	let { data } = $props();

	let svg;
	let states = data.population;
	let pop2023 = states.map((state) => (state.POPESTIMATE2023 = +state.POPESTIMATE2023));

	let min = d3.min(states, (d) => d.POPESTIMATE2023);
	let max = d3.max(states, (d) => d.POPESTIMATE2023);
	let extent = d3.extent(states, (d) => d.POPESTIMATE2023);
	console.log({ max });
	console.log({ extent });

	$effect(() => {
		svg = d3.select('.rsvg').append('svg').attr('viewBox', '0 0 750 850');
		// .style('border', '1px solid black')
		// .style('background-color', '#fff');

		states.sort((a, b) => b.POPESTIMATE2023 - a.POPESTIMATE2023);

		createViz(states);

		function createViz(states) {
			const xScale = d3.scaleLinear().domain([0, max]).range([0, 574]);
			const yScale = d3
				.scaleBand()
				.domain(states.map((d) => d.NAME))
				.range([0, 866])
				.paddingInner(0.2);
			const barHeight = 20;
			const barAndLabel = svg
				.selectAll('g')
				.data(states)
				.join('g')
				.attr('transform', (d) => `translate(0,${yScale(d.NAME)})`);

			barAndLabel
				.append('rect')
				.attr('width', (d) => xScale(d.POPESTIMATE2023))
				.attr('height', yScale.bandwidth())
				.attr('x', 123)
				.attr('y', 0)
				.attr('fill', (d) => (d.NAME === 'California' ? 'orange' : 'teal'));

			barAndLabel
				.append('text')
				.text((d, i) => i + 1 + '    ' + d.NAME)
				.attr('x', 120)
				.style('text-anchor', 'end')
				.attr('y', 10)
				.style('font-family', 'sans-serif')
				.style('font-size', '12px')
				.style('user-select', 'none');

			barAndLabel
				.append('text')
				.text((d) => d.POPESTIMATE2023.toLocaleString())
				.attr('x', (d) => 110 + xScale(d.POPESTIMATE2023) + 16)
				.attr('y', 10)
				.style('text-anchor', 'start')
				.style('font-family', 'sans-serif')
				.style('font-size', '10px')
				.style('opacity', '0.6');

			barAndLabel
				.append('line')
				.attr('x1', 123)
				.attr('y1', 0)
				.attr('x2', 123)
				.attr('y2', 800)
				.attr('stroke', 'teal');
		}
	});
</script>

<div
	in:fade={{ duration: 200, delay: 900 }}
	out:fade={{ duration: 200 }}
	class="chart-container container absolute -z-50 flex flex-col items-center justify-start"
>
	<h1
		class="font-classic text-rose500 absolute text-center text-2xl sm:-top-10 sm:left-2 sm:text-xl md:-top-12 md:left-[11rem] md:text-2xl lg:left-[30.8rem] lg:text-3xl"
	>
		2023 US State Population Rankings
	</h1>
	<div class="rsvg"></div>
</div>

<style>
	.rsvg {
		margin: auto 1rem;
		max-width: 600px;
		width: 100%;
	}
	.chart-container {
		transform: translate(-50%, -50%);
	}
</style>
