<script>
    import * as d3 from "d3";

    let arcGenerator = d3.arc() //making arcGenerator
        .innerRadius(0)
        .outerRadius(50); //making it too large will fill up svg and not look like circle

    let arc = arcGenerator({ //setting arc to dimensions of circle
        startAngle: 0,
        endAngle: 2 * Math.PI
    }); 

    let data = [1, 2, 3, 4, 5, 5];
    let colors = d3.scaleOrdinal(d3.schemeTableau10); //avoiding problem of having to manually input colors
    let sliceGenerator = d3.pie();
    let arcData = sliceGenerator(data); //arcData == array of objs representing slices
    let arcs = arcData.map(d => arcGenerator(d)); //creatings paths for each slice by feeding it to arcGenerator


</script>


<svg viewBox="-50 -50 100 100">
    {#each arcs as arc, index}
        <!-- path is what is drawing the shape -->
        <path d={arc} fill={ colors(index) } /> 
    {/each}
   
</svg>

<style>
    svg {
        max-width: 20em;
        margin-block: 1em;
        overflow: visible;
    }
</style>