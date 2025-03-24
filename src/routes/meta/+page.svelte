<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let data = [];
    let commits = [];
    let files = [];

    onMount(async () => {
        data = await d3.csv("/loc.csv", row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        })); //row conversion function
        //collecting all data about commits
        commits = d3.groups(data, d => d.commits).map(([commit, lines]) => {
            let first = lines[0];
            let {author, date, time, timezone, datetime} = first;
            let ret = {
                id: commits,
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

</script>

<h1>Meta Data</h1>
<dl class="stats">
    <dt> Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{data.length}</dd>
    <dt> Total Number of Files</dt>
    <dd>{files.length}</dd>
</dl>

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
</style>