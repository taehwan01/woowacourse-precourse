const MissionUtils = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.opponent = new Opponent(); //상대방 등장
    this.user = new User(); //사용자(본인) 등장
  }

  play() {
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    // this.gameStart();
    let restartGame = "1"; // 게임 진행 중에는 재시작 여부를 1로 지정
    while (restartGame === "1") {
      this.gameStart(); // 게임 시작
      restartGame = this.gameRestart();
      restartGame = this.checkRestartValidation(restartGame);
    }
    return MissionUtils.Console.close();
  }

  checkRestartValidation(restartGame) {
    // 게임 재시작 명령 유효성 검사
    // 1 또는 2 이외의 명령 시 재시작 또는 종료를 수행하지 않고 다시 입력받는다.
    while (restartGame !== "1" && restartGame !== "2") {
      MissionUtils.Console.print("불가능한 재시작 명령입니다.");
      restartGame = this.gameRestart();
    }
    return restartGame;
  }

  gameStart() {
    const opponentNumber = this.opponent.setRandomNumber(); // 상대방 숫자 지정
    let endGame = false; // 게임 진행 동안에는 게임 종료 여부를 false로 지정
    while (!endGame) {
      this.user.getInput(); // 사용자 예측값 입력
      this.user.checkValidation(); // 사용자 입력 유효성 검사
      this.user.changeToNumbers(); // 사용자 입력값이 문자 배열 형태이므로 숫자 배열로 변환
      const ballAndStrike = this.compareNumbers(opponentNumber, this.user.input); // 볼, 스트라이크 개수 추출
      this.printResult(ballAndStrike); // 볼, 스트라이크 결과값 화면 출력
      endGame = this.gameEnd(ballAndStrike); // 3스트라이크가 나오면 게임 종료 여부를 true로 지정
    }
  }

  gameEnd(ballAndStrike) {
    // 3스트라이크 여부 검사
    if (ballAndStrike[1] === 3) {
      MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
      return true;
    }
    return false;
  }

  gameRestart() {
    // 사용자로부터 게임 재시작 명령 입력 받음
    let restartGame;
    MissionUtils.Console.readLine("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.", (restartInput) => {
      restartGame = restartInput.toString().split("");
    });
    return restartGame[0]; // 사용자 입력에서 첫번째 원소 반환
  }

  compareNumbers(opponentArr, userArr) {
    // 상대방(컴퓨터)의 수와 사용자의 예측값 비교
    let ball = 0,
      strike = 0;
    for (let index = 0; index < 3; index++) {
      if (userArr.includes(opponentArr[index])) {
        if (opponentArr[index] !== userArr[index]) ball++; // 같은 숫자 다른 위치는 볼의 개수 증가
        else strike++; // 같은 숫자 같은 위치는 스트라이크의 개수 증가
      }
    }
    return [ball, strike];
  }

  printResult(ballAndStrike) {
    // 볼과 스트라이크의 개수 화면 출력
    // 0개의 볼 또는 0개의 스트라이크는 출력하지 않는다.
    // 둘 다 0개라면 '낫싱' 출력
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
    this.input = []; // 사용자 예측 입력값을 저장할 배열
  }

  getInput() {
    MissionUtils.Console.readLine("숫자를 입력해주세요 : ", (inputNumber) => {
      this.input = inputNumber.toString().split(""); // 사용자가 입력한 3자리 수를 쪼개어 문자 배열로 저장한다.
      // MissionUtils.Console.close();
    });
  }

  checkValidation() {
    // 사용자 예측 입력값에 대한 유효성 검사
    this.input.map((number) => {
      // 숫자 이외의 문자 입력 시 에러 발생
      if (isNaN(number)) throw new Error("오직 숫자만 입력이 가능합니다.");
    });
    if (this.input.includes("0")) throw new Error("1부터 9 사이의 숫자만 입력 가능합니다."); // 범위 이외의 숫자 입력 시 에러 발생
    if (this.input.length !== 3) throw new Error("3자리 수만 입력이 가능합니다."); // 3자리 수 이외의 입력 시 에러 발생
    const checkSet = Array.from(new Set([...this.input]));
    if (checkSet.length !== this.input.length) throw new Error("중복되지 않은 입력만 가능합니다."); // 중복된 숫자가 있을 시 에러 발생
  }

  changeToNumbers() {
    // 문자 배열을 숫자 배열로 변환
    this.input = this.input.map((letter) => Number(letter));
  }
}

module.exports = App;
