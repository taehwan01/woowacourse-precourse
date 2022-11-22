const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');
const Bridge = require('./model/Bridge');
const UserBridge = require('./model/UserBridge');
const BridgeGame = require('./controller/BridgeGame');

const { Console } = require('@woowacourse/mission-utils');

class App {
  bridge;
  userBridge;
  bridgeGame;
  moveCount;
  constructor() {
    this.bridge = new Bridge();
    this.userBridge = new UserBridge();
    this.bridgeGame = new BridgeGame(this.bridge, this.userBridge);
    this.moveCount = 0;
  }
  play() {
    OutputView.printStart();
    this.startGame();
  }
  startGame() {
    this.bridgeGame.addGameCount();
    this.buildBridge();
  }
  buildBridge() {
    InputView.readBridgeSize((bridgeSize) => {
      this.bridgeGame.buildBridge(bridgeSize);
      Console.print(this.bridge);
      this.moveOnBridge();
    });
  }
  moveOnBridge() {
    InputView.readMoving((movement) => {
      this.bridgeGame.move(movement, this.moveCount);
      this.moveCount += 1;
      this.comparisonOperator();
    });
  }
  comparisonOperator() {
    const currentMap = this.bridgeGame.comparisonOperator();
    const up = currentMap[0];
    const down = currentMap[1];
    this.showMap(up, down);
  }
  showMap(up, down) {
    OutputView.printMap(up, down);
    const gameSet = this.bridgeGame.checkGameSet(up, down);
    Console.print(gameSet);
    this.moveOnBridge();
  }
}

const app = new App();
app.play();

module.exports = App;
