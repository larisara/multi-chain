exports.NETWORKS = {
    HARMONY_ONE: {
        chainName: 'Harmony One',
        chainId: 1666600000,
        rpcUrl: 'https://api.harmony.one/',
    },

    FANTOM: { chainName: 'Fantom Opera', chainId: 250, rpcUrl: 'https://rpc.ftm.tools/' },
}

exports.TOKENS = {
    KUSD: {
        name: 'KUSD',
        address: '0x60d717d69f964f4b67de9786e1796a4cf0d89940',
        decimals: 18,
    },
    ONE_USDC: {
        name: '1USDC',
        address: '0x985458e523db3d53125813ed68c274899e9dfab4',
        decimals: 6,
    },
    ONE_USDT: {
        name: '1USDT',
        address: '0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f',
        decimals: 6,
    },
    ONE_BUSD: {
        name: '1BUSD',
        address: '0xe176ebe47d621b984a73036b9da5d834411ef734',
        decimals: 18,
    },
    bsc_USDC: {
        name: 'bscUSDC',
        address: '0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa',
        decimals: 18,
    },
    bsc_USDT: {
        name: 'bscUSDT',
        address: '0x9A89d0e1b051640C6704Dde4dF881f73ADFEf39a',
        decimals: 18,
    },
    bsc_BUSD: {
        name: 'bscBUSD',
        address: '0x0aB43550A6915F9f67d0c454C2E90385E6497EaA',
        decimals: 18,
    },
}

exports.POOLS = {
    [this.NETWORKS.HARMONY_ONE.chainId]: {
        ...this.NETWORKS.HARMONY_ONE,
        pools: [
            {
                name: 'ETH LPs',
                address: '0xd7AcB90798f3a5DDd511B863A8105cF08eDA6865',
                swapAddress: '0x44A783b046F012287A233E4e51949f47A2279deE',
                tokensInPool: [
                    this.TOKENS.ONE_USDC,
                    this.TOKENS.ONE_USDT,
                    this.TOKENS.ONE_BUSD,
                    this.TOKENS.KUSD,
                ],
            },
            {
                name: 'BSC LPs',
                address: '0x72b9B9811C7893298F3E592107eFdC14d530AC51',
                swapAddress: '0xcCB7C3166729fe92C914FB38B850696748d83db8',
                tokensInPool: [
                    this.TOKENS.bsc_USDC,
                    this.TOKENS.bsc_USDT,
                    this.TOKENS.bsc_BUSD,
                    this.TOKENS.KUSD,
                ],
            },
        ],
    },
    [this.NETWORKS.FANTOM.chainId]: {
        ...this.NETWORKS.FANTOM,
        pools: [
            {
                name: 'Dopple LP (DOP-LP)',
                address: '0x9116F04092828390799514Bac9986529d70c3791',
                swapAddress: '0x5162f992EDF7101637446ecCcD5943A9dcC63A8A',
                tokensInPool: [
                    {
                        name: 'USDC',
                        address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
                        decimals: 6,
                    },
                    {
                        name: 'fUSDT',
                        address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
                        decimals: 6,
                    },
                    {
                        name: 'DAI',
                        address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
                        decimals: 18,
                    },
                    {
                        name: 'MIM',
                        address: '0x82f0b8b456c1a451378467398982d4834b6829c1',
                        decimals: 18,
                    },
                ],
            },
        ],
    },
}
