<script lang="ts">
	import {range} from 'lodash'
	import Cell from './Cell.svelte';
	import {replaceByIndex, shouldCellComeToLife, shouldCellDie} from "../lib/utils";

	let width = 100;
	let height = 100;
	let tick = 200;
	let initialFill = 13
	let maxX = 10

	$: cellSizePx = width / maxX;
	$: maxY = Math.floor(height / cellSizePx);
	$: grid = range(0, maxY).map(() => range(0, maxX).map(() => Math.random() < (initialFill / 100)))

	const createGrid = () => {
		stopped = false;
		grid = range(0, maxY).map(() => range(0, maxX).map(() => Math.random() < (initialFill / 100)))
	}

	const setCellLive = ({y,x, live}) => {
		const row = replaceByIndex(grid[y], {index: x, value: live});
		grid = replaceByIndex(grid, {index: y, value: row});
	};

	const onCellSelected = (cell) => {
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

<div class="game-of-life-page">
	<div class="board" tabindex="0"
		 style="--tick: {tick}ms; --cell-size: {cellSizePx}px">
		{#each grid as row, y (y)}
			<div class="row">
				{#each row as live, x (x)}
					<Cell {live} {x} {y} {onCellSelected} />
				{/each}
			</div>
		{/each}
	</div>
	<div class="options">
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
		<button on:click="{createGrid}">Restart</button>
		<button on:click="{toggleStop}">{stopped ? 'Continue' : 'Stop'}</button>
	</div>
</div>

<style>
	.options {
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(185, 198, 210, 0.6);
		padding: 16px;
		border-radius: 8px;
		margin: 8px;
	}
	.game-of-life-page {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
	.row {
		height: var(--cell-size);
	}
	.board {
		position: relative;
		cursor: pointer;
		overflow: visible;
	}
</style>
