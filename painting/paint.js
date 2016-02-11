module.exports = function(parser){
  parser.command('paint')
    .option('option', {
      abbr: 'o',
      default: 'awesome!!',
      help: 'Some option help'
    })
    .callback(function(opts){
      console.log('paint is %s', opts.option);
    });
};
