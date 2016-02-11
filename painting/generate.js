'use strict';

var fs = require('fs'),
  MatrixParser = require('../lib/MatrixParser'),
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
    .option('output', {
      abbr: 'o',
      required: true,
      help: 'Output file'
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
        var stream = fs.createWriteStream(opts.output);
        stream.once('open', function(){
          stream.write(result.commands.length+'\n');
          stream.write(result.commands.join('\n'));
          stream.end();
        });
      });
    });
};
