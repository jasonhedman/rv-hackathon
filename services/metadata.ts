import { Token } from "../hooks/types";

interface TokenMetadata {
    token_id: string;
    token_address: string;
    metadata?: string;
}

export const parseMetadata = (res: TokenMetadata[]) : Token[] => {
    return res.map((nftObj) => {
        const metadata = nftObj?.metadata ? JSON.parse(nftObj.metadata) : {};
        return {
            tokenId: parseInt(nftObj?.token_id),
            name: metadata.assetName || "",
            contractAddress: nftObj.token_address,
            image: metadata.image || "",
            symbol: metadata.ticker || "",
        }
    })
}