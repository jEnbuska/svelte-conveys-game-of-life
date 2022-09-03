type Coordinate<T extends Record<string, any> = Record<string, unknown>> = T & {
    x: number;
    y: number
}

export function getSurroundingCoordinates({x, y}: Coordinate, grid: unknown[][]) {
    const maxY = grid.length
    const maxX = grid[0].length
    const left = x === 0 ? maxX - 1 : x - 1
    const right = x === maxX - 1 ? 0 : x + 1
    const top = y === 0 ? maxY - 1 : y - 1
    const bottom = y === maxY - 1 ? 0 : y + 1
    const coords = [
        {x: left, y: top},      {x, y: top},    {x: right, y: top},
        {x: left, y},                           {x: right, y},
        {x: left, y: bottom},   {x, y: bottom}, {x: right, y: bottom}
    ]
    return coords
}

export function replaceByIndex<T>(array: T[], arg: {value: T, index: number}) {
    const {value, index} = arg;
    return [
        ...array.slice(0, index),
        value,
        ...array.slice(index + 1)
    ]
}

const countLiveNeighbours = ({x, y}: Coordinate, grid: boolean[][]) => {
    return getSurroundingCoordinates({x, y}, grid).filter(({x, y}) => grid[y][x]).length
}


export const shouldCellDie = ({x, y, live}: Coordinate<{ live: boolean }>, grid: boolean[][]) => {
    if (!live) return false;
    const liveNeighbours = countLiveNeighbours({x, y}, grid)
    return liveNeighbours < 2 || liveNeighbours > 3
}

export const shouldCellComeToLife = ({x, y, live}: Coordinate<{ live: boolean }>, grid: boolean[][]) => {
    if (live) return false;
    const liveNeighbours = countLiveNeighbours({x, y}, grid)
    return liveNeighbours === 3
}
export const range = (to: number) => {
    const acc: number[] = []
    for(let i = 0; i<to; i++) {
        acc.push(i)
    }
    return acc;
}
