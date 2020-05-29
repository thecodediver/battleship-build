const BattleShips = (name) => {
  const ship = [];
  let onBoard = false;
  let length;
  switch (name) {
    case 'Carrier':
      length = 5;
      break;
    case 'Battleship':
      length = 4;
      break;
    case 'Destroyer':
      length = 3;
      break;
    case 'Submarine':
      length = 3;
      break;
    case 'Patrol Boat':
      length = 2;
      break;
    default:
      break;
  }
  const getName = () => name;
  const getShip = () => ship;
  const getLength = () => length;
  const getPlacedStatus = () => onBoard;
  const place = () => {
    onBoard = true;
  };
  for (let i = 0; i < length; i++) {
    const shipSpace = {
      index: i,
      hitStatus: false,
    };
    ship.push(shipSpace);
  }
  const hit = (i) => {
    ship[i].hitStatus = true;
  };
  const isSunk = () => {
    let hitSpaces = 0;
    ship.forEach((shipSpace) => {
      if (shipSpace.hitStatus === true) {
        hitSpaces++;
      }
    });
    const sunkStatus = hitSpaces === length;
    return sunkStatus;
  };
  return {
    getName, getLength, getShip, hit, isSunk, getPlacedStatus, place,
  };
};

module.exports = BattleShips;
