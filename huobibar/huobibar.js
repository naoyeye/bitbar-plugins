/* eslint-disable */

const hbsdk = require('./sdk/hbsdk');
const http = require('./framework/httpClient');

var config = require('./config/default.json');

let accountIdPro = config.huobi.account_id_pro
let myBalance = []
let btcusdt = []
let usdCnyRate = 0
let total = 0
let finish = 0


function getLastestPrice(symbol) {

    return new Promise((resolve, reject) => {

        let url = `https://api.coinmarketcap.com/v1/ticker/${symbol}/?convert=CNY`;


        http.get(url, {
            timeout: 4000,
            gzip: true
        }).then(resp => {
            // console.log(`getLastestPrice ${symbol} resp - `, resp)
            let json = JSON.parse(resp);

            let closePrice = json[0].price_cny
            resolve(closePrice);

        }).catch(ex => {
            // console.log(`getLastestPrice ${symbol} ex - `, ex)
            resolve(null);
        });

    });
}

// 获取人民币美元汇率
function getLatestUsdCnyRate() {
    // console.log('获取人民币美元汇率 2')
    return new Promise(resolve => {
        let url = `http://api.k780.com/?app=finance.rate&scur=USD&tcur=CNY&appkey=32282&sign=4f0a02693e7a594ea448e2d62264242c`
        http.get(url, {
            timeout: 6000,
            gzip: true
        }).then(resp => {
            
            let json = JSON.parse(resp)
            // console.log('获取人民币美元汇率 resp = ', resp)
            if (json.success === '1') {
                let latestUsdCnyRate = json.result.rate
                // console.log('latestUsdCnyRate = ' ,latestUsdCnyRate)
                resolve(latestUsdCnyRate);
            } else {
                resolve(null);
            }
        }).catch(ex => {
            // console.log('获取人民币美元汇率 ex = ', ex)
            resolve(null);
        });
    })
}


function getAccountIdPro(callback) {
    if (!config.huobi.account_id_pro || config.huobi.account_id_pro === 'replace_me') {
        // console.log('getAccountIdPro 2 ')
        hbsdk.get_account().then((data) => {
            // console.log('获取账户信息', data)
            data.map(item => {
                if (item.type === 'spot') {
                    accountIdPro = item.id
                    callback && callback({'status': 1, 'mess': '你的 account_id_pro 为', data: accountIdPro });
                }
            })
        }).catch(ex => {
            // // console.log('获取账户信息出错', ex)
            callback && callback({'status': 0, 'mess': '获取账户信息出错', data: null})
        })

        return;
    } else {
        // console.log('已经设置了', config.huobi.account_id_pro)
        callback && callback({'status': 2, 'mess': '已经设置了', data: config.huobi.account_id_pro})
    }

}

function run(callback) {
    // 获取账户Balance
    hbsdk.get_balance().then((data)=>{
        if (!data) {
            callback && callback('没有数据', myBalance, accountIdPro)
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

        // console.log('账户结果 myBalance - ', myBalance)

        myBalance.map((item) => {
            let symbol = `${item.currency === 'btc' ? 'bitcoin' : item.currency}`

            // 获取币价格
            getLastestPrice(symbol).then(closePrice => {

                // console.log('closePrice = ', closePrice)

                item.price = closePrice
                finish = finish + 1

                // 计算全部币转换为人民币后的价格
                total = total + parseInt((item.balance * item.price).toFixed(0), 10)

                // console.log('总价值 total = ', total)

                if (finish === myBalance.length) {
                    // console.log('全部结束')
                    callback && callback(`￥${total}`, myBalance, accountIdPro)
                }

            }).catch(ex => {
                // console.log('获取币价格出错', ex)
                callback && callback('获取币价格出错', myBalance, accountIdPro)
                return
            })
        })

    }).catch(ex => {
        // console.log('获取账户资产出错')
        callback && callback('获取账户资产出错', myBalance, accountIdPro)
        return
    })


    // hbsdk.get_open_orders('btcusdt').then((data) => {
    //     // console.log('data = ', data)
    // });

    // 第三步，交易
    // hbsdk.buy_limit('ltcusdt', 0.01, 0.1);

    // 第四步，检查订单
    // hbsdk.get_order(377378515).then(// console.log);

    // 第五步，提现
    // 先去网站上设置好安全提现地址
    // 欢迎打赏到我的钱包，我可以协助测试 ^^
    // hbsdk.withdrawal('0x9edfe04c866d636526828e523a60501a37daf8f6', 'etc', 1);
}


var huobiBar = {
    'run': run,
    'getAccountIdPro': getAccountIdPro,
    'getLatestUsdCnyRate': getLatestUsdCnyRate,
    'getLastestPrice': getLastestPrice
}

module.exports = huobiBar;
