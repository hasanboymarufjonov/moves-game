const TableGenerator = require("./classes/TableGenerator");
const KeyGenerator = require("./classes/KeyGenerator");
const MoveCalculator = require("./classes/MoveCalculator");
const HMACCalculator = require("./classes/HMACCalculator");
const GameRules = require("./classes/GameRules");

class Game {
  constructor(moves) {
    this.moves = moves;
    this.keyGenerator = new KeyGenerator();
    this.moveCalculator = new MoveCalculator(moves);
    this.hmacCalculator = new HMACCalculator();
    this.gameRules = new GameRules(moves);
  }

  getWinner(userMoveIndex, computerMoveIndex) {
    const moveCount = this.moves.length;
    const halfLength = Math.floor(moveCount / 2);

    const winningIndices = [...Array(halfLength).keys()].map(
      (i) => (userMoveIndex + i + 1) % moveCount
    );
    const losingIndices = [...Array(halfLength).keys()].map(
      (i) => (userMoveIndex - i - 1 + moveCount) % moveCount
    );

    if (winningIndices.includes(computerMoveIndex)) {
      return "You win!";
    } else if (losingIndices.includes(computerMoveIndex)) {
      return "Computer wins!";
    } else {
      return "It's a draw!";
    }
  }

  run() {
    const key = this.keyGenerator.generateKey();
    const computerMove = this.moveCalculator.calculateMove();

    console.log(
      `HMAC: ${this.hmacCalculator.calculateHMAC(key, computerMove)}`
    );
    console.log("Available moves:");
    this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
    console.log("0 - exit");
    console.log("? - help");

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Enter your move: ", (userMove) => {
      readline.close();

      if (userMove === "0") {
        console.log("Exiting the game.");
        return;
      }

      if (userMove === "?") {
        const table = new TableGenerator(game);
        table.showTable(moves);
        return;
      }

      const userMoveIndex = parseInt(userMove, 10);

      if (
        isNaN(userMoveIndex) ||
        userMoveIndex < 1 ||
        userMoveIndex > this.moves.length
      ) {
        console.log("Invalid move. Please enter a valid move index.");
        return;
      }

      console.log(`Your move: ${this.moves[userMove - 1]}`);
      console.log(`Computer move: ${computerMove}`);

      const winner = this.gameRules.determineWinner(
        this.moves[userMove - 1],
        computerMove
      );
      console.log(winner);

      console.log(`HMAC key: ${key}`);
    });
  }
}

const moves = process.argv.slice(2);

if (
  moves.length < 3 ||
  moves.length % 2 !== 1 ||
  new Set(moves).size !== moves.length
) {
  console.error(
    "Incorrect arguments. Please provide an odd number of non-repeating moves."
  );
  console.log("Example: node game.js rock paper scissors");
  process.exit(1);
}

const game = new Game(moves);
game.run();
