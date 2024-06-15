import createPlayer from './player';
import { createBoard, updateBoard, placeShips } from './dom';
import { switchTurns, handleAttack, GameState } from './gameLogic';

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

  const gameState: GameState = {
    currentPlayer: user,
    opponent: computer,
  };

  // Add event listener to the computer board for attacks
  computerBoardElement.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const { x, y } = target.dataset;

    if (x !== undefined && y !== undefined) {
      const hit = handleAttack(gameState, Number(x), Number(y));
      updateBoard(computer, computerBoardElement);

      if (hit) {
        target.classList.add('hit');
      } else {
        target.classList.add('miss');
      }

      switchTurns(gameState);
      // Implement AI attack logic here for computer's turn if necessary
      if (gameState.currentPlayer.isComputer) {
        // Add AI attack logic here
        const aiX = Math.floor(Math.random() * 10);
        const aiY = Math.floor(Math.random() * 10);
        handleAttack(gameState, aiX, aiY);
        updateBoard(user, userBoardElement);
        switchTurns(gameState);
      }
    }
  });
}

export default initializeGame;
