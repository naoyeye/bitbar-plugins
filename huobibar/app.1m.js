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

huobibar.run(function(myFinance, myBalance, btcusdt, usdCnyRate) {
  bitbar([
    {
      text: myFinance || '出错了',
      color: bitbar.darkMode ? '#55fd13' : '#333333',
      font: 'Source Code Pro',
      size: 15,
      length: 10,
      dropdown: false
    },
    bitbar.sep,
    `我有几个币：${parseFloat(myBalance).toFixed(8)}`,
    `BTC/USDT：${btcusdt}`,
    `美元人民币：${usdCnyRate}`,
    bitbar.sep,
    {
      text: '查看行情',
      color: 'green',
      href: 'https://www.huobi.pro/zh-cn/coin_coin/exchange/#btc_usdt'
    }
  ]);
});

