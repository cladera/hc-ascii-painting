'use strict';

function Task(matrix, strategy) {
  this.matrix_ = matrix;
  this.strategy_ = strategy;
}
Task.prototype.run = function() {
  return this.strategy_.run(this.matrix_);
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