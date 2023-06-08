class MoveCalculator {
  constructor(moves) {
    this.moves = moves;
  }

  calculateMove() {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[randomIndex];
  }
}

module.exports = MoveCalculator;
