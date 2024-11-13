export default {
    eth: {
      providerUrl: process.env.ETH_PROVIDER_URL
    },
    btc: {
      network: process.env.BTC_NETWORK || 'testnet'
    },
    ton: {
      providerUrl: process.env.TON_PROVIDER_URL
    }
  };