<script lang="ts">
	import {range} from 'lodash'

	import Cell from './Cell.svelte';
	import type {GridCell} from "./types";
	import {replaceByIndex} from "../lib/utils";
	import {getSurroundingCoordinates} from "../lib/utils";

	let width = 100;
	let height = 100;
	let cellPercentageSize = 3;
	let tick = 200;
	let initialFill = 13

	$: maxX = Math.floor(100 / cellPercentageSize)
	$: cellSizePx = width / maxX;
	$: maxY = Math.floor(height / cellSizePx);
	$: grid = range(0, maxY).map((y) => range(0, maxX).map((x) => ({id: `${y}-${x}`, live: Math.random() < (initialFill / 100), y, x})))

	const createGrid = () => {
		grid = range(0, maxY).map((y) => range(0, maxX).map((x) => ({id: `${y}-${x}`, live: Math.random() < (initialFill / 100), y, x})))
	}

	const setCellLive = ({y,x, live}: GridCell) => {
		const cell = {...grid[y][x], live}
		const row = replaceByIndex(grid[y], {index: x, value: cell});
		grid = replaceByIndex(grid, {index: y, value: row});
	};

	const onCellSelected = (cell: GridCell) => {
		setCellLive({...cell, live: true});
	};

	let handle: any = 0;
	$: {
		clearInterval(handle);
		handle = setInterval(() =>
			grid.flat().forEach((cell) => {
				const {x, y} = cell;
				const coordinates = getSurroundingCoordinates({x, y, maxX, maxY});
				const liveNeighbors = coordinates.reduce((acc, {x, y}) => {
					return grid[y][x].live ? acc + 1 : acc
				}, 0);
				let {live} = cell
				if(live) {
					if (liveNeighbors < 2 || liveNeighbors > 3) {
						setCellLive({...cell, live: false});
					}
				} else {
					if (liveNeighbors === 3) {
						setCellLive({...cell, live: true});
					}
				}
			})
		, tick);
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
		{#each grid as row, i (i)}
			<div class="row">
				{#each row as cell (cell.id)}
					<Cell {cell} {onCellSelected} />
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
			<div>Cell size: {cellPercentageSize}%</div>
			<input type="range" bind:value={cellPercentageSize} min="2" max="10"  />
		</label>
		<label>
			<div>Initial fill: {initialFill}%</div>
			<input type="range" bind:value={initialFill} min="4" max="60"  />
		</label>
		<button on:click="{createGrid}">Restart</button>
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
