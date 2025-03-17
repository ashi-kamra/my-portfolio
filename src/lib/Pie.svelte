<script>
    import * as d3 from "d3";

    let arcGenerator = d3.arc() //making arcGenerator
        .innerRadius(0)
        .outerRadius(50); //making it too large will fill up svg and not look like circle

    let arc = arcGenerator({ //setting arc to dimensions of circle
        startAngle: 0,
        endAngle: 2 * Math.PI
    }); 

    export let data = []; //now letting other files access data
    let colors = d3.scaleOrdinal(d3.schemeTableau10); //avoiding problem of having to manually input colors
    let sliceGenerator = d3.pie().value(d => d.value); //accessing value key in data
    
    //making these values reactive so the pie updates on search!
    
    let arcData; 
    let arcs;

    $: {
        arcData = sliceGenerator(data); //arcData == array of objs representing slices
        arcs = arcData.map(d => arcGenerator(d)); //creatings paths for each slice by feeding it to arcGenerator
    }   
    

</script>

<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
            <!-- path is what is drawing the shape -->
            <path d={arc} fill={ colors(index) } /> 
        {/each}
    </svg>
    <ul class="legend">
        {#each data as d, index}
            <li style="--color: {colors(index)}">
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>



<style>
    svg {
        max-width: 20em;
        margin-block: 1em;
        overflow: visible;
    }
    .swatch {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: var(--color);
    }
    ul {
        list-style-type: none;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
        
    }
    .legend {
        padding: 0.5em;
        border: 1px solid black;
        flex: 1;
    }
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2em;
    }


</style>