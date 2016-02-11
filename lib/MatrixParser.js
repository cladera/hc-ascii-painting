var fs = require('fs'),
  readline = require('readline');

function MatrixParser() {}

MatrixParser.parseFile = function(file, cb) {
  var stream,
    rl,
    matrix = [],
    count = 0;
  cb = cb || function(){};
  fs.stat(file, function(err) {
    if(err) {
      return cb(err);
    }

    stream = fs.createReadStream(file);
    rl = readline.createInterface({input: stream, terminal: false});

    rl.on('line', function(line) {
      if(count !== 0) {
        matrix[count-1] = MatrixParser.parseLine(line);
      }
      count++;
    });

    rl.on('close', function(){
      stream.close();
      cb(null, matrix);
    });

    rl.on('SIGINT', function(){
      rl.close();
      stream.close();
      cb(null, matrix);
    });
  });
};

MatrixParser.parseLine = function(line){
  var i,
    arr = [],
    char;
  for(i = 0; i < line.length; i++) {
    char = line[i];
    arr.push(char === '#');
  }
  return arr;
};


module.exports = MatrixParser;