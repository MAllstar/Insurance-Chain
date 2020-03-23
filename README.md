"# Insurance-Chain"  ——————————基于以太坊区块链平台去中心化的Dapp
1.后台管理端（保险公司）
2.用户端
3.区块链浏览器


一 环境搭建：
1.安装Node.js

2.安装 Truffle ：npm install -g truffle

3.安装Ganache


二 项目目录结构：
1.client /客户端
2.contracts/ 智能合约的文件夹，所有的智能合约文件都放置在这里，里面包含一个重要的合约 Migrations.sol（稍后再讲）
3.migrations/ 用来处理部署（迁移）智能合约 ，迁移是一个额外特别的合约用来保存合约的变化。
4.test/ 智能合约测试用例文件夹
5.truffle.js/ 配置文件

三 编译部署智能合约：
Truffle集成了一个开发者控制台，可用来生成一个开发链用来测试和部署智能合约。

编译
Solidity 是编译型语言，需要把可读的 Solidity 代码编译为 EVM 字节码才能运行。
dapp 的根目录 pet-shop-tutorial 下

> truffle compile
输出

Compiling ./contracts/Adoption.sol...
Writing artifacts to ./build/contracts
部署
编译之后，就可以部署到区块链上。
在执行部署之前，需要确保有一个区块链运行， 可以使用
Ganache来开启一个私链来进行开发测试，默认会在 7545 端口上运行一个开发链。
接下来执行部署命令：

> truffle  migrate
执行后，有一下类似的输出，


Using network 'develop'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x3076b7dac65afc44ec51508bf6f2b6894f833f0f9560ecad2d6d41ed98a4679f
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying Adoption...
  ... 0x2c6ab4471c225b5473f2079ee42ca1356007e51d5bb57eb80bfeb406acc35cd4
  Adoption: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...

Using network 'develop'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x3076b7dac65afc44ec51508bf6f2b6894f833f0f9560ecad2d6d41ed98a4679f
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying Adoption...
  ... 0x2c6ab4471c225b5473f2079ee42ca1356007e51d5bb57eb80bfeb406acc35cd4
  Adoption: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...

这时说明已经智能合约已经部署好了。

四 在浏览器中运行
1.安装 MetaMask
MetaMask 是一款插件形式的以太坊轻客户端，开发过程中使用 MetaMask 和我们的 dapp 进行交互是个很好的选择，通过此链接安装，安装完成后，浏览器工具条会显示一个小狐狸图标。
2.连接开发区块链网络
默认连接的是以太坊主网（左上角显示），选择Custom RPC，添加一个网络：http://127.0.0.1:7545
3.client安装依赖 npm install
4.启动服务 npm start




