import createPlayer from './player';
import { createBoard, updateBoard, placeShips } from './dom';

// Define type for the Player
type Player = ReturnType<typeof createPlayer>;

function initializeGame() {
  const user: Player = createPlayer(false);
  const computer: Player = createPlayer(true);

  const userBoardElement = document.getElementById('user-board') as HTMLElement;
  const computerBoardElement = document.getElementById(
    'computer-board'
  ) as HTMLElement;

  createBoard(userBoardElement);
  createBoard(computerBoardElement);

  // Place ships for user and computer
  placeShips(user);
  placeShips(computer);

  // Initial update to show ships on user's board
  updateBoard(user, userBoardElement);
  updateBoard(computer, computerBoardElement);

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
    let result;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      const hit = computer.gameboard.receiveAttack(Number(x), Number(y));
      updateBoard(computer, computerBoardElement);

      if (hit) {
        userBoardElement
          .querySelector(`[data-x="${x}"][data-y="${y}"]`)!
          .classList.add('hit');
      } else {
        userBoardElement
          .querySelector(`[data-x="${x}"][data-y="${y}"]`)!
          .classList.add('hit');
      }
      result = user.gameboard.receiveAttack(x, y);
      updateBoard(user, userBoardElement); // Update user board after each attack
    } while (!result);
    // eslint-disable-next-line no-useless-return
    if (checkGameOver()) return; // Check for game over after each attack
  }
  // Add event listener to the computer board for user attacks
  computerBoardElement.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const { x, y } = target.dataset;

    if (x !== undefined && y !== undefined) {
      const hit = computer.gameboard.receiveAttack(Number(x), Number(y));
      updateBoard(computer, computerBoardElement);

      if (hit) {
        target.classList.add('hit');
      } else {
        target.classList.add('miss');
      }

      if (checkGameOver()) return;

      // Implement AI attack logic for computer's turn
      setTimeout(() => {
        aiRandomAttack();
        // eslint-disable-next-line no-useless-return
        if (checkGameOver()) return;
      }, 500); // Adding a slight delay for AI's move
    }
  });
}

export default initializeGame;
