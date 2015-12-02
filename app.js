var fs = require('fs'),
  gm = require('gm'),
  path = require('path'),
  howto = require('./howto.js'),
  compressImages = require('./compressimage.js'),
  chalk = require('chalk'),
  countFiles = 0,
  args = require('optimist').argv;

if ((args.h) || (args.help) || !args.s || !args.p) {
  howto();
  process.exit(0);
}

formatList = args.s.replace(' ', '').split(',');
aliasFolder = args.a ? args.a.replace(' ', '').split(',') : [];
excludedFolder = args.e ? args.e.replace(' ', '').split(',') : [];
imageRootFolder = args.p.charAt(args.p.length) === '/' ? args.p : args.p + '/';
imageRootFolder = path.resolve(imageRootFolder.replace(/\\/g, "/"));



var filterFileTree = function (currentPath) {
  var files = fs.readdirSync(currentPath);
  for (var i in files) {
    var currentFile = currentPath + '/' + files[i];
   
    var stats = fs.statSync(currentFile);
    
    if (stats.isFile()) {
      
      var fileName = files[i];
      var fileExt = fileName.substring(fileName.indexOf('.') + 1);

      if (fileExt === 'jpg' || fileExt === 'png') {
        for (var c in formatList) {
          var newDim = formatList[c],
              alias = aliasFolder[c] ? aliasFolder[c] : '' ,
              newWidth = newDim.substr(0, newDim.indexOf('x')),
              newHeight = newDim.substr(newDim.indexOf('x') + 1, newDim.length);
          (alias.length > 0) ? newPath = currentPath + '/' + alias : newPath = currentPath + '/' + newDim;
          
          if (!fs.existsSync(newPath)) { fs.mkdirSync(newPath) };
          if (!fs.existsSync(newPath + '/' + files[i])) { compressImages(currentFile, newWidth, newHeight, newPath, fileName);  countFiles++ }
        
        }
      }

    } else if (stats.isDirectory() && (excludedFolder.indexOf(files[i]) < 0) && (formatList.indexOf(files[i]) < 0))  {
      filterFileTree(currentFile);
    }
  }
};

filterFileTree(imageRootFolder);

console.log(chalk.green('-----'));
(countFiles > 0) ? console.log(chalk.green('Processing ' + chalk.yellow.bold(countFiles) + ' files')) : console.log(chalk.yellow('No images must be optimised'));
