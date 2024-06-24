import createPlayer from './player';
import { createBoard, updateBoard } from './dom';

// Define type for the Player
type Player = ReturnType<typeof createPlayer>;

// Initialize the game state
let gameStarted = false;

function initializeGame() {
  const user: Player = createPlayer(false);
  const computer: Player = createPlayer(true);

  const userBoardElement = document.getElementById('user-board') as HTMLElement;
  const computerBoardElement = document.getElementById(
    'computer-board'
  ) as HTMLElement;
  const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
  const randomizeBtn = document.getElementById(
    'randomize-btn'
  ) as HTMLButtonElement;

  createBoard(userBoardElement);
  createBoard(computerBoardElement);

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

  // Place ships for user and computer
  placeShips(user);
  placeShips(computer);

  // Check for game over condition
  function checkGameOver() {
    if (user.gameboard.allShipsSunk()) {
      alert('Computer wins!');
      return true;
    }
    if (computer.gameboard.allShipsSunk()) {
      alert('User wins!');
      return true;
    }
    return false;
  }

  // AI random attack logic
  function aiRandomAttack() {
    let x;
    let y;
    let isHit;

    // Keep generating random coordinates until a valid attack is made
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      isHit = user.gameboard.receiveAttack(x, y);
    } while (!isHit);

    // Update the user board UI based on the attack result
    updateBoard(user, userBoardElement);
  }

  // Add event listener for the randomize ships button
  randomizeBtn.addEventListener('click', () => {
    // Randomize the board if game has not been started
    if (!gameStarted) {
      user.gameboard.clearBoard(); // Clear the current board
      placeShips(user); // Place ships randomly
      updateBoard(user, userBoardElement); // Update the board UI
    } else {
      // Confirm with the user if they want to restart the game
      const confirmRestart = confirm(
        'The game has already been started. Would you like to restart?'
      );
      if (confirmRestart) {
        // Reload the window to reset the game
        window.location.reload();
      }
    }
  });

  // Event handler for the start button
  startBtn.addEventListener('click', () => {
    if (!gameStarted) {
      gameStarted = true;
      // Add event listener to the computer board for user attacks
      computerBoardElement.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const { x, y } = target.dataset;
        const isHit = computer.gameboard.receiveAttack(Number(x), Number(y));

        if (x !== undefined && y !== undefined && isHit) {
          updateBoard(computer, computerBoardElement);

          if (checkGameOver()) return;

          // Implement AI attack logic for computer's turn
          setTimeout(() => {
            aiRandomAttack();
            // eslint-disable-next-line no-useless-return
            if (checkGameOver()) return;
          }, 500); // Add a slight delay for AI's move
        }
      });
    }
  });

  // Initial update to show ships on user's board
  updateBoard(user, userBoardElement);
  updateBoard(computer, computerBoardElement);
}

export default initializeGame;
