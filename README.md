
## Bitbar-plugins

my Bitbar plugins...


- ### huobibar

    show my [huobi.pro](https://www.huobi.pro/) account finance CNY in Mac OS menu bar, refresh once a minute.

    ![huobi bitbar menu bar](http://ww1.sinaimg.cn/large/61b8bbf4ly1forcm7t5ybj20ae0910vm.jpg)


### Usage

1. install Bitbar: https://github.com/matryer/bitbar

2. clone or download: git@github.com:naoyeye/bitbar-plugins.git 

3. `cd bitbar-plugins/huobibar` , `yarn` or `npm i`

4. copy `bitbar-plugins/huobibar/config/default-example.json` and rename as `default.json`

5. get `access_key` `secretkey`  from https://www.huobi.pro/zh-cn/apikey/, don't forget to [Bind IP Address]

6. get `account_id` from https://www.huobi.pro/zh-cn/user_center/uc_info/ , it shows as UID in page

7. <del>if you wanna deposit, input your `trade_password` in `default.json` .</del>

9. set `Plugins/Enabled` folder as your Bitbar plugins directory

    ![set Bitbar plugins directory](http://ww1.sinaimg.cn/large/61b8bbf4ly1fp6g73knd5j20qm0c4jsr.jpg)

10. get your account_id_pro then replace the `account_id_pro` in `default.json`

11. click `Refresh all` or wait one minute.