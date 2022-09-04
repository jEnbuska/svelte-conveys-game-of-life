export {};

declare global {
  interface CellCoordinates {
    x: number;
    y: number;
  }

  interface GridCell extends CellCoordinates {
    live: boolean;
  }
}
