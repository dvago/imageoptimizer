var chalk = require('chalk');

module.exports = function() {
  console.log('');
  console.log(chalk.green('                          Image optimization tool                      '));
  console.log('');
  console.log(chalk.green('                               by davide vago                            '));
  console.log('');
  console.log(chalk.yellow('---------------------------------------------------------------------------'));
  console.log(chalk.yellow.bold('|                      How to use this magic program                      |'));
  console.log(chalk.yellow('---------------------------------------------------------------------------'));  
  console.log('');
  
  console.log(chalk.red('-p') + '        ' + chalk.white('define the path of your folder, note: the script is recursive'));
  console.log('          ' + chalk.white('example: ') + chalk.green('-p "C:/Somefolder/Somesubfolder"'));
  console.log('');
  console.log(chalk.red('-s') + '        ' + chalk.white('define the sizes you want create'));
  console.log('          ' + chalk.white('example: ') + chalk.green('-s "640x6400,80x80,120x120,300x450"'));
  console.log('');
  console.log(chalk.red('-a') + '        ' + chalk.white('define the folder name you want create inside the path specified with -p flag'));
  console.log('          ' + chalk.white('example: ') + chalk.green('-s "thumbnail,banners,slides"'));
  console.log('');
  
}
