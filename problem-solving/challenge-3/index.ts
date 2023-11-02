export function findLessCostPath(board: number[][]) {
  // Create a 2D array to store the cost of each path.
  const costTable = new Array(board.length).fill(new Array(board[0].length).fill(Infinity));

  // Initialize the cost of the starting cell to 0.
  costTable[0][0] = 0;

  // Create a queue to store the cells that need to be visited.
  const queue = [];
  queue.push([0, 0]);

  // While the queue is not empty, do the following:
  let currentCell
  while (queue.length > 0) {
    // Get the current cell from the queue.
    const currentCell = queue.shift() as number[];

    // Check if the current cell is the goal cell.
    if (currentCell[0] === board.length - 1 && currentCell[1] === board[0].length - 1) {
      // Return the cost of the current cell.
      return costTable[currentCell[0]][currentCell[1]];
    }

    // For each neighbor of the current cell, do the following:
    for (const neighbor of [[currentCell[0] - 1, currentCell[1]], [currentCell[0] + 1, currentCell[1]], [currentCell[0], currentCell[1] - 1], [currentCell[0], currentCell[1] + 1]]) {
      // If the neighbor is within the bounds of the board and its cost is less than the cost of the current cell, do the following:
      if (neighbor[0] >= 0 && neighbor[0] < board.length && neighbor[1] >= 0 && neighbor[1] < board[0].length && costTable[neighbor[0]][neighbor[1]] > costTable[currentCell[0]][currentCell[1]] + board[neighbor[0]][neighbor[1]]) {
        // Update the cost of the neighbor.
        costTable[neighbor[0]][neighbor[1]] = costTable[currentCell[0]][currentCell[1]] + board[neighbor[0]][neighbor[1]];

        // Add the neighbor to the queue.
        queue.push(neighbor);
      }
    }
  }

  // Return the cost of the current cell.
  //@ts-ignore
  return costTable[currentCell[0]][currentCell[1]];
}