/* eslint-disable no-plusplus */
import gameboard from './gameboard';
import createPlayer from './player';

// Define type for the Player
type Player = ReturnType<typeof createPlayer>;
type Gameboard = ReturnType<typeof gameboard>;

const player: Player = createPlayer(false);
// const computer: Player = createPlayer(true);

const playerBoardElement = document.getElementById(
  'player-board'
) as HTMLElement;
const computerBoardElement = document.getElementById(
  'computer-board'
) as HTMLElement;

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

// Create boards
createBoard(playerBoardElement);
createBoard(computerBoardElement);

// Eventually loop through all ships and allow user to place them
const playerShip1 = player.gameboard.ships[0];
const playerShip2 = player.gameboard.ships[1];
const playerShip3 = player.gameboard.ships[2];
const playerShip4 = player.gameboard.ships[3];

// add the ships to the player board
player.gameboard.placeShip(playerShip1, 0, 0, 'horizontal');
player.gameboard.placeShip(playerShip2, 0, 2, 'vertical');
player.gameboard.placeShip(playerShip3, 7, 5, 'vertical');
player.gameboard.placeShip(playerShip4, 3, 3, 'horizontal');
// ships will be blue squares

// hide the ships on computer board

// hit will be red square

// miss will be gray square

// Function to update the board based on the game state
function updateBoard(boardElement: HTMLElement, gameboardState: Gameboard) {
  // Loop through the gameboard and update the DOM elements
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      const cellValue = gameboardState.board[y][x];
      // Check if cellValue is a Ship
      if (
        cellValue &&
        typeof cellValue === 'object' &&
        'length' in cellValue &&
        'timesHit' in cellValue
      ) {
        cell!.classList.add('ship');
      }
    }
  }
}

// Initial update to show ships on player's board
updateBoard(playerBoardElement, player.gameboard);

// If cell contains class 'ship' then it is a hit else miss
