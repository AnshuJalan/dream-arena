const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    cldev: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    matic: {
      provider: () => {
        return new HDWalletProvider(
          "trust stage foster bundle usual letter veteran claw fat rebuild artefact flip",
          "https://rpc-mumbai.matic.today"
        );
      },
      network_id: "*",
      // ~~Necessary due to https://github.com/trufflesuite/truffle/issues/1971~~
      // Necessary due to https://github.com/trufflesuite/truffle/issues/3008
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.6.0",
    },
  },
};
