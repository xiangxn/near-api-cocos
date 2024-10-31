# Near-api-cocos

一个融合了Near基础api和near-wallet-selector的封装库，主要用于cocos creator。

目前在cocos creator 3.8.4上测试通过

## Usage
```bash
# 安装依赖模块
npm i

# 编译
npm run build
```

编译完成后将dist目录的```near-api-cocos.min.js```作为模块导入到cocos creator中，然后在代码中如下编写：
```
import { _decorator, Component, Node } from 'cc';
import nearAPI from "./near-api-cocos.min.js";

const { ccclass, property } = _decorator;
const { Wallet } = nearAPI;

@ccclass('Game')
export class Game extends Component {
    selector = void 0
    networkId = "testnet"
    createAccessKeyFor = "max30.necklace-dev.testnet"
    wallet = new Wallet({ networkId: this.networkId, createAccessKeyFor: this.createAccessKeyFor });

    start() {

    }

    update(deltaTime: number) {

    }

    onLoad() {
        // console.log("nearAPI:", Wallet, this.wallet)
        this.wallet.startUp(this.changeHook)
    }

    changeHook(account) {
        console.log("account: ", account)
    }

    async onClick() {
        this.wallet.signIn()
    }
}
```