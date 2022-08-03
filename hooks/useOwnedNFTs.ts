import { useEffect, useState } from "react";

import { useMoralis, useMoralisQuery } from "react-moralis";
import { parseMetadata } from "../services/metadata";

import { Token } from "./types";


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
            setOwnedNFTs(parseMetadata(nfts.result || []));
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