<script lang="ts">
    export let x: number;
    export let y: number;
    export let live: boolean;
    export let onCellSelected: (cell: GridCell) => void

    const onMouseSelect = (e: MouseEvent) => {
        if (!e.buttons && e.type !== 'click') return;
        if (live) return;
        onCellSelected({x, y, live})
    }
</script>
<svelte:options immutable/>
<span
    class="cell"
    class:live={live}
    class:dead={!live}
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
        transition:
                scale var(--tick) ease-in-out,
                border-radius var(--tick) ease-in-out,
                opacity var(--tick) ease-in-out;
    }
    .dead:after {
        scale: 0;
        border-radius: 50%;
        opacity: 0;
    }
    .live:after {
        scale: 1;
        border-radius: 10%;
        opacity: 1;
    }
</style>
