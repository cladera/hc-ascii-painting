'use strict';

function StrategyFactory() {}

StrategyFactory.HORIZONTAL_LINES = 'hlines';
StrategyFactory.VERTICAL_LINES = 'vlines';
StrategyFactory.FULL_SQUARES_LINES = 'fsquares';

StrategyFactory.STRATEGIES = {
  'hlines': require('./HorizontalLinesStrategy'),
  'vlines': require('./VerticalLinesStrategy.js'),
  'fsquares': require('./FullSquaresStrategy')
};

StrategyFactory.create = function(strategy){
  if(StrategyFactory.STRATEGIES[strategy]){
    return new StrategyFactory.STRATEGIES[strategy];
  }
  return null;
};

module.exports = StrategyFactory;