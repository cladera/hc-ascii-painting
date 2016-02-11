'use strict';
/**
 * Created by marc on 11/02/16.
 */

var util = require('util'),
    Strategy = require('./Strategy'),
    PaintingCommands = require('../PaintingCommands.js');
var HorizontalStrategy = require('../strategies/HorizontalLinesStrategy');

function FullSquaresStrategy (){
  Strategy.call(this);
}
util.inherits(FullSquaresStrategy, Strategy);

FullSquaresStrategy.prototype.run = function(matrix) {
  var rows = matrix.length;
  var cols = matrix[0].length;
  this.commands = [];
  this.maxSquareSize = 0;
  this.createSquareMatrix(matrix);
  var squaresSize = this.maxSquareSize;
  while (squaresSize >= 15){
    for (var r = rows-2; r >= 0; r--) {
      for (var c = cols - 2; c >= 0; c--) {
        if (this.squaresMatrix[r][c] === squaresSize){
          var s = Math.floor(squaresSize/2);
          var rc = r + s;
          var cc = c + s;
          this.commands.push(PaintingCommands.square(rc, cc, s));
          this.cleanSquare(matrix, r, c, s);
        }
      }
    }
    squaresSize-= 2;
  }
  var hStrategy = new HorizontalStrategy();
  var horizontalResult = hStrategy.run(matrix);
  this.commands = this.commands.concat(horizontalResult.commands);
  return {
    score: (matrix.length * matrix[0].length) - this.commands.length,
    commands: this.commands
  };
};

FullSquaresStrategy.prototype.cleanSquare = function(matrix, rows, cols, s) {
  for (var i = rows; i < rows + s; i++) {
    for (var j = cols; j < cols + s; j++) {
      this.squaresMatrix[i][j] = 0;
      matrix[i][j] = false;
    }
  }
}

FullSquaresStrategy.prototype.createSquareMatrix = function(matrix){
  this.squaresMatrix = [];
  var rows = matrix.length;
  var cols = matrix[0].length;
  for (var r = 0; r < rows; r++) {
    this.squaresMatrix[r] = FullSquaresStrategy.initRow(matrix, r, cols);
    console.log(this.squaresMatrix[r].join(' '));
  }
  console.log(rows, cols);
  for (r = rows-2; r >= 0; r--){
    for (var c = cols-2; c >= 0; c--) {
      if (matrix[r][c]){
        this.squaresMatrix[r][c] = 1 + Math.min(
          this.squaresMatrix[r][c+1],  // east
          this.squaresMatrix[r+1][c],  // south
          this.squaresMatrix[r+1][c+1] // south-east
        );
        if (this.squaresMatrix[r][c] > this.maxSquareSize){
          this.maxSquareSize = this.squaresMatrix[r][c];
        }
      }
    }
  }
  for (r = 0; r < rows; r++) {
    console.log(this.squaresMatrix[r].join(' '));
  }
  console.log('Max square size: ', this.maxSquareSize);
};

FullSquaresStrategy.initRow = function(matrix, index, cols) {
  var row = [];
  for (var i = 0; i < cols; i++) {
    row[i] = 0;
    if ((index === matrix.length-1 || i === matrix[index].length-1)
        && matrix[index][i]){
      row[i] = 1;
    }
  }
  return row;
};

module.exports = FullSquaresStrategy;
