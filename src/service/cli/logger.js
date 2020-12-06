'use strict';

const chalk = require(`chalk`);

function Logger(message, color) {
  this.showInfo = () => {
    this.color = color;
    this.message = message;

    console.log(chalk.this.color(this.message));
  };
}

module.exports = {
  Logger
};
