<script>
  import * as d3 from 'd3'
  import { fade } from 'svelte/transition';
  d3.csv('src/routes/2nov24bo/nov24bo.csv',d3.autoType)
              .then(data=>{
                console.log("movie data",data);
                drawArc(data)
              })

    const width = 400
    const height = 400
    let svg;

    const arcGenerator = d3.arc()
        .innerRadius(100)
        .outerRadius(180)
        .padAngle(0.02)
        .cornerRadius(6)

  function drawArc(data) {
    const totalRev = data[2].revenue
    const wickedRev = data[0].revenue
    const gladRev = data[1].revenue
    const remainRev = totalRev - wickedRev - gladRev
    const wickedPct = Math.round(wickedRev / totalRev * 100)
    const gladPct = Math.round(gladRev / totalRev * 100)
    const remainPct = Math.round(remainRev / totalRev * 100)
    const wickedDeg = wickedPct * 360/100
    const wickedRad = wickedDeg * Math.PI / 180
    const gladDeg = gladPct * 360/100
    const gladRad = gladDeg * Math.PI / 180
    const remainDeg = remainPct * 360/100
    const remainRad = remainDeg * Math.PI / 180

    console.log(wickedRad, gladRad, remainRad);
    
    const wickedRevLabel = (data[0].revenue)/1000000
    const gladRevLabel = (data[1].revenue)/1000000
    const remainRevLabel = (totalRev - wickedRev - gladRev)/1000000
    
    svg = d3.select('.rsvg')
      .append('svg')
      .attr('viewBox',`0,0,${width},${height}`)
      // .style('border','2px solid teal')

    const innerChart = svg  
      .append('g')
        .attr('transform',`translate(${width/2},${height/2})`)

      innerChart
        .append('path')
          .attr('d', () => {
            return arcGenerator({
              startAngle: 0,
              endAngle: wickedRad
            })
          })
          .attr('fill','#50C878')
      innerChart
        .append('path')
          .attr('d', () => {
            return arcGenerator({
              startAngle: wickedRad,
              endAngle: 2 * Math.PI - remainRad
            })
          })
          .attr('fill','#59544e')
          
      innerChart
        .append('path')
          .attr('d', () => {
            return arcGenerator({
              startAngle: gladRad + wickedRad,
              endAngle: 2 * Math.PI
            })
          })
          .attr('fill','#9aa7ad55')
        
        const wickedCenter = arcGenerator
          .startAngle(0)
          .endAngle(wickedRad)
          .centroid()
          
        const gladCenter = arcGenerator
          .startAngle(wickedRad)
          .endAngle(2 * Math.PI - remainRad)
          .centroid()
        const remainCenter = arcGenerator
          .startAngle(gladRad + wickedRad)
          .endAngle(2 * Math.PI)
          .centroid()

        innerChart
          .append('text')
            .text(d=>d3.format("$,.4r")(wickedRevLabel) + 'm')
            .attr('x',wickedCenter[0])
            .attr('y',wickedCenter[1])
            .attr('text-anchor','middle')
            .attr('fill','#fff')
            .attr('font-weight',500)
        innerChart
          .append('text')
            .text(d=>d3.format("$,.3r")(gladRevLabel) + 'm')
            .attr('x',gladCenter[0])
            .attr('y',gladCenter[1])
            .attr('text-anchor','middle')
            .attr('fill','#fff')
            .attr('font-weight',500)
        innerChart
          .append('text')
            .text(d=>d3.format("$,.3r")(remainRevLabel) + 'm')
            .attr('x',remainCenter[0])
            .attr('y',remainCenter[1])
            .attr('text-anchor','middle')
            .attr('fill','#000')
            .attr('font-weight',400)
            .attr('opacity',0.7)
        innerChart
          .append('text')
            .text("All Other Movies")
            .attr('x',remainCenter[0])
            .attr('y',remainCenter[1] - 20)
            .attr('text-anchor','middle')
            .attr('fill','#000')
            .attr('font-weight',400)
            .attr('opacity',0.7)
        innerChart
          .append('image')
            .text(d=>d3.format("$,.4r")(wickedRevLabel) + 'm')
            .attr('x',wickedCenter[0] -45)
            .attr('y',wickedCenter[1] - 70)
            .attr('xlink:href','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Wicked_Movie_Logo.png/800px-Wicked_Movie_Logo.png')
            .attr('height','50px')
            .attr('width','100px')
        innerChart
          .append('image')
            .text(d=>d3.format("$,.4r")(gladRevLabel) + 'm')
            .attr('x',gladCenter[0]-65)
            .attr('y',gladCenter[1] - 80)
            .attr('xlink:href','https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a58a7719-0dcf-4e0b-b7bb-d2b725dbbb8e/dh8hycy-3ff0144c-c247-4973-b8f4-9968b495a39e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E1OGE3NzE5LTBkY2YtNGUwYi1iN2JiLWQyYjcyNWRiYmI4ZVwvZGg4aHljeS0zZmYwMTQ0Yy1jMjQ3LTQ5NzMtYjhmNC05OTY4YjQ5NWEzOWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.I86Nr0cgjfKGMH7ETW6ekaFnDwE_IrVcXVpnXKdbya8')
            .attr('height','70px')
            .attr('width','125px')
  }
</script>


<!-- <div
	in:fade={{ duration: 200, delay: 900 }}
	out:fade={{ duration: 200 }}
	class="chart-container container absolute -z-50 flex flex-col items-center justify-start"
> -->
<div
	in:fade={{ duration: 200, delay: 900 }}
	out:fade={{ duration: 200 }}
	class="chart-container container absolute -z-50 flex flex-col items-center justify-start"
>
	<h1
		class="font-classic text-rose500  text-center text-2xl sm:-top-10 sm:left-2 sm:text-xl md:-top-12 items-center justify-center md:text-balance md:w-[100px] flex md:left-20 md:text-xl lg:left-[2rem] lg:text-3xl"
	>
		Weekend Domestic Box Office Results, November 22-24, 2024
	</h1>
	<div class="rsvg"></div>
</div>

<style>
	.rsvg {
		margin: auto 1rem;
		max-width: 400px;
		width: 100%;
	}
	.chart-container {
		transform: translate(-50%, -50%);
	}
</style>
