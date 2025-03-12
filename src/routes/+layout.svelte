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
        { url: "https://github.com/ashi-kamra", title: "Github"}
    ];
    


    

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
{#await fetch("https://api.github.com/users/ashi-kamra") }
<p>Loading...</p>
{:then response} {#await response.json()}
<p>Decoding...</p>
{:then data}
<section>
    <h2> My Github Stats </h2>
    <dl>
      <dt>Followers:</dt>
      <dd>{data.followers}</dd>
      <dt>Following:</dt>
      <dd>{data.following}</dd>
      <dt>Public Repositories:</dt>
      <dd>{data.public_repos}</dd>
    </dl>
  
  </section>
{:catch error}
<p class="error">Something went wrong: {error.message}</p>
{/await} {:catch error}
<p class="error">Something went wrong: {error.message}</p>
{/await}

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