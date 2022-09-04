import {getSurroundingCoordinates} from "./utils";

const visualNeighboursInGrid = (grid: any[][], neighbours: Array<Cell>) => {
    return grid.map((row, y) => {
        return row.map((cell, x) => {
            return neighbours.some(({x: nx, y: ny}) => nx === x && ny === y) ? 1 : 0;
        })
    })
}
const grid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
]
describe('getSurroundingCoordinates', () => {
    test('top-left corner', async () => {
        const neighbours = getSurroundingCoordinates({x: 0, y: 0}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 1],
        ])
    })
    test('bottom-left corner', async () => {
        const neighbours = getSurroundingCoordinates({x: 0, y: 4}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 1],
            [0, 1, 0, 0, 1],
        ])
    })

    test('bottom-right corner', async () => {
        const neighbours = getSurroundingCoordinates({x: 4, y: 4}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 0],
        ])
    })

    test('top-right corner', async () => {
        const neighbours = getSurroundingCoordinates({x: 4, y: 0}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 1, 1],
        ])
    })

    test('top-left', async () => {
        const neighbours = getSurroundingCoordinates({x: 1, y: 0}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ])
    })

    test('top-right', async () => {
        const neighbours = getSurroundingCoordinates({x: 3, y: 0}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 1, 0, 1],
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1],
        ])
    })

    test('right-top', async () => {
        const neighbours = getSurroundingCoordinates({x: 4, y: 1}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ])
    })
    test('right-bottom', async () => {
        const neighbours = getSurroundingCoordinates({x: 4, y: 3}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 1],
        ])
    })

    test('bottom-right', async () => {
        const neighbours = getSurroundingCoordinates({x: 3, y: 4}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1],
            [0, 0, 1, 0, 1],
        ])
    })

    test('bottom-left', async () => {
        const neighbours = getSurroundingCoordinates({x: 1, y: 4}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
        ])
    })

    test('left-bottom', async () => {
        const neighbours = getSurroundingCoordinates({x: 0, y: 3}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 1],
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
        ])
    })

    test('left-top', async () => {
        const neighbours = getSurroundingCoordinates({x: 0, y: 1}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 1, 0, 0, 1],
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ])
    })
    test('top-left center', async () => {
        const neighbours = getSurroundingCoordinates({x: 1, y: 1}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ])
    })
    test('bottom-left center', async () => {
        const neighbours = getSurroundingCoordinates({x: 1, y: 3}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
        ])
    })

    test('bottom-right center', async () => {
        const neighbours = getSurroundingCoordinates({x: 3, y: 3}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1],
            [0, 0, 1, 0, 1],
            [0, 0, 1, 1, 1],
        ])
    })

    test('top-right center', async () => {
        const neighbours = getSurroundingCoordinates({x: 3, y: 1}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 1, 1, 1],
            [0, 0, 1, 0, 1],
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ])
    })

    test('top-center', async () => {
        const neighbours = getSurroundingCoordinates({x: 2, y: 0}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
        ])
    })

    test('right-center', async () => {
        const neighbours = getSurroundingCoordinates({x: 4, y: 2}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
        ])
    })
    test('bottom-center', async () => {
        const neighbours = getSurroundingCoordinates({x: 2, y: 4}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
        ])
    })
    test('left-center', async () => {
        const neighbours = getSurroundingCoordinates({x: 0, y: 2}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 1],
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
        ])
    })

    test('top-center center', async () => {
        const neighbours = getSurroundingCoordinates({x: 2, y: 1}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ])
    })

    test('right-center center', async () => {
        const neighbours = getSurroundingCoordinates({x: 3, y: 2}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1],
            [0, 0, 1, 0, 1],
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
        ])
    })
    test('bottom-center center', async () => {
        const neighbours = getSurroundingCoordinates({x: 2, y: 3}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
        ])
    })
    test('left-center center', async () => {
        const neighbours = getSurroundingCoordinates({x: 1, y: 2}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ])
    })
    test('center', async () => {
        const neighbours = getSurroundingCoordinates({x: 2, y: 2}, grid)
        expect(visualNeighboursInGrid(grid, neighbours)).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ])
    })
})

