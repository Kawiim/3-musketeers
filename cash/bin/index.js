#!/usr/bin/env node

const Conf = require('conf');
const helpers = require('./helpers.js');
const cash = require('./cash.js');

const config = new Conf();

/** 
 * Splitting the command from the given arguments 
 **/
const argv = process.argv.slice(2);

helpers(argv);

const command = {
  'amount': argv[0] || 1,
  'from': argv[1] || config.get('defaultFrom', 'USD'),
  'to':
    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP', 'PLN'])
};

cash(command);
