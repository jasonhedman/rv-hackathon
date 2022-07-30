import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";

import { getLink } from "../services/ipfs";

import { Token } from "./types";

interface Attribute {
    trait_type: string;
    value: string;
}


const useOwnedNFTs = (contractAddress: string, ownerAddress: string) => {

    const { Moralis } = useMoralis();

    const [ownedNFTs, setOwnedNFTs] = useState<Token[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTokens = async () => {
            const nfts = await Moralis.Web3API.account.getNFTsForContract({
                chain: "rinkeby",
                address: ownerAddress,
                token_address: contractAddress,
            });
            const metadata = await Promise.all((nfts?.result || []).map(async (nft) => {
                return Moralis.Web3API.token.getTokenIdMetadata({
                    chain: "rinkeby",
                    address: contractAddress,
                    token_id: nft.token_id,
                })
            }))
            setOwnedNFTs(metadata.map((metadataObj) => {
                const metadata = metadataObj.metadata ? JSON.parse(metadataObj.metadata) : {};
                return {
                    tokenId: parseInt(metadataObj.token_id),
                    name: metadata.name || "",
                    contractAddress,
                    image: getLink(metadata.image) || "",
                    symbol: metadata.attributes.find((attr : Attribute) => attr.trait_type === "symbol")?.value || "",
                }
            }))
            setLoading(false);
        }
        getTokens();
    }, [contractAddress, ownerAddress]);

    return {
        ownedNFTs,
        loading,
    };
}

export default useOwnedNFTs;