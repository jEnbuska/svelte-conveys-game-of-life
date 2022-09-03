export function getSurroundingCoordinates(arg: {x: number, y: number, maxX: number, maxY: number}) {
    const {x, y, maxX, maxY} = arg;
    const left = x === 0 ? maxX - 1 : x - 1
    const right = x === maxX - 1 ? 0 : x + 1
    const top = y === 0 ? maxY - 1 : y - 1
    const bottom = y === maxY - 1 ? 0 : y + 1
    const coords = [
        {x: left, y: top}, {x, y: top}, {x: right, y: top},
        {x: left, y}, {x: right, y},
        {x: left, y: bottom}, {x, y: bottom}, {x: right, y: bottom}
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


