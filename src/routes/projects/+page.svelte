<script>
    import * as d3 from "d3"; 
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
    import Pie from "$lib/Pie.svelte";

    //filtering by search
    $: filteredProjects = projects.filter(project => {
        if (query) { //if query is not empty
            let values = Object.values(project).join("\n").toLowerCase(); //can search across meta data too!
            return values.includes(query.toLowerCase()); //our search! toLowerCase in both parts makes it case insensitive
        }

        return true;
    })

    let pieData;

    $:{
        pieData = {};

        //implementing pie chart with project data
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);

        pieData = rolledData.map(([year, count]) => {
            return {value: count, label: year};
        })
    }
        
    //implementing search
    let query = "";

    //implementing interactivity
    let selectedYearIndex = -1;

    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

    //filtering by selecting pie
    $: filteredByYear = filteredProjects.filter(project => {
        if (selectedYear) { //when no years are selected, just return all filtered projects
            return project.year === selectedYear;
        }

        return true;
    });


</script>

<svelte:head>
    <title>My Projects</title>
</svelte:head>

<h1>
    {projects.length} Projects
</h1>

<!-- binding the value to our query! so input value and variable will always be same -->
<input type="search" bind:value={query}
 aria-label="Search projects" placeholder="🔍 Search projects" />

<Pie data={pieData} bind:selectedIndex={selectedYearIndex}/>
<div class="projects">
    {#each filteredByYear as p}
        <Project data={p} />
    {/each}
</div>

<p>Reach me @ ashimak@mit.edu!</p>
<section class="resume-grid">
    <div class="resume-subgrid">
        <h2 class="resume-title"> Education </h2>
        <ul>
            <li>Computer Science and Economics @ Wellesley College 2022-2026</li>
            <li>Cross Registered @ MIT</li>
        </ul>
    </div>
    <div class="resume-subgrid">
        <h2 class="resume-title"> Technical Skills </h2>
        <ul>
            <li>Front-End Development</li>
            <li>Data Visualization</li>
            <li>UI/UX</li>
            <li>Machine Learning/AI</li>
        </ul>
    </div>
    <div class="resume-subgrid">
        <h2 class="resume-title"> Experience </h2>
        <ul>
            <li>Undergraduate Research Developer @ MIT Center for Constructive Communication</li> 
            
            <li>Data Structures Teaching Assistant</li>
            <li>Web Developer for WHACK 2023</li>
        </ul>
    </div>
    <div class="resume-subgrid">
        <h2 class="resume-title"> Projects </h2>
        <ul>
            <li>Cash Course: An AI-Powered Financial Literacy Platform built @ WHACK 2024</li>
        </ul>
    </div>
</section>

<style>
    input {
        width: 100%;
        height: 2em;
        font-family: system-ui;
        font-weight: bold;
    }
</style>