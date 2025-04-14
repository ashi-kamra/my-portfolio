<script>
    import * as d3 from "d3";
    import {
        computePosition,
        autoPlacement,
        offset
    } from '@floating-ui/dom';

    export let filteredCommits = [];
    export let clickedCommits = [];
    let width = 1000, height = 600; //defining borders


    //adding space for axes
    let margin = {top: 10, right: 10, bottom: 30, left: 20}; 
    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;
    let xAxis, yAxis, yAxisGridlines;
    $: {
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d%24).padStart(2,"0")+":00"));
    }
    $: {
        d3.select(yAxisGridlines).call(
            d3.axisLeft(yScale)
                .tickFormat("")
                .tickSize(-usableArea.width)
        );
    }

    //better tooltip functionality
    let commitTooltip;
    let tooltipPosition = {x: 0, y: 0};
    async function dotInteraction(index, evt) {
        let hoveredDot = evt.target;
        if (evt.type === "mouseenter") {
            hoveredIndex = index;
            tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
                strategy: "fixed",
                middleware: [
                    offset(5), // spacing from tooltip to dot
                    autoPlacement() // see https://floating-ui.com/docs/autoplacement
                ],
            });
        }
        else if (evt.type === "mouseleave") {
            hoveredIndex = -1;
        }
        else if (evt.type === "click") {
            let commit = commits[index]
            if (!clickedCommits.includes(commit)) {
                clickedCommits = [...clickedCommits, commit];
            } else {
                clickedCommits = clickedCommits.filter(c => c !== commit);
            }
        }
    }

    //adding tooltip functionality
    let hoveredIndex = -1;
    $: hoveredCommit = filteredCommits[hoveredIndex] ?? hoveredCommit ?? {};


    // $: minDate = d3.min(commits.map(d => d.date));
    // $: maxDate = d3.max(commits.map(d => d.date));
    // $: maxDatePlusOne = new Date(maxDate);
    // $: maxDatePlusOne.setDate(maxDatePlusOne.getDate() + 1);

    $: minDate_filtered = d3.min(filteredCommits.map(d=>d.date));
    $: maxDate_filtered = d3.max(filteredCommits.map(d=>d.date));
    $: maxDatePlusOne_filtered = new Date(maxDate_filtered);
    $: maxDatePlusOne_filtered.setDate(maxDatePlusOne_filtered.getDate() + 1);


    $: xScale = d3.scaleTime()
        .domain([minDate_filtered, maxDatePlusOne_filtered])
        .range([usableArea.left, usableArea.right])
        .nice(); //rounds domain to "nice" round values

    $: yScale = d3.scaleLinear()
        .domain([24, 0])
        .range([usableArea.bottom, usableArea.top]); //maps the 24 hrs values to fit the height values of our chart


</script>


<dl class="info tooltip" bind:this={commitTooltip} hidden={hoveredIndex === -1} style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px">
    <dt>Commit:</dt>
	<dd><a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a></dd>
    <dt>Date:</dt>
    <dd>{hoveredCommit.datetime?.toLocaleString("en", {dateStyle: "full"})}</dd>
    <dt>Time:</dt>
    <dd>{hoveredCommit.time?.toLocaleString("en", {dateStyle: "full"})}</dd>
    <dt>Author:</dt>
    <dd>{hoveredCommit.author}</dd>
</dl>

<svg viewBox="0 0 {width} {height}">
    <h3>Commits by Time of Day</h3>
    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis}/>
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines}/>
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis}/>
    <g class="dots">  <!-- grouping svg elements together -->
       {#each filteredCommits as commit, index (commit.id) }
        <circle 
            class:selected={ clickedCommits.includes(commit)}
            on:mouseenter={evt => dotInteraction(index, evt)}
            on:mouseleave={evt => dotInteraction(index, evt)}
            on:click={ evt => dotInteraction(index, evt) }
            cx={ xScale(commit.datetime) }
            cy={ yScale(commit.hourFrac) }
            r="6"
            fill="grey" 
        />
       {/each}
    </g>
    
    
</svg>

<style>
    svg {
        overflow: visible;
    }

    .gridlines{
        stroke-opacity: .2;
    }

    circle {
        transition: 200ms;
        transform-origin: center;
        transform-box: fill-box;

        &:hover {
            transform: scale(1.5);
            opacity: 0.5;
        }

        @starting-style {
            r: 0;
        }

    }

    dl.info {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 5px; /* Or use column-gap specifically for horizontal spacing */
        background-color: oklch(88.67% 0.0407 12.71 / 38.86%);
        width: fit-content;
        padding: 1em;
        border-radius: 5px;
        box-shadow: 0px 1px 8px oklch(46% 0 21.18 / 74.08%);
        transition-duration: 500ms;
        transition-property: opacity, visibility;
        position: fixed;

        &[hidden]:not(:hover, :focus-within) {
            opacity: 0;
            visibility: hidden;
        }
    }

    .info dt {
        font-style: italic;
    }

    .info dd {
        display: subgrid;   
    }

    .selected {
        fill: #E75480;
    }


</style>