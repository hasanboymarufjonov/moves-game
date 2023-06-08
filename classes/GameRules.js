class GameRules {
  constructor(moves) {
    this.moves = moves;
  }

  determineWinner(userMove, computerMove) {
    const moveIndex = this.moves.indexOf(userMove);
    const halfLength = Math.floor(this.moves.length / 2);

    const winningMoves = this.moves.slice(
      moveIndex + 1,
      moveIndex + halfLength + 1
    );
    const losingMoves = this.moves.slice(moveIndex - halfLength, moveIndex);

    if (winningMoves.includes(computerMove)) {
      return "You win!";
    } else if (losingMoves.includes(computerMove)) {
      return "Computer wins!";
    } else {
      return "It's a draw!";
    }
  }
}

module.exports = GameRules;
