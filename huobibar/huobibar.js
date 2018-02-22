/* eslint-disable */

const hbsdk = require('./sdk/hbsdk');
const http = require('./framework/httpClient');

let myBalance = []
let btcusdt = []
let usdCnyRate = 0
let total = 0
let finish = 0

function getLastestPrice(symbol) {
    return new Promise((resolve, reject) => {
        let url = `https://api.huobi.pro/market/history/kline?period=1min&size=1&symbol=${symbol}`;
        http.get(url, {
            timeout: 1000,
            gzip: true
        }).then(resp => {
            let json = JSON.parse(resp);

            if (json.status === 'ok') {
                let closePrice = json.data[0].close
                resolve(closePrice);
            } else {
                resolve(null);
            }
        }).catch(ex => {
            resolve(null);
        });
    });
}

function getLatestUsdCnyRate() {
    return new Promise(resolve => {
        let url = `https://api.huobi.pro/v1/rate/usd_cny_rate`
        http.get(url, {
            timeout: 1000,
            gzip: true
        }).then(resp => {
            let json = JSON.parse(resp)
            if (json.status === 'ok') {
                let latestUsdCnyRate = json.data
                resolve(latestUsdCnyRate);
            } else {
                resolve(null);
            }
        }).catch(ex => {
            resolve(null);
        });
    })
}

function run(callback) {
    // 准备工作，填写config/default.json中的:
    // access_key & secretkey, www.huobi.com上申请
    // account_id 登陆后看自己的UID
    // trade_password 可以先不填，提现时需要

    // 第一步，获取account_id
    hbsdk.get_account().then();
    // 把get_account获取到的type=spot的id填写到:
    // default.json中的${account_id_pro}中去
    
    // 获取人民币美元汇率
    getLatestUsdCnyRate().then(latestUsdCnyRate => {
        usdCnyRate = latestUsdCnyRate
    }).catch(ex => {
        callback && callback('获取人民币美元汇率出错', myBalance, usdCnyRate)
        return
    });

    // 第二步，获取Balance
    hbsdk.get_balance().then((data)=>{
        if (!data) {
            callback && callback('没有数据', myBalance, usdCnyRate)
            return
        }
        data.list.map((item) => {
            if (item.type === 'trade' && item.balance !== '0.000000000000000000') {
                myBalance.unshift({
                    currency: item.currency,
                    balance: item.balance
                })
            }
        })

        myBalance.map((item) => {
            // 获取币价格
            getLastestPrice(`${item.currency}usdt`).then(closePrice => {
                item.price = closePrice

                finish = finish + 1

                // 计算全部币转换为人民币后的价格
                total = total + parseInt((item.balance * item.price * usdCnyRate).toFixed(0), 10)

                if (finish === myBalance.length) {
                    callback && callback(`￥${total}`, myBalance, usdCnyRate)
                }

            }).catch(ex => {
                callback && callback('获取比特币美元汇率出错', myBalance, usdCnyRate)
                return
            })
        })

    }).catch(ex => {
        callback && callback('获取账户比特币资产出错', myBalance, usdCnyRate)
        return
    })


    // hbsdk.get_open_orders('btcusdt').then((data) => {
    //     console.log('data = ', data)
    // });

    // 第三步，交易
    // hbsdk.buy_limit('ltcusdt', 0.01, 0.1);

    // 第四步，检查订单
    // hbsdk.get_order(377378515).then(console.log);

    // 第五步，提现
    // 先去网站上设置好安全提现地址
    // 欢迎打赏到我的钱包，我可以协助测试 ^^
    // hbsdk.withdrawal('0x9edfe04c866d636526828e523a60501a37daf8f6', 'etc', 1);
}


var huobiBar = {
    'run': run
}

module.exports = huobiBar;
