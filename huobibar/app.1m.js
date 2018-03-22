#!/usr/bin/env /usr/local/bin/node
// jshint esversion: 6, asi: true

// <bitbar.title>Huobi account finance</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Jiyun Han</bitbar.author>
// <bitbar.author.github>naoyeye</bitbar.author.github>
// <bitbar.desc>Get account finance from huobi.pro</bitbar.desc>
// <bitbar.dependencies>node.js bluebird config crypto-js moment request</bitbar.dependencies>


// 准备工作，填写 config/default.json中的:
// access_key & secretkey, www.huobi.com上申请
// account_id 登陆后看自己的UID
// trade_password 可以先不填，提现时需要

// 把get_account获取到的 type=spot 的id填写到:
// default.json中的${account_id_pro}中去


const bitbar = require('bitbar')
const huobibar = require('./huobibar')

// huobibar.getLastestPrice('eos')
// return;

let coinList = ''

let COLOR='green'

huobibar.getAccountIdPro((resp) => {
  // console.log('resp - ', resp)
  // 获取失败
  if (resp.status === 0) {
     bitbar([
      `${resp.mess}`
    ])
    return;
  // 获取成功
  } else if (resp.status === 1) {

    bitbar([
      `获取成功`,
       bitbar.sep,
      `${resp.mess} ${resp.data}, 请先填写到 config/default.json 中`
    ])
    return;
  
  // 之前已经设置过
  } else  if (resp.status === 2) {
    // 主程序
    huobibar.run(function(total, myBalance, account_id_pro) {
      // console.log('最终拿到的 usdCnyRate： ', usdCnyRate)
        if (!account_id_pro) {
          bitbar([
            '请先设置 account_id_pro'
          ])
          return;
        }

        if (!total || !myBalance) {
          bitbar([
            '出错了'
          ])
          return;
        }

        myBalance.map((item) => {
          coinList += `我有 ${parseFloat(item.balance).toFixed(8)} 个 ${item.currency} 币\n价值 ${item.balance * item.price} 元 \n${item.currency.toUpperCase()}/CNY ￥${item.price}\n`
        })

        bitbar([
          {
            text: total || '出错了',
            color: bitbar.darkMode ? 'green' : '#333333',
            font: 'Source Code Pro',
            size: 15,
            length: 10,
            dropdown: false
          },
          bitbar.sep,
          {
            text: coinList
          },
          bitbar.sep,
          // `美元人民币：${usdCnyRate}`,
          bitbar.sep,
          {
            text: '查看行情',
            color: 'green',
            href: 'https://www.huobi.pro/zh-cn/coin_coin/exchange/#btc_usdt'
          }
        ])
      }
    )

  // 出错
  } else {
    bitbar([
      `啊啊啊`
    ])
  }
})



