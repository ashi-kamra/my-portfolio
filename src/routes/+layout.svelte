<script>
    import { page } from "$app/stores";
    let root = globalThis?.document?.documentElement;
    
    $: root?.style.setProperty("color-scheme", colorScheme);

    let localStorage = globalThis.localStorage ?? {};

    let colorScheme = localStorage.colorScheme ? localStorage.colorScheme : "light dark";

    $: localStorage.colorScheme = colorScheme;

    let pages = [
        { url: "./", title: "Home"},
        { url: "./projects", title: "Projects"},
        { url: "./contact", title: "Contact"},
        { url: "./meta", title: "Meta"},
        { url: "https://github.com/ashi-kamra", title: "Github"}
    ];
    import { onMount } from "svelte";

    let githubData = null;
    let loading = true;
    let error = null;

    onMount(async () => {
      try {
        const response = await fetch("https://api.github.com/users/ashi-kamra");
        githubData = await response.json();
      } catch (err) {
        error = err;
      }
      loading = false;
    });


    

</script>

<label class="color-scheme">
    Theme:
    <select bind:value={ colorScheme }>
        <option value="light dark">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
</label>
<nav>
    {#each pages as p}
        <a href="{p.url}" class:current={"." + $page.route.id === p.url} target={p.url.startsWith("http") ? "_blank" : null}>
            {p.title}
        </a>
    {/each}
</nav>
{#if loading}
    <p>Loading...</p>
{:else if error}
    <p class="error">Something went wrong: {error.message}</p>
{:else}
    <section>
        <h2>My GitHub Stats</h2>
        <dl>
            <dt>Followers</dt>
            <dd>{githubData.followers}</dd>
            <dt>Following</dt>
            <dd>{githubData.following}</dd>
            <dt>Public Repositories</dt>
            <dd>{githubData.public_repos}</dd>
        </dl>
    </section>
{/if}


<slot />

<style>
nav {
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  --border-color: oklch(65.29% 0.1845 5.39 / 40%);
  border-bottom-color: var(--border-color);
}

nav a {
  flex: 1;
  text-decoration: none;
  color: inherit;
  text-align: center;
  padding: 0.5em;
}

nav a:hover {
  background-color: color-mix(in oklch, var(--color-accent), canvas 75%);
  border-bottom: 5px solid grey;
}

.current {
  border-bottom-width: 5px;
  border-bottom-style: solid;
  border-bottom-color: #E75480;
  padding-bottom: -2em;
}

label {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  
}

label.color-scheme {
  position: absolute;
  top: 2rem;
  right: 3rem;
  display: inline-flex;
  gap: 4px;
}

dl {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px
}

dd {
  display: subgrid;
  color: #E75480
}


</style>