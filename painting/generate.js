'use strict';

var MatrixParser = require('../lib/MatrixParser'),
  StrategyFactory = require('../lib/strategies/StrategyFactory'),
  Task = require('../lib/Task');

module.exports = function(parser){
    var result;
  parser.command('generate')
    .option('input', {
      abbr: 'i',
      required: true,
      help: 'Input ASCII Image'
    })
    .option('strategy',{
      abbr: 's',
      required: false,
      help: 'Generation strategy',
      default: 'hlines'
    })
    .callback(function(opts){

      MatrixParser.parseFile(opts.input, function(err, matrix){
        if(err) {
          console.log(err);
          process.exit(2);
        }
        result = new Task.Builder()
          .setMatrix(matrix)
          .setStrategy(StrategyFactory.create(opts.strategy))
          .build()
          .run();

        console.log(result);
      });
    });
};
