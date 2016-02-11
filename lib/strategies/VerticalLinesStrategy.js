'use strict';
var util = require('util'),
  Strategy = require('./Strategy'),
  PaintingCommands = require('../PaintingCommands.js');

function VerticalLinesStrategy (){
  Strategy.call(this);
}
util.inherits(VerticalLinesStrategy, Strategy);

VerticalLinesStrategy.prototype.run = function(matrix) {
  this.commands = [];
  var startIndex;
  for (var i = 0; i < matrix[0].length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      var cell = matrix[j][i];
      if (cell && startIndex === undefined) {
        startIndex = j;
      }else if(!cell && startIndex !== undefined){
        this.commands.push(PaintingCommands.line(startIndex, i, j-1, i));
        startIndex = undefined;
      }
    }
    if (startIndex !== undefined){
      this.commands.push(PaintingCommands.line(startIndex, i, j-1, i));
      startIndex = undefined;
    }
  }
  return {
    score: (matrix.length * matrix[0].length) - this.commands.length,
    commands: this.commands
  };
};

module.exports = VerticalLinesStrategy;
