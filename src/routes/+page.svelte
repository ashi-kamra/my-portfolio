<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";



</script>

<svelte:head>
    <title>Home Page</title>
</svelte:head>

<h1>Ashi Kamra: Personal Site and Portfolio</h1>
<p>CS & Econ Student @ Wellesley taking Viz & Society!</p>
<img src="images/me-2 copy.png" height= "450px" alt="me holding a flower">

<h2>A Glimpse of My Work</h2>
<div class="projects">
    {#each projects.slice(0,3) as p}
        <Project data={p} hLevel="3"/>
    {/each}
</div>

