import './style.css';

const GameBoard = require('./GameBoard');

const PlayBoard = GameBoard();
function RenderBoard() {
  const board = PlayBoard.getBoard();
  if (document.contains(document.getElementById('boardContainer'))) {
    document.getElementById('boardContainer').remove();
  }
  const mainContainer = document.getElementById('main');
  const boardContainer = document.createElement('div');
  boardContainer.id = 'boardContainer';
  boardContainer.style.display = 'grid';
  boardContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';
  boardContainer.style.gridTemplateRows = 'repeat(10, 1fr)';
  board.forEach((box) => {
    const space = document.createElement('space');
    if (box.shipName !== null && box.attacked) {
      space.classList = `box ship ${box.shipName} shipIndex_${box.shipIndex} shipHit`;
    } else if (box.shipName !== null) {
      space.classList = `box ship ${box.shipName} shipIndex_${box.shipIndex}`;
    } else if (box.attacked) {
      space.classList = 'box missedHit';
    } else {
      space.classList = 'box noAction';
    }
    boardContainer.appendChild(space);
  });
  mainContainer.appendChild(boardContainer);
}
RenderBoard();
