/* eslint-disable no-plusplus */
import { Ship, createShip } from './ship';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gameboard() {
  const ships: Ship[] = [];
  const board: (Ship | boolean | null)[][] = Array.from({ length: 10 }, () =>
    Array(10).fill(null)
  );
  const missedAttacks: [number, number][] = []; // Keep track of missed attacks

  // Create the ships
  const smallShip = createShip(2);
  const mediumShip = createShip(3);
  const largeShip = createShip(4);
  const xLargeShip = createShip(5);

  ships.push(smallShip, mediumShip, largeShip, xLargeShip);

  // Check if position is on the board
  const isValidPosition = (x: number, y: number) => {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  };

  // Check if ship can be placed at given coordinates
  const canPlaceShip = (
    ship: Ship,
    x: number,
    y: number,
    orient: string
  ): boolean => {
    for (let i = 0; i < ship.length; i++) {
      const newX = orient === 'horizontal' ? x + i : x;
      const newY = orient === 'vertical' ? y + i : y;

      if (!isValidPosition(newX, newY) || board[newY][newX] !== null) {
        return false;
      }
    }
    return true;
  };

  // Place the ship on the board
  const placeShip = (
    ship: Ship,
    x: number,
    y: number,
    orient: string
  ): boolean => {
    if (canPlaceShip(ship, x, y, orient)) {
      for (let i = 0; i < ship.length; i++) {
        const newX = orient === 'horizontal' ? x + i : x;
        const newY = orient === 'vertical' ? y + i : y;

        board[newY][newX] = ship;
      }
      return true;
    }
    return false;
  };

  // Receive an attack
  const receiveAttack = (x: number, y: number): boolean => {
    if (!isValidPosition(x, y)) {
      throw new Error('Invalid position');
    }
    const target = board[y][x];
    if (typeof target === 'boolean') {
      return false; // Cell has already been attacked
    }

    if (target) {
      target.hit(); // Call the hit method on the Ship object
      board[y][x] = true; // Mark the cell as hit (true)
      return true; // Hit
    }
    missedAttacks.push([x, y]);
    board[y][x] = false; // Mark the cell as missed (false)
    return true; // Valid attack but Miss
  };

  // Check if all ships are sunk
  const allShipsSunk = (): boolean => {
    return ships.every((ship) => ship.isSunk());
  };

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    missedAttacks,
    ships,
    board,
  };
}

export default gameboard;
