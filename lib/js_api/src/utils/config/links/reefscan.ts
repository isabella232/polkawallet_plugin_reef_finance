export default {
  chains: {
    "Reef testnet": "testnet",
    Reef: "reef"
  },
  create: (chain: string, path: string, data: any) =>
    chain==='testnet'?`https://${chain}.reefscan.com/${path}/${data.toString()}`:`https://reefscan.com/${path}/${data.toString()}`,
  isActive: true,
  paths: {
    address: "account",
    block: "block",
    // council: "council",
    extrinsic: "extrinsic",
    // proposal: "democracy_proposal",
    // referendum: "referenda",
    // techcomm: "tech",
    // treasury: "treasury",
  },
  url: "https://reefscan.com/",
};
