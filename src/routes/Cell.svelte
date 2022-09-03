<script lang="ts">
    import type {GridCell} from "./types";
    export let cell: GridCell
    export let onCellSelected: (cell: GridCell) => void
    const onMouseSelect = (e: MouseEvent) => {
        if (!e.buttons) return;
        if (cell.live) return;
        onCellSelected(cell)
    }
</script>
<svelte:options immutable/>
<span
    class="cell"
    class:live={cell.live}
    class:dead={!cell.live}
    on:click={onMouseSelect}
    on:mousemove={onMouseSelect}
    tabindex="0"
>
</span>
<style>
    .cell {
        cursor: pointer;
        user-select: none;
        display: inline-block;
        box-sizing: border-box;
        height: 100%;
        width: var(--cell-size);
        margin: 0;
        padding: 0;
        position: relative;
        transition: transform var(--tick) ease-in-out;
    }
    .cell:after {
        position: absolute;
        width: 100%;
        height: 100%;
        content: '';
        display: inline-block;
        background: black;
        transition: transform var(--tick) ease-in-out, border-radius var(--tick) ease-in-out;
    }
    .dead:after {
        transform: scale(0);
        border-radius: 50%;
    }
    .live:after {
        transform: scale(1);
        border-radius: 0;
    }
</style>
