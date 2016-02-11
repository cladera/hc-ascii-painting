'use strict';
var fs = require('fs'),
  readline = require('readline'),
  Paint = require('../lib/Paint');


module.exports = function(parser){
  parser.command('paint')
    .option('input', {
      abbr: 'i',
      help: 'Commands input file',
      required: true
    })
    .option('rows',{
      abbr: 'r',
      help: 'Canvas rows',
      required: true
    })
    .option('columns', {
      abbr: 'c',
      help: 'Canvas columns',
      required: true
    })
    .callback(function(opts){

      var stream,
        rl,
        count = 0,
        paint;

      //Render
      fs.stat(opts.input, function(err){
        if(err){
          process.exit(1);
        }

        paint = new Paint(opts.rows, opts.columns);

        stream = fs.createReadStream(opts.input);
        rl = readline.createInterface({input: stream, terminal: false});

        rl.on('line', function(line) {
          if(count !== 0) {
            paint.print(line);
          }
          count++;
        });

        rl.on('close', function(){
          stream.close();
          console.log(paint.flush());
        });

        rl.on('SIGINT', function(){
          rl.close();
          stream.close();
          console.log(paint.flush());
        });

      });
    });
};
