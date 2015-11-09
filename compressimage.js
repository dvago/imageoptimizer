var gm = require('gm'),
    fs = require('fs'),
    chalk = require('chalk');

module.exports = function(file, width, height, path, filename) {
  
  
  var readStream = fs.createReadStream(file);
  gm(readStream)
  .size({bufferStream: true}, function(err, size) {
    this.resize(width, height, '^')
        .gravity('Center')
        .crop(width, height)
        .strip()
        .quality(88)
        .interlace('line')
        .compress('JPEG')
        .minify(5)
        .write(path + '/' + filename, function (err) {
          if (!err) {
            console.log(chalk.green('new optimised file: ') + this.outname );
          }
        });
  });
  
  
};