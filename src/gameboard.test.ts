import gameboard from './gameboard';

const myGameboard = gameboard();

test('Place ships onto gameboard', () => {
  expect(myGameboard.placeShip(myGameboard.ships[0], 0, 0, 'horizontal')).toBe(
    true
  );
  expect(myGameboard.placeShip(myGameboard.ships[1], 1, 1, 'vertical')).toBe(
    true
  );
  expect(myGameboard.placeShip(myGameboard.ships[3], 10, 0, 'horizontal')).toBe(
    false
  );
  expect(myGameboard.placeShip(myGameboard.ships[1], 1, 2, 'vertical')).toBe(
    false
  );
});

test('Recieve attack and sink ship', () => {
  myGameboard.placeShip(myGameboard.ships[0], 0, 0, 'horizontal');
  expect(myGameboard.receiveAttack(0, 0)).toBe(true);
  expect(myGameboard.receiveAttack(0, 1)).toBe(false);
  expect(myGameboard.receiveAttack(1, 0)).toBe(true);
  expect(myGameboard.allShipsSunk()).toBe(false);
  expect(myGameboard.receiveAttack(0, 1)).toBe(false);
  expect(myGameboard.missedAttacks).toEqual([
    [0, 1],
    [0, 1],
  ]);
});
