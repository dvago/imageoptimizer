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

    switch(true) {
      case(this.data.size.width == width && this.data.size.height == height) :
        this.quality(90)
          .minify(5)
          .write(newFile, function (err) {
            if (!err) {
              var ext = newFile.substr(newFile.lastIndexOf('.') + 1),
                opti = (ext === 'png') ? newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.jpg' : newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.' + ext;

              execFile(mozjpeg, ['-outfile', opti, newFile ], function (err) {
                  console.log(chalk.green('New optimised file: ') + opti );
                  setTimeout(function() {
                      fs.unlink(newFile);
                  },100);
              });

            }

          });
        break;
      case(this.data.size.width > width && this.data.size.height > height) :
          var ext = newFile.substr(newFile.lastIndexOf('.') + 1),
            opti = (ext === 'png') ? newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.jpg' : newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.' + ext;

          this.setFormat("jpg")
          .gravity('Center')
          .thumb(width, height, newFile, 90, function (err){
              if (!err) {
                execFile(mozjpeg, ['-outfile', opti, newFile ], function (err) {
                    console.log(chalk.green('New optimised file: ') + opti );
                    setTimeout(function() {
                        fs.unlink(newFile);
                    },100);
                });
              }
          });
        break;
      default:
        console.log(chalk.red('Can\'t optimise this file: ') + newFile + chalk.red(' because the source sizes are: ') + this.data.size.width +'x'+ this.data.size.height + chalk.red(' and the requested output is bigger: ') + width + 'x' + height);
        break;
    }

//    if(this.data.size.width > width && this.data.size.height > height) {
//       this.setFormat("jpg")
//        .resize(width, height, '^')
//        .gravity('Center')
//        .crop(width, height)
//        .strip()
//        .quality(90)
//        .interlace('line')
//        .compress('JPEG')
//        .minify(5)
//        .write(newFile, function (err) {
//          if (!err) {
//            var ext = newFile.substr(newFile.lastIndexOf('.') + 1),
//              opti = (ext === 'png') ? newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.jpg' : newFile.substr(0, newFile.lastIndexOf('.')) + '-optimized.' + ext;
//
//            execFile(mozjpeg, ['-outfile', opti, newFile ], function (err) {
//                console.log(chalk.green('new optimised file: ') + opti );
//                setTimeout(function() {
//                    fs.unlink(newFile);
//                },100);
//            });
//
//          }
//
//        });
//    }

  });
  
  
};
