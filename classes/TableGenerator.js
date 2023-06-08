let Table = require("cli-table");

class TableGenerator {
  constructor(game) {
    this.game = game;
  }
  showTable(userMoves) {
    let table = new Table({ head: [" v PC / User >", ...userMoves] });
    for (let i = 0; i < userMoves.length; i++) {
      const row = [userMoves[i]];
      for (let j = 0; j < userMoves.length; j++) {
        row.push(this.game.getWinner(i, j));
      }
      table.push(row);
    }
    console.log(table.toString());
  }
}

module.exports = TableGenerator;
