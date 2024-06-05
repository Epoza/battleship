import gameboard from './gameboard';

type Player = {
  isComputer: boolean;
  gameboard: ReturnType<typeof gameboard>;
};

function createPlayer(isComputer: boolean): Player {
  const playerGameboard = gameboard();

  return {
    gameboard: playerGameboard,
    isComputer,
  };
}
export default createPlayer;
