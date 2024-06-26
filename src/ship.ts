export type Ship = {
  length: number;
  timesHit: number;
  isSunk: () => boolean;
  hit: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createShip(length: number): Ship {
  let timesHit = 0;

  const hit = () => {
    if (timesHit < length) {
      timesHit += 1;
    }
  };

  const isSunk = () => timesHit >= length;

  return {
    length,
    get timesHit() {
      return timesHit;
    },
    isSunk,
    hit,
  };
}
