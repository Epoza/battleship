import { createShip } from './ship';

const ship = createShip(4);

test('Create a ship and sink it', () => {
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
