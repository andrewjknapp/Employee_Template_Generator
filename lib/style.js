const chalk = require('chalk');

//This function takes in a string and colors each character with one of six colors
function rAiNbOw(str) {
    let retStr = ``;
    for (let i = 0; i < str.length; i++) {
        let check = Math.floor(Math.random()*6);
        switch(check) {
            case 0:
                retStr += `${chalk.red(str[i])}`;
                break;
            case 1:
                retStr += `${chalk.green(str[i])}`;
                break;
            case 2:
                retStr += `${chalk.yellow(str[i])}`;
                break;
            case 3:
                retStr += `${chalk.blue(str[i])}`;
                break;
            case 4:
                retStr += `${chalk.magenta(str[i])}`;
                break;
            case 5:
                retStr += `${chalk.cyan(str[i])}`;
                break;
            default:
              retStr += str[i];
              break;       
        }
    }
    return retStr;
  }

module.exports = {
    rAiNbOw
}