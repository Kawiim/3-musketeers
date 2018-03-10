/*eslint-disable no-process-exit*/
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const Conf = require('conf');
const pkg = require('../package.json');

const config = new Conf();

updateNotifier({pkg}).notify();

/** Function saving a given currency as default one
 * @param {array} argv - An optional array containing the default curencies to save
 * @param {string} argv[1] - The default inital currency
 * @param {string} argv[2-4] - The default targetted currencies 
 **/
const saveCurrencies = argv => {
  config.set('defaultFrom', argv[1] || config.get('defaultFrom', 'USD'));
  config.set(
    'defaultTo',
    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP'])
  );
  console.log(chalk.green('Saved default currencies to ' + config.path));
  process.exit(1);
};

/** 
 * Function printing the application version 
 **/
const version = () => {
  console.log(pkg.version);
  process.exit(1);
};

/**
 * Function printing help information for the user
 **/
const help = () => {
  console.log(`
Usage:

 $ ${chalk.cyan('cash')} ${chalk.green('<amount>')} ${chalk.yellow(
  '<currency>'
)}

 $ ${chalk.cyan('cash')} ${chalk.magenta('<command>')}

Commands:
${chalk.magenta('--save,  -s')}       Save currencies as default currencies
${chalk.magenta('--help,  -h')}       Display help message
${chalk.magenta('--version,  -v')}     Display version number

 List of currencies: http://akep.us/currencies

Examples:

 $ ${chalk.cyan('cash')} ${chalk.green('1')} ${chalk.yellow('usd')}

 $ ${chalk.cyan('cash')} ${chalk.green('1')} ${chalk.yellow('usd eur pln aud')}

 $ ${chalk.cyan('cash')} ${chalk.magenta('--save')} ${chalk.green(
  'usd'
)} ${chalk.yellow('eur pln aud')}

 $ ${chalk.cyan('cash')} ${chalk.magenta('--help')}
  `);
  process.exit(1);
};

/** Function used to detect command arguments and execute corresponding function
 * @param {array} argv - An array object containing the used command arguments
 **/
const helpers = argv => {
  // Version
  if (argv.indexOf('--version') !== - 1 || argv.indexOf('-v') !== - 1) {
    version();
  }

  // Help
  if (
    argv.indexOf('--help') !== - 1
    || argv.indexOf('-h') !== - 1
    || ! argv.length
  ) {
    help();
  }

  if (
    argv.indexOf('--save') !== - 1
    || argv.indexOf('-s') !== - 1
    || ! argv.length
  ) {
    saveCurrencies(argv);
  }
};

module.exports = helpers;
