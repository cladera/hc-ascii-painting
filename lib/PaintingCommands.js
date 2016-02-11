'use strict';

function PaintingCommands(){}

PaintingCommands.PAINT_SQUARE = 'PAINT_SQUARE';
PaintingCommands.PAINT_LINE = 'PAINT_LINE';
PaintingCommands.ERASE_CELL = 'ERASE_CELL';

PaintingCommands.command = function(){
  return Array.prototype.slice.call(arguments, 0).join(' ');
};

PaintingCommands.square = function(r, s, c) {
  return PaintingCommands.command(PaintingCommands.PAINT_SQUARE, r, s, c);
};

PaintingCommands.line = function(r1, c1, r2, c2){
  return PaintingCommands.command(PaintingCommands.PAINT_LINE, r1, c1, r2, c2);
};

PaintingCommands.erase = function(r, c){
  return PaintingCommands.command(PaintingCommands.ERASE_CELL, r, c);
};

module.exports = PaintingCommands;