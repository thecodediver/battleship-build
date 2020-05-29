const BattleShips = require('./BattleShips');

const GameBoard = () => {
  const board = [];
  let index = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.push({
        index, coordinates: `${i}${j}`, attacked: false, shipName: null, shipIndex: null,
      });
      index++;
    }
  }
  const getBoard = () => board;
  const ships = [
    BattleShips('Carrier'),
    BattleShips('Battleship'),
    BattleShips('Destroyer'),
    BattleShips('Submarine'),
    BattleShips('Patrol Boat'),
  ];
  const getShips = () => ships;
  const placeShip = (shipName, shipOrientation, shipStartIndex) => {
    const ship = ships.find((ship) => ship.getName() === shipName);
    if (shipOrientation === 'horizontal') {
      if (Number(shipStartIndex[1]) + ship.getLength() > 9) {
        return false;
      }
      let possibleShipCoordinates = Number(shipStartIndex);
      for (let i = 0; i < ship.getLength(); i++) {
        if (board[possibleShipCoordinates].shipName !== null) {
          return false;
        }
        possibleShipCoordinates++;
      }
      let theCurrentIndex = Number(shipStartIndex);
      for (let i = 0; i < ship.getLength(); i++) {
        board[theCurrentIndex].shipName = shipName;
        board[theCurrentIndex].shipIndex = i;
        theCurrentIndex++;
      }
    }
    if (shipOrientation === 'vertical') {
      if (Number(shipStartIndex[0]) + ship.getLength() > 9) {
        return false;
      }
      let possibleShipCoordinates = Number(shipStartIndex);
      for (let i = 0; i < ship.getLength(); i++) {
        if (board[possibleShipCoordinates].shipName !== null) {
          return false;
        }
        possibleShipCoordinates += 10;
      }
      let theCurrentIndex = Number(shipStartIndex);
      for (let i = 0; i < ship.getLength(); i++) {
        const boardCoordinates = board.find((boardCoordinate) => boardCoordinate.coordinates == theCurrentIndex);
        board[theCurrentIndex].shipName = shipName;
        board[theCurrentIndex].shipIndex = i;
        theCurrentIndex += 10;
      }
    }
  };
  const receiveAttack = (coordinates) => {
    const convertNum = Number(coordinates);
    if (board[convertNum].attacked === true) {
      return false;
    }
    board[convertNum].attacked = true;
    if (board[convertNum].shipName !== null) {
      const ship = ships.find((ship) => ship.getName() === board[convertNum].shipName);
      ship.hit(board[convertNum].shipIndex);
    }
  };
  const areAllShipsSunk = () => {
    if (ships[0].isSunk() && ships[1].isSunk() && ships[2].isSunk() && ships[3].isSunk() && ships[4].isSunk()) {
      return true;
    }
    return false;
  };
  return {
    getBoard, getShips, placeShip, receiveAttack, areAllShipsSunk,
  };
};

module.exports = GameBoard;
