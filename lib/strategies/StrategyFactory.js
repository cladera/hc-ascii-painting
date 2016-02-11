'use strict';

function StrategyFactory() {}

StrategyFactory.HORIZONTAL_LINES = 'hlines';
StrategyFactory.VERTICAL_LINES = 'vlines';

StrategyFactory.STRATEGIES = {
  'hlines': require('./HorizontalLinesStrategy'),
  'vlines': require('./VerticalLinesStrategy.js')
};

StrategyFactory.create = function(strategy){
  if(StrategyFactory.STRATEGIES[strategy]){
    return new StrategyFactory.STRATEGIES[strategy];
  }
  return null;
};

module.exports = StrategyFactory;