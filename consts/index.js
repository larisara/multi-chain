exports.NETWORKS = {
    HARMONY_ONE: {
        chainName: 'Harmony One',
        chainId: 1666600000,
        rpcUrl: 'https://api.harmony.one/',
    },

    FANTOM: { chainName: 'Fantom Opera', chainId: 250, rpcUrl: 'https://rpc.ftm.tools/' },
    BSC: { chainName: 'BSC', chainId: 56, rpcUrl: 'https://bsc-dataseed1.ninicoin.io/' },
}

exports.TOKENS = {
    // * BSC
    KUSD: {
        name: 'KUSD',
        address: '0x940Ff63e82d15fb47371BFE5a4ed7D7D183dE1A5',
        decimals: 18,
    },
    BUSD: {
        name: 'BUSD',
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        decimals: 18,
    },
    USDT: {
        name: 'USDT',
        address: '0x55d398326f99059fF775485246999027B3197955',
        decimals: 18,
    },
    USDC: {
        name: 'USDC',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        decimals: 18,
    },
    DAI: {
        name: 'DAI',
        address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        decimals: 18,
    },
    UST: {
        name: 'UST',
        address: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
        decimals: 18,
    },
    BTCB: {
        name: 'BTCB',
        address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
        decimals: 18,
    },
    renBTC: {
        name: 'renBTC',
        address: '0xfCe146bF3146100cfe5dB4129cf6C82b0eF4Ad8c',
        decimals: 8,
    },
    USDN: {
        name: 'renBTC',
        address: '0x03ab98f5dc94996F8C33E15cD4468794d12d41f9',
        decimals: 18,
    },
    TUSD: {
        name: 'TUSD',
        address: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
        decimals: 18,
    },
    // * HARMONY
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
    // * FANTOM
    FANTOM_USDC: {
        name: 'USDC',
        address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
        decimals: 6,
    },
    FANTOM_USDT: {
        name: 'fUSDT',
        address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
        decimals: 6,
    },
    FANTOM_DAI: {
        name: 'DAI',
        address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
        decimals: 18,
    },
    FANTOM_MIM: {
        name: 'MIM',
        address: '0x82f0b8b456c1a451378467398982d4834b6829c1',
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
                deployedAt: 18111836
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
                deployedAt: 18111883
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
                tokensInPool: [this.TOKENS.FANTOM_USDC, this.TOKENS.FANTOM_USDT, this.TOKENS.FANTOM_DAI, this.TOKENS.FANTOM_MIM],
                deployedAt: 18930210
            },
        ],
    },
    [this.NETWORKS.BSC.chainId]: {
        ...this.NETWORKS.BSC,
        pools: [
            {
                name: 'DOP LPs',
                address: '0x9116F04092828390799514Bac9986529d70c3791',
                swapAddress: '0x5162f992EDF7101637446ecCcD5943A9dcC63A8A',
                tokensInPool: [this.TOKENS.DAI, this.TOKENS.BUSD, this.TOKENS.USDT, this.TOKENS.USDC],
            },
            {
                name: '2 Pools LPs',
                address: '0x124166103814E5a033869c88e0F40c61700Fca17',
                swapAddress: '0x449256e20ac3ed7F9AE81c2583068f7508d15c02',
                tokensInPool: [this.TOKENS.BUSD, this.TOKENS.USDT],
            },
            {
                name: 'UST LPs',
                address: '0x7Edcdc8cD062948CE9A9bc38c477E6aa244dD545',
                swapAddress: '0x830e287ac5947B1C0DA865dfB3Afd7CdF7900464',
                tokensInPool: [this.TOKENS.UST, this.TOKENS.BUSD, this.TOKENS.USDT],
            },
            {
                name: 'DOLLY LPs',
                address: '0xAA5509Ce0ecEA324bff504A46Fc61EB75Cb68B0c',
                swapAddress: '0x61f864a7dFE66Cc818a4Fd0baabe845323D70454',
                tokensInPool: [this.TOKENS.BUSD, this.TOKENS.USDT, this.TOKENS.DOLLY],
            },
            {
                name: 'BTC LPs',
                address: '0x9378F642A14936733d3635BD86897690329C6fF1',
                swapAddress: '0x43AbDc46B14De7c96eA46bf1Fc670ddCE9863f3e',
                tokensInPool: [this.TOKENS.BTCB, this.TOKENS.renBTC],
            },
            {
                name: 'KUSD-BUSD-DOLLY LPs' /* POOL 5 */,
                address: '0x01222c8b6CB44e47c19E61c6Ddac769E6D9fE629',
                swapAddress: '0x215B3616730020a7f3E075526588D0cdaa057DCa',
                tokensInPool: [this.TOKENS.DOLLY, this.TOKENS.BUSD, this.TOKENS.KUSD],
            },
            {
                name: 'KUSD-BUSD-USDC LPs' /* POOL 6 */,
                address: '0x2bf718e5FA2106dc1998D3F964C1baea8Bda36E1',
                swapAddress: '0x2EADe35C49f3f1E041576aCE336f5A58C0Ad8968',
                tokensInPool: [this.TOKENS.USDC, this.TOKENS.BUSD, this.TOKENS.KUSD],
            },
            {
                name: 'KUSD-BUSD-USDC-USDN LPs' /* POOL 7 */,
                address: '0x367189B09340a6e157e5fD31Cb0924E91B71710C',
                swapAddress: '0xbc42FaDcC37994C65A559Fb7803ed60D90994e9f',
                tokensInPool: [this.TOKENS.KUSD, this.TOKENS.BUSD, this.TOKENS.USDC, this.TOKENS.USDN],
            },
            {
                name: 'KUSD-BUSD-USDC-TUSD LPs' /* POOL 8 */,
                address: '0x07FE67a1cFc285E14E72fb5Bb03A6cCfa6224Aa8',
                swapAddress: '0x36E04B29169313D93a056289109ba8A8291e69Ab',
                tokensInPool: [this.TOKENS.KUSD, this.TOKENS.BUSD, this.TOKENS.USDC, this.TOKENS.TUSD],
            },
            {
                name: 'KUSD-BUSD-USDT LPs' /* POOL 9 */,
                address: '0x7755816b41F04aB62ceC2334263987e7cD78A4Fe',
                swapAddress: '0xF8AF8659A2AF27d65bb3e705F0E97b321886031d',
                tokensInPool: [this.TOKENS.KUSD, this.TOKENS.BUSD, this.TOKENS.USDT],
            },
        ]
    }
}
