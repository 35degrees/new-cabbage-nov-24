<script>

	
	import * as d3 from 'd3'
	let { data } = $props()
	let emps = data.employees

	let updatedEmps = emps.map((emp) => ({
		DATE: new Date(emp.DATE),
		PAYEMS: +emp.PAYEMS
	}))

	$inspect(updatedEmps)

	const margin = { top: 40, right: 40, bottom: 25, left: 70}

	let width = 1150
	let height = 700

  let innerWidth = (width - margin.left - margin.right)
  let innerHeight = (height - margin.top - margin.bottom)

	let empMin = d3.min(updatedEmps, d=>d.PAYEMS)
	let empMax = d3.max(updatedEmps, d=>d.PAYEMS)

	let firstDate = d3.min(updatedEmps, d=>d.DATE)
	let lastDate = d3.max(updatedEmps, d=>d.DATE)

	const xScale = d3.scaleTime()
		.domain([firstDate,lastDate])
		.range([0, innerWidth])

	const yScale = d3.scaleLinear()
		.domain([empMin, empMax])
		.range([innerHeight,0])

	const lineGenerator = d3.line()
		.x(d=>xScale(d.DATE))
		.y(d=>yScale(d.PAYEMS))
	.curve(d3.curveCatmullRom)


	$effect(() => {
		const svg = d3.select('#line-chart')
		.append('svg')
      .attr('viewBox',`0, 0, ${width}, ${height}`)


			const innerChart = svg
      .append('g')
      .attr('transform',`translate(${margin.left}, ${margin.top})`)

		const bottomAxis = d3.axisBottom(xScale)
			.tickFormat(d3.timeFormat('%Y'))
		innerChart
			.append('g')
			.attr('class','axis-x')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(bottomAxis)

		innerChart
			.append('path')
			.attr('d',lineGenerator(updatedEmps))
			.attr('fill','none')
			.attr('stroke','rebeccapurple')
			.attr('stroke-width','2px')

		d3.selectAll('.axis-x text')
			.attr('x', 65)
			.attr('y','12px')
			.style('font-size','18px')
			.style('font-family','Geist Mono')

		d3.select('.axis-x .tick:last-child text ')
			.attr('x', '32px')
			
			const leftAxis = d3.axisLeft(yScale)
    innerChart
      .append('g')
      .attr('class',"axis-y")
      .call(leftAxis)

    d3.selectAll('.axis-y text')
      .attr('x','-10px')
      .style('font-family','sans-serif')
      .style('font-size','14px')

		svg
			.append('text')
			.text('Non-farm, in thousands of employees')
			.attr('y','25px')
			.attr('x','10px')

		svg
			.append('text')
			.attr('y','94%')
			.attr('x','86.2%')
			.text('Source: FRED')
			// .append('a')
			// .attr('xlink:href','https://fred.stlouisfed.org/series/PAYEMS')
			// .append('text')
			// .text('FRED')
			// .attr("dy", 3.5)
			// .attr("dx", 5.5)
			// .attr('text-anchor','middle')
			// .style('stroke','#000')
			// .attr('class','source-link')


	})
</script>

<div
	in:fade={{ duration: 200, delay: 900 }}
	out:fade={{ duration: 200 }}
	class="chart-container container absolute -z-50 flex flex-col items-center justify-start"
>
<!-- <div
	in:fade={{ duration: 200, delay: 900 }}
	out:fade={{ duration: 200 }}
	class="chart-container container absolute -z-50 flex flex-col items-center justify-start"
> -->
	<h1
		class="font-classic text-rose500 text-center text-2xl sm:-top-10 sm:left-2 sm:text-xl md:-top-12 md:left-[11rem] md:text-2xl lg:left-[30.8rem] lg:text-3xl leading-2"
	>
		All-time U.S. Employee Total
	</h1>

	<div id="line-chart"></div>
</div>

<style>
#line-chart {
		margin: auto 1rem;
		max-width: 1150px;
		width: 100%;
	}
	.chart-container {
		transform: translate(-50%, -50%);
	}
	.source-link a {
		fill: #000;
		color: #000;
	}


</style>
