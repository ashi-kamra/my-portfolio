<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import {
        computePosition,
        autoPlacement,
        offset
    } from '@floating-ui/dom';
    import { base } from '$app/paths';
    import Bar from '$lib/Bar.svelte';
    import Scatterplot from "./Scatterplot.svelte";
    import FileLines from "$lib/FileLines.svelte";

    let data = [];
    let commits = [];
    let clickedCommits = [];
    let files = [];
    let width = 1000, height = 600; //defining borders

    let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
        .range(d3.schemeTableau10);


    //scrollytelling 
    let commitProgress = 100;
    $: timeScale = d3.scaleTime()
        .domain([minDate, maxDatePlusOne])
        .range([0, 100])
        .nice()

    $: commitMaxTime = timeScale.invert(commitProgress);

    $: timeFilterLabel = commitMaxTime.toLocaleString("en", {dateStyle: "long", timeStyle: "short"});

    $: filteredCommits = commits.filter(commit => commit.datetime <= commitMaxTime);
    $: filteredLines = data.filter(point => point.datetime <= commitMaxTime);


    onMount(async () => {
        data = await d3.csv(`${base}/loc.csv`, row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        })); //row conversion function

        //collecting all data about commits
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
            let first = lines[0];
            let {author, date, time, timezone, datetime} = first;
            let ret = {
                id: commit, //commit, not commits, otherwise that sets id = the entire array
                url: "https://github.com/vis-society/lab-7/commit/" + commit,
		        author, date, time, timezone, datetime,
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                totalLines: lines.length
            };

            Object.defineProperty(ret, "lines", {
                value: lines,
                configurable: true,
                writable: true,
                enumerable: false,
            });

            return ret;
        });
        
        files = d3.groups(data, (d) => d.file); //collecting the dif files
    })

    $: minDate = d3.min(commits.map(d => d.date));
    $: maxDate = d3.max(commits.map(d => d.date));
    $: maxDatePlusOne = new Date(maxDate);
    $: maxDatePlusOne.setDate(maxDatePlusOne.getDate() + 1);

    //barchart functionality
    $: allTypes = Array.from(new Set(data.map(d => d.type))); //extracting all programming languages in project
    $: selectedLines = (clickedCommits.length > 0 ? clickedCommits : commits).flatMap(d => d.lines);//determine which commits should be included
    $: selectedCounts = d3.rollup(
        selectedLines,
        v => v.length,
        d => d.type
    );
    $: languageBreakdown = allTypes.map(type => [type, selectedCounts.get(type) || 0]); //including languages even if they have no LOCs

</script>

<h1>Meta Data</h1>
<dl class="stats">
    <dt> Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{filteredLines.length}</dd>
    <dt> Total Number of Files</dt>
    <dd>{files.length}</dd>
</dl>

<div class="slider-container">
    <label>Show commits until:</label>
    <input id="slider" type="range" min=0 max=100 bind:value={commitProgress}>
    <time>{timeFilterLabel}</time>
</div>

<FileLines lines={filteredLines} width={width} colorScale={colorScale}/>

<Scatterplot filteredCommits={filteredCommits} bind:clickedCommits={clickedCommits} />

<Bar data={languageBreakdown} width={width} colorScale={colorScale}/>

<style>
    .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }

    .stats dt {
        font-weight: bold;
    }

    .stats dd {
        display: subgrid;
        color: #E75480;    
    }

    .slider-container {
        display: grid;
        grid-template-columns: 1fr 3fr;
        white-space: nowrap;
    }

    #slider {
        display: flex;
        flex: 1;
        
    }


</style>