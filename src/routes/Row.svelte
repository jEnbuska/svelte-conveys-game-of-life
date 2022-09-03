<script lang="ts">
    import Cell from "./Cell.svelte";

    export let row: boolean[] = []
    export let y: number;
    export let onCellSelected: (arg: {x: number, y: number}) => unknown;

</script>

<div class="row">
    <Cell live={row[row.length-1]} x={row.length-1} {y} {onCellSelected} />
    {#each row as live, x (x)}
        <Cell {live} {x} {y} {onCellSelected} />
    {/each}
    <Cell live={row[0]} x={0} {y} {onCellSelected} />
</div>


<style>
    .row {
        top: calc(var(--cell-size) / -2);
        display: flex;
        position: relative;
        left: calc(var(--cell-size) / -2);
        width: calc(100% + var(--cell-size) * 3);
        height: var(--cell-size);
    }
</style>
