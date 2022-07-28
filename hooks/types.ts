export interface Token {
    contractAddress: string;
    tokenId: number;
    image: string;
    name: string;
}

export interface Portfolio {
    name: string;
    tokenIds: number[];
    change: number;
    address: string;
}