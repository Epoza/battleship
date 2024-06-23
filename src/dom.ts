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

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOrientation(): 'horizontal' | 'vertical' {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical';
}

// Function that randomly places ships onto gameboard
function placeShips(playerType: Player) {
  playerType.gameboard.ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      const x = getRandomInt(0, 9);
      const y = getRandomInt(0, 9);
      const orientation = getRandomOrientation();
      placed = playerType.gameboard.placeShip(ship, x, y, orientation);
    }
  });
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
