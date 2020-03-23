var storageData = artifacts.require("./storageData.sol");

module.exports = function(deployer) {
  deployer.deploy(storageData);
};
