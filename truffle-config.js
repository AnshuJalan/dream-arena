const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
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
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          "trust stage foster bundle usual letter veteran claw fat rebuild artefact flip",
          "https://kovan.infura.io/v3/9af628a1de16445dac2e54ae3176798a"
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
