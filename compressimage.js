var gm = require('gm'),
    fs = require('fs'),
    chalk = require('chalk'),
    execFile = require('child_process').execFile,
    imagemin = require('imagemin'),
    optimage = require('optimage'),
    mozjpeg = require('mozjpeg');

module.exports = function(file, width, height, path, filename) {
  
  
  var readStream = fs.createReadStream(file),
    newFile = path + '/' + filename,
    finalCompressor = function(path, newFile, opti) {
      new imagemin()
          .src(newFile)
          .use(imagemin.jpegtran({progressive: true}))
          .run(function (err, files) {

          optimage({
            inputFile: newFile,
            outputFile: newFile
          }, function (err, res) {

            if (!err) {
              execFile(mozjpeg, ['-outfile', opti, newFile], function (err) {
                console.log(chalk.green('new optimised file: ') + opti);
                setTimeout(function () {
                  fs.unlink(newFile);
                }, 100);
              });
            }
          });
        })
    };


  gm(readStream).size({bufferStream: true}, function(err, size) {

    switch(true) {
      case(this.data.size.width == width && this.data.size.height == height) :
        this.filter('hamming')
            .quality(90)
            .interlace('Line')
            .strip()
            .compress('Zip')
            .write(newFile, function (err) {
              if (!err) {
                var ext = newFile.substr(newFile.lastIndexOf('.') + 1),
                    opti = (ext === 'png') ? newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.jpg' : newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.' + ext;

                finalCompressor(path, newFile, opti);
              }
            });
        break;
      case(this.data.size.width > width && this.data.size.height > height) :
          var ext = newFile.substr(newFile.lastIndexOf('.') + 1),
              opti = (ext === 'png') ? newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.jpg' : newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.' + ext;

          this.setFormat("jpg")
              .gravity('Center')
              .resize(width, height, '^')
              .crop(width, height)
              .filter('hamming')
              .unsharp(0.5)
              .quality(90)
              .interlace('Line')
              .strip()
              .compress('Zip')
              .write(newFile, function (err) {
                if (!err) {
                  finalCompressor(path, newFile, opti);
                }
              });
        break;
      default:
        console.log(chalk.red('Can\'t optimise this file: ') + newFile + chalk.red(' because the source size is: ') + this.data.size.width +'x'+ this.data.size.height + chalk.red(' and the requested output has a parameter bigger: ') + width + 'x' + height);
        break;
    }

  });
  
  
};
