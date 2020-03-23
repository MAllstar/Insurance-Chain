var deviceData = artifacts.require("./deviceData.sol");

module.exports = function(deployer) {
  deployer.deploy(deviceData);
};
