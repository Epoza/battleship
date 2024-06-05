import createPlayer from './player';

describe('createPlayer', () => {
  it('should create a player with the correct isComputer value', () => {
    const player = createPlayer(true);
    expect(player.isComputer).toBe(true);

    const anotherPlayer = createPlayer(false);
    expect(anotherPlayer.isComputer).toBe(false);
  });

  it('should create a player with a properly initialized gameboard', () => {
    const player = createPlayer(false);
    expect(player.gameboard).toBeDefined();
    expect(player.gameboard.placeShip).toBeDefined();
    expect(player.gameboard.receiveAttack).toBeDefined();
    expect(player.gameboard.allShipsSunk).toBeDefined();
    expect(player.gameboard.ships).toBeDefined();
    expect(player.gameboard.board).toBeDefined();
    expect(player.gameboard.missedAttacks).toBeDefined();
  });

  it("should allow placing ships on the player's gameboard", () => {
    const player = createPlayer(false);
    const ship = player.gameboard.ships[0]; // Assuming the first ship is a valid ship

    const placed = player.gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(placed).toBe(true);

    // Check if the ship is correctly placed on the board
    expect(player.gameboard.board[0][0]).toBe(ship);
    expect(player.gameboard.board[0][1]).toBe(ship);
  });

  it("should handle receiving attacks on the player's gameboard", () => {
    const player = createPlayer(false);
    const ship = player.gameboard.ships[0];
    player.gameboard.placeShip(ship, 0, 0, 'horizontal');

    const hit = player.gameboard.receiveAttack(0, 0);
    expect(hit).toBe(true);
    expect(ship.timesHit).toBe(1);

    const miss = player.gameboard.receiveAttack(9, 9);
    expect(miss).toBe(false);
    expect(player.gameboard.missedAttacks).toContainEqual([9, 9]);
  });
});
