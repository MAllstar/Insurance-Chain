var Userlogin = artifacts.require("./Userlogin.sol");

module.exports = function(deployer) {
  deployer.deploy(Userlogin);
};
