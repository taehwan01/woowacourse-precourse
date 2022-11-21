/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */

const { Console } = require('@woowacourse/mission-utils');
const OutputView = require('./OutputView');
const InputValidation = require('../validation/InputValidation');

const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(nextStep) {
    Console.readLine('다리의 길이를 입력해주세요.', (userInput) => {
      try {
        const bridgeSize = this.validateBridgeSize(userInput);
        return bridgeSize;
      } catch (error) {
        OutputView.printError(error);
        this.readBridgeSize();
      }
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {},

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {},

  validateBridgeSize(userInput) {
    const bridgeSize = Number(userInput);
    InputValidation.isInteger(bridgeSize);
    InputValidation.isInRange(bridgeSize);
    return bridgeSize;
  },
};

InputView.readBridgeSize();

module.exports = InputView;
