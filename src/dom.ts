/* eslint-disable no-plusplus */
import createPlayer from './player';

// Define type for the Player
type Player = ReturnType<typeof createPlayer>;

const player: Player = createPlayer(false);
const computer: Player = createPlayer(true);

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

// check if ship can actually be placed on baord
// add the ships to the player board
player.gameboard.placeShip(playerShip1, 0, 0, 'horizontal');
player.gameboard.placeShip(playerShip2, 0, 2, 'vertical');
player.gameboard.placeShip(playerShip3, 7, 5, 'vertical');
player.gameboard.placeShip(playerShip4, 3, 3, 'horizontal');

// Function to update the board based on the game state
function updateBoard(playerType: Player, boardElement: HTMLElement) {
  // Loop through the gameboard and update the DOM elements
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      const cellValue = playerType.gameboard.board[y][x];

      if (
        cellValue &&
        typeof cellValue === 'object' &&
        'length' in cellValue &&
        'timesHit' in cellValue
      ) {
        if (!playerType.isComputer) {
          cell!.classList.add('ship');
        }
      } else if (cellValue === false) {
        cell!.classList.add('miss');
      } else if (cellValue === true) {
        cell!.classList.add('hit');
      }
    }
  }
}

// Initial update to show ships on player's board
updateBoard(player, playerBoardElement);

// put computer ships on board
const computerShip1 = computer.gameboard.ships[0];
const computerShip2 = computer.gameboard.ships[1];
const computerShip3 = computer.gameboard.ships[2];
const computerShip4 = computer.gameboard.ships[3];

// check if ship can actually be placed on baord
// add the ships to the computer board
computer.gameboard.placeShip(computerShip1, 0, 0, 'horizontal');
computer.gameboard.placeShip(computerShip2, 0, 2, 'vertical');
computer.gameboard.placeShip(computerShip3, 7, 5, 'vertical');
computer.gameboard.placeShip(computerShip4, 3, 3, 'horizontal');

updateBoard(computer, computerBoardElement);

computerBoardElement.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const { x } = target.dataset;
  const { y } = target.dataset;

  if (x !== undefined && y !== undefined) {
    const hit = computer.gameboard.receiveAttack(Number(x), Number(y));
    updateBoard(computer, computerBoardElement);

    if (hit) {
      target.classList.add('hit');
    } else {
      target.classList.add('miss');
    }
  }
});
