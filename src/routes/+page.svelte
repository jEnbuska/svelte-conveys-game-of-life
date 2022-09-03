<script lang="ts">
	import {range, replaceByIndex, shouldCellComeToLife, shouldCellDie} from "../lib/utils";
	import Row from "./Row.svelte";
	import { GridCell } from "../lib/types";

	let width = 100;
	let height = 100;
	let tick = 200;
	let initialFill = 13
	let maxX = 10

	$: cellSizePx = width / maxX;
	$: maxY = Math.floor(height / cellSizePx);
	$: grid = range(maxY).map(() => range(maxX).map(() => Math.random() < (initialFill / 100)))

	const createGrid = () => {
		stopped = false;
		grid = range(maxY).map(() => range(maxX).map(() => Math.random() < (initialFill / 100)))
	}

	const setCellLive = ({y,x, live}: GridCell) => {
		const row = replaceByIndex(grid[y], {index: x, value: live});
		grid = replaceByIndex(grid, {index: y, value: row});
	};

	const onCellSelected = (cell: GridCell) => {
		setCellLive({...cell, live: true});
	};

	let stopped = false
	let handle: any = 0;
	const toggleStop = () => {
		stopped = !stopped
	}
	$: {
		clearInterval(handle);
		if (!stopped) {
			handle = setInterval(() => {
				const gridCopy = [...grid]
				grid.forEach((row, y) => row.forEach((live, x) => {
					if (shouldCellDie({y, x, live}, gridCopy)) {
						setCellLive({x, y, live: false});
					} else if (shouldCellComeToLife({y, x, live}, gridCopy)) {
						setCellLive({x, y, live: true});
					}
				}))
			}, tick);
		}
	}
</script>

<svelte:head>
	<title>Game of Life</title>
	<meta name="description" content="Conway's game of life" />
</svelte:head>
<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div
	class="game-of-life-page"
	style="--tick: {tick}ms; --cell-size: {cellSizePx}px"
>
	<div class="board">
		<Row row={grid[grid.length-1]} y={grid.length-1} {onCellSelected} />
		{#each grid as row, y (y)}
			<Row {row} {y} {onCellSelected} />
		{/each}
		<Row row={grid[0]} y={0} {onCellSelected} />
	</div>
	<div class="settings">
		<div class="buttons">
			<button on:click="{createGrid}">Restart</button>
			<button on:click="{toggleStop}">{stopped ? 'Continue' : 'Stop'}</button>
		</div>
		<label>
			<div>Tick speed: {tick}ms</div>
			<input type="range" bind:value={tick} min="10" max="1000"  />
		</label>
		<label>
			<div>Cells per row: {maxX}</div>
			<input type="range" bind:value={maxX} min="10" max="50"  />
		</label>
		<label>
			<div>Initial fill: {initialFill}%</div>
			<input type="range" bind:value={initialFill} min="4" max="60"  />
		</label>
	</div>
</div>

<style>
	.settings {
		position: absolute;
		top: 0;
		left: 0;
		display: grid;
		grid-gap: 8px;
		background: rgba(185, 198, 210, 0.6);
		padding: 8px;
		border-radius: 8px;
		margin: 8px;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 4px;
	}
	.game-of-life-page {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
	.board {
		position: relative;
		cursor: pointer;
		overflow: visible;
	}
</style>
