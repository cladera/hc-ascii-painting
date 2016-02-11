'use strict';
/**
 * Created by cgcladera on 11/02/16.
 */
var util = require('util'),
  Strategy = require('./Strategy');

function HorizontalLinesStrategy (){
  Strategy.call(this);
}
util.inherits(HorizontalLinesStrategy, Strategy);

HorizontalLinesStrategy.prototype.run = function(matrix) {
  return {
    score: 100,
    commands: 'commands'
  };
};

module.exports = HorizontalLinesStrategy;