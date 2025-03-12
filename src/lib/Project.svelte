<script>
    export let data = {};
    export let hLevel = 2;
</script>

<article>
    <!-- need to change json file to add links for all pages -->
    <svelte:element this={"h" + hLevel}> <a href={data.url}> {data.title} </a></svelte:element>
    <img src={data.image} alt="">
    <br>
    <p>{data.description} </p>
</article>

<style>
    article {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
    }

    article h2 {
        margin: 0;
    }
    img {
        max-width: 100%;
    }
</style>