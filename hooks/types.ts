export interface Token {
    contractAddress: string;
    tokenId: number;
    image: string;
    name: string;
    symbol: string;
}

export interface Portfolio {
    userAddress: string;
    value: number;
    change: number;
}

export interface AssetInfo {
    price: number;
    changePercent: number
}

export interface Attribute {
    trait_type: string;
    value: string;
}