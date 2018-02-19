#!/usr/bin/env /usr/local/bin/node
// jshint esversion: 6, asi: true

// <bitbar.title>Huobi account finance</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Jiyun Han</bitbar.author>
// <bitbar.author.github>naoyeye</bitbar.author.github>
// <bitbar.desc>Get account finance from huobi.pro</bitbar.desc>
// <bitbar.dependencies>node.js bluebird config crypto-js moment request</bitbar.dependencies>


const bitbar = require('bitbar');
const huobibar = require('./huobibar');

huobibar.run(function(finance) {
  bitbar([
    {
      text: finance,
      color: bitbar.darkMode ? '#55fd13' : '#333333',
      font: 'Source Code Pro',
      size: 13,
      length: 7,
      dropdown: false
    },
    // bitbar.sep,
    // {
    //   text: 'Unicorns',
    //   color: '#ff79d7',
    //   submenu: [
    //     {
    //       text: ':tv: Video',
    //       href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4'
    //     },
    //     {
    //       text: ':book: Wiki',
    //       href: 'https://en.wikipedia.org/wiki/Unicorn'
    //     }
    //   ]
    // },
    // bitbar.sep,
    // 'Ponies'
  ]);
});

