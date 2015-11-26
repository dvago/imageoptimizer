var gm = require('gm'),
    fs = require('fs'),
    chalk = require('chalk'),
    execFile = require('child_process').execFile,
    mozjpeg = require('mozjpeg');

module.exports = function(file, width, height, path, filename) {
  
  
  var readStream = fs.createReadStream(file),
    newFile = path + '/' + filename;

  gm(readStream)
  .size({bufferStream: true}, function(err, size) {
    this.resize(width, height, '^')
        .gravity('Center')
        .crop(width, height)
        .strip()
        .quality(90)
        .interlace('line')
        .compress('JPEG')
        .minify(5)
        .write(newFile, function (err) {
          if (!err) {
            var ext = newFile.substr(newFile.lastIndexOf('.') + 1),
                opti = newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.' + ext;

            execFile(mozjpeg, ['-outfile', opti, newFile ], function (err) {
                console.log(chalk.green('new optimised file: ') + opti );
                setTimeout(function() {
                    fs.unlink(newFile);
                },100);
            });

          }

        });
  });
  
  
};
