'use strict';

function Task(matrix, strategy) {
  this._matrix = matrix;
  this._strategy = strategy;
}
Task.prototype.run = function() {
  return this._strategy.run(this._matrix);
};

Task.Builder = function(){
  return this;
};
Task.Builder.prototype.setMatrix = function (matrix) {
  this.matrix = matrix;
  return this;
};
Task.Builder.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
  return this;
};
Task.Builder.prototype.build = function(){
  return new Task(this.matrix, this.strategy);
};

module.exports = Task;