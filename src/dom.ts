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

// Automatically place the ships for now
function placeShips(playerType: Player) {
  // Eventually loop through all ships and allow user to place them
  const playerTypeShip1 = playerType.gameboard.ships[0];
  const playerTypeShip2 = playerType.gameboard.ships[1];
  const playerTypeShip3 = playerType.gameboard.ships[2];
  const playerTypeShip4 = playerType.gameboard.ships[3];

  // check if ship can actually be placed on baord
  // add the ships to the user board
  playerType.gameboard.placeShip(playerTypeShip1, 0, 0, 'horizontal');
  playerType.gameboard.placeShip(playerTypeShip2, 0, 2, 'vertical');
  playerType.gameboard.placeShip(playerTypeShip3, 7, 5, 'vertical');
  playerType.gameboard.placeShip(playerTypeShip4, 3, 3, 'horizontal');
}

// Function to update the board based on the game state
function updateBoard(playerType: Player, boardElement: HTMLElement) {
  // Loop through the gameboard and update the DOM elements
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      const cellValue = playerType.gameboard.board[y][x];

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

export { createBoard, updateBoard, placeShips };
