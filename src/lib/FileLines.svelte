<script>
    import * as d3 from "d3";

    export let lines = [];
    export let width;
    let svg;

    let files = [];
    $: files = d3.groups(lines, d => d.file)
        .map(([name, lines]) => ({name, lines}));

    $: if (svg) {
        const rowHeight = 30;
        const width = 400;
        const height = files.length * rowHeight;
        d3.select(svg)
            .attr('width', width)
            .attr('height', height);

        
        const groups = d3.select(svg)
            .selectAll('g.file')
            .data(files, d => d.name);
        
        groups.exit().remove();

        const enterGroups = groups.enter()
            .append('g')
            .attr('class', 'file')
            .attr('transform', (d, i) => `translate(0, ${i * rowHeight})`);

        enterGroups.append('text')
            .attr('class', 'filename')
            .attr('x', 10)
            .attr('y', rowHeight / 2)
            .attr('dominant-baseline', 'hanging')
            .text(d => d.name);

        enterGroups.append('text')
            .attr('class', 'linecount')
            .attr('x', 250) 
            .attr('y', rowHeight / 2)
            .attr('dominant-baseline', 'hanging')
            .text(d => `${d.lines.length} lines`);

        groups.attr('transform', (d, i) => `translate(0, ${i * rowHeight})`)
            .select('text.filename')
            .text(d => d.name);

        groups.select('text.linecount')
            .text(d => `${d.lines.length} lines`)
            .attr('x', 250);
    }
    

</script>

<dl class="files">
	{#each files as file (file.name) }
		<div class="block">
			<dt>
				<code>{file.name}</code>
			</dt>
			<dd>{file.lines.length} lines</dd>
		</div>
	{/each}
</dl>

<style>
    .block {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>