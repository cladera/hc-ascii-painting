/**
 * Created by cgcladera on 11/02/16.
 */
'use strict';

var PaintingCommands = require('./PaintingCommands');

function Paint(rows, columns){
  this.canvas_ = [];
  this.rows_ = rows;
  this.columns_ = columns;
  this.createCanvas_();
}
Paint.prototype.createCanvas_ = function(){
  //Create canvas
  var r,
    c;

  for(r = 0; r < this.rows_; r++){
    this.canvas_[r] = [];
    for(c = 0; c < this.columns_; c++) {
      this.canvas_[r][c] = '.';
    }
  }
};

Paint.prototype.print = function(command){
  command = command.split(' ');
  var cmd = command[0];
  var args = command.splice(1);
  args = args.map(Number);
  switch (cmd) {
    case PaintingCommands.PAINT_LINE:
      this.printLine_(args);
      break;
    case PaintingCommands.ERASE_CELL:
      this.erase_(args);
      break;
  }
};

Paint.prototype.printLine_ = function(args){
  var i;
  if(args[0] === args[2]) {
    for(i = args[1]; i <= args[3]; i++) {
      this.canvas_[args[0]][i] = '#';
    }
  }else if(args[1] === args[3]) {
    for(i = args[0]; i <= args[2]; i++) {
      this.canvas_[i][args[1]]=  '#';
    }
  }
};

Paint.prototype.erase_ = function(args){
  this.canvas_[args[0]][args[1]] = '.';
};

Paint.prototype.flush = function(){
  var r,
    lines = [];
  for(r = 0; r < this.canvas_.length; r++) {
    lines.push(this.canvas_[r].join(''));
  }
  return lines.join('\n');
};

module.exports = Paint;