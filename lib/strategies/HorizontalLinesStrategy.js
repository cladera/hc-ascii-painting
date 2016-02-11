'use strict';
/**
 * Created by cgcladera on 11/02/16.
 */
var util = require('util'),
  Strategy = require('./Strategy'),
  PaintingCommands = require('../PaintingCommands');

function HorizontalLinesStrategy (){
  Strategy.call(this);
  this.lines_ = [];
}
util.inherits(HorizontalLinesStrategy, Strategy);

HorizontalLinesStrategy.prototype.run = function(matrix) {
  var r;
  for(r = 0; r < matrix.length; r++){
    this.getLines_(matrix[r],r);
  }
  return {
    score: (matrix.length * matrix[0].length) - this.lines_.length,
    commands: this.lines_
  };
};

HorizontalLinesStrategy.prototype.getLines_ = function(row, index) {
  var c,
    startLineIndex,
    cell;
  for(c = 0; c < row.length; c++) {
    cell = row[c];
    if(!cell && startLineIndex) {
      this.lines_.push(PaintingCommands.line(index,startLineIndex,index,c-1));
      startLineIndex = undefined;
    }else if(cell && !startLineIndex) {
      startLineIndex = c;
    }
  }
  if(startLineIndex){
    this.lines_.push(PaintingCommands.line(index,startLineIndex, index, row.length -1));
  }
};

module.exports = HorizontalLinesStrategy;