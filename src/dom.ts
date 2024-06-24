/* eslint-disable no-plusplus */
import createPlayer from './player';

// Define type for the Player
type Player = ReturnType<typeof createPlayer>;

// Function to create the board in the DOM
function createBoard(boardElement: HTMLElement): void {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x.toString();
      cell.dataset.y = y.toString();
      boardElement.appendChild(cell);
    }
  }
}

// Update the updateBoard function to properly update the UI
function updateBoard(playerType: Player, boardElement: HTMLElement) {
  // Loop through the gameboard and update the DOM elements
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      const cellValue = playerType.gameboard.board[y][x];

      // Reset cell classes
      cell!.classList.remove('hit', 'miss', 'ship');

      // Update cell classes based on gameboard state
      if (cellValue === true) {
        cell!.classList.add('hit');
      } else if (cellValue === false) {
        cell!.classList.add('miss');
      } else if (
        cellValue &&
        typeof cellValue === 'object' &&
        'length' in cellValue &&
        'timesHit' in cellValue
      ) {
        if (!playerType.isComputer) {
          cell!.classList.add('ship');
        }
      }
    }
  }
}

export { createBoard, updateBoard };
