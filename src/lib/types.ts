export type Coordinates = {
  x: number;
  y: number;
}

export type GridCell = Coordinates &{
  live: boolean;
}
