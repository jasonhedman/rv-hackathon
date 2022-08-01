import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getLink } from "../services/ipfs";

import useOwnedNFTs from "./useOwnedNFTs";

import { Swap, Attribute } from "./types";

const useActiveSwaps = () => {

    const { Moralis } = useMoralis();

    const [activeSwaps, setActiveSwaps] = useState<Swap[]>([]);

    const { ownedNFTs } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, process.env.NEXT_PUBLIC_POOL_ADDRESS);

    useEffect(() => {
        const getActiveSwaps = async () => {
            const metadata = await Promise.all(ownedNFTs.map(async (nft) => {
                return Moralis.Web3API.token.getTokenIdMetadata({
                    chain: "rinkeby",
                    address: nft.contractAddress,
                    token_id: String(nft.tokenId),
                })
            }))
            setActiveSwaps(metadata.map((metadataObj, index) => {
                const metadata = metadataObj.metadata ? JSON.parse(metadataObj.metadata) : {};
                return {
                    tokenStaked: ownedNFTs[index],
                    tokenWanted: {
                        tokenId: parseInt(metadataObj.token_id),
                        name: metadata.name || "",
                        contractAddress: metadataObj.token_address,
                        image: getLink(metadata.image) || "",
                        symbol: metadata.attributes.find((attr : Attribute) => attr.trait_type === "symbol")?.value || "",
                    }
                }
            }))
        }
        if(ownedNFTs.length > 0) {
            getActiveSwaps();
        }
    }, [ownedNFTs]);

    return {
        activeSwaps
    }
}

const deconstructSwap = (swapstring: string, stakedTokenId: number) => {
    const tokenIds = swapstring.split("_");
    return tokenIds[0] === String(stakedTokenId) ? tokenIds[1] : tokenIds[0];
}

export default useActiveSwaps;