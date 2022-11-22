/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */

const { Console } = require('@woowacourse/mission-utils');
const UserBridge = require('../model/UserBridge');

const OutputView = {
  /**
   * 게임 시작을 알린다.
   */
  printStart() {
    Console.print('다리 건너기 게임을 시작합니다.\n');
  },

  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * @param {string[]} up 사용자가 이동한 다리 현황 중 윗쪽 다리 배열
   * @param {string[]} up 사용자가 이동한 다리 현황 중 아랫쪽 다리 배열
   */
  printMap(up, down) {
    Console.print(`[ ${up.join(' | ')} ]`);
    Console.print(`[ ${down.join(' | ')} ]`);
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult() {},

  /**
   * 에러를 출력한다.
   */
  printError(error) {
    Console.print(error);
  },
};

module.exports = OutputView;
