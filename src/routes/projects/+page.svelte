<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
    import Pie from "$lib/Pie.svelte";
</script>

<svelte:head>
    <title>My Projects</title>
</svelte:head>

<h1>
    {projects.length} Projects
</h1>

<Pie />

<div class="projects">
    {#each projects as p}
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