'use strict';

function StrategyFactory() {}

StrategyFactory.HORIZONTAL_LINES = 'hlines';

StrategyFactory.STRATEGIES = {
  'hlines': require('./HorizontalLinesStrategy')
};

StrategyFactory.create = function(strategy){
  if(StrategyFactory.STRATEGIES[strategy]){
    return new StrategyFactory.STRATEGIES[strategy];
  }
  return null;
};

module.exports = StrategyFactory;