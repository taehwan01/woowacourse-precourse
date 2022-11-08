const MissionUtils = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.opponent = new Opponent(); //상대방 등장
    this.user = new User(); //사용자(본인) 등장
  }
  play() {
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    this.gameStart();
    let restartGame = this.gameRestart()[0];
    while (restartGame === "1") {
      this.gameStart();
      restartGame = this.gameRestart()[0];
    }
    return MissionUtils.Console.close();
  }
  gameStart() {
    const opponentNumber = this.opponent.setRandomNumber(); //상대방 숫자 지정
    let endGame = false;
    while (!endGame) {
      this.user.getInput();
      this.user.checkValidation();
      this.user.changeToNumbers();
      const ballAndStrike = this.compareNumbers(opponentNumber, this.user.input);
      this.printResult(ballAndStrike);
      endGame = this.gameEnd(ballAndStrike);
    }
  }
  gameEnd(ballAndStrike) {
    if (ballAndStrike[1] === 3) {
      MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
      return true;
    }
    return false;
  }
  gameRestart() {
    let restartGame;
    MissionUtils.Console.readLine("숫자를 입력해주세요 : ", (restartInput) => {
      restartGame = restartInput.toString().split("");
      // MissionUtils.Console.close();
    });
    return restartGame;
  }
  compareNumbers(opponentArr, userArr) {
    let ball = 0,
      strike = 0;
    for (let index = 0; index < 3; index++) {
      if (userArr.includes(opponentArr[index])) {
        if (opponentArr[index] !== userArr[index]) ball++;
        else strike++;
      }
    }
    return [ball, strike];
  }
  printResult(ballAndStrike) {
    const ball = ballAndStrike[0];
    const strike = ballAndStrike[1];
    if (ball > 0 && strike > 0) MissionUtils.Console.print(`${ball}볼 ${strike}스트라이크`);
    else if (ball > 0 && strike === 0) MissionUtils.Console.print(`${ball}볼`);
    else if (ball === 0 && strike > 0) {
      MissionUtils.Console.print(`${strike}스트라이크`);
    } else if (ball === 0 && strike === 0) MissionUtils.Console.print("낫싱");
  }
}

class Opponent {
  //상대방 관련 클래스
  setRandomNumber() {
    //랜덤으로 숫자 3개를 추출하여 배열에 저장(중복 없음)
    const opponentNumber = [];
    while (opponentNumber.length < 3) {
      const randomNumber = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!opponentNumber.includes(randomNumber)) {
        // 중복 숫자 없어야 함
        opponentNumber.push(randomNumber);
      }
    }
    return opponentNumber;
  }
}

class User {
  constructor() {
    this.input = [];
  }
  getInput() {
    MissionUtils.Console.readLine("숫자를 입력해주세요 : ", (inputNumber) => {
      this.input = inputNumber.toString().split("");
      // MissionUtils.Console.close();
    });
  }
  checkValidation() {
    this.input.map((number) => {
      if (isNaN(number)) throw new Error("오직 숫자만 입력이 가능합니다.");
    });
    if (this.input.includes("0")) throw new Error("1부터 9 사이의 숫자만 입력 가능합니다.");
    if (this.input.length !== 3) throw new Error("3자리 수만 입력이 가능합니다.");
  }
  changeToNumbers() {
    this.input = this.input.map((letter) => Number(letter));
  }
}

module.exports = App;
