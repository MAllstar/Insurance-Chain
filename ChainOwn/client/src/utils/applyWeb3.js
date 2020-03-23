import Web3 from 'web3';
import $ from 'jquery';

export var Ethers = {
  web3Provider: null,
  contracts: {},

  initWeb3: async function() {
      // 检查新版MetaMask
    if (window.ethereum) {
      this.web3Provider = window.ethereum;
      try {
        // 请求用户账号授权
        await window.ethereum.enable();
      } catch (error) {
        // 用户拒绝了访问
        console.error("User denied account access")
      }
    }
    // 老版 MetaMask
    else if (window.web3) {
      this.web3Provider = window.web3.currentProvider;
    }
  // 如果没有注入的web3实例，回退到使用 Ganache
    else {
      this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    }
    const web3 = new Web3(this.web3Provider);

    return this.initContract();
  },

  initContract: function() {
    // 加载Adoption.json，保存了Adoption的ABI（接口说明）信息及部署后的网络(地址)信息，它在编译合约的时候生成ABI，在部署的时候追加网络信息
    $.getJSON('Application.json', function(data) {
      // 用Adoption.json数据创建一个可交互的TruffleContract合约实例。
      var AdoptionArtifact = data;
      Ethers.contracts.Adoption = window.TruffleContract(AdoptionArtifact);
  
      // Set the provider for our contract
      Ethers.contracts.Adoption.setProvider(this.web3Provider);
  
      // Use our contract to retrieve and mark the adopted pets
      return Ethers.markAdopted();
    });
    return this.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.ant-btn', this.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;
  
    this.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
  
      // 调用合约的getAdopters(), 用call读取信息不用消耗gas
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
        if (adopters !== '0x0000000000000000000000000000000000000000') {
          console.log("true");  
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();
  
  
    // 获取用户账号
    window.web3.eth.getAccounts(function(error, account) {
      if (error) {
        console.log(error);
      }
      var adoptionInstance;
      var account = account;
    
      Ethers.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance; 
    
        // 发送交易领养宠物
        return adoptionInstance.adopt({from: account});
      }).then(function(result) {
        return Ethers.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

} 

