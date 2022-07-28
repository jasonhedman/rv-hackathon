import { useEffect, useState } from "react";

import { useContractRead, useContractReads } from "wagmi";

import { getLink } from "../services/ipfs";

import TokenABI from "../abis/Token.json";

import { Token } from "./types";

const useOwnedNFTs = (contractAddress: string, ownerAddress: string) => {

    const [ownedNFTs, setOwnedNFTs] = useState<Token[]>([]);

    const { data: balanceOf } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: TokenABI,
        functionName: 'balanceOf',
        args: [ownerAddress],
        chainId: 4,
    })

    const { data: ownedTokenIds } = useContractReads({
        contracts: Array.from(Array(balanceOf ? balanceOf.toNumber() : 0).keys()).map(index => ({
            addressOrName: contractAddress,
            contractInterface: TokenABI,
            functionName: 'tokenOfOwnerByIndex',
            args: [ownerAddress, index]
        }))
    })

    const { data: ownedTokenUris } = useContractReads({
        contracts: (ownedTokenIds || []).map(token => ({
            addressOrName: contractAddress,
            contractInterface: TokenABI,
            functionName: 'tokenURI',
            args: [token]
        }))
    })

    useEffect(() => {
        const getTokenMetadata = async () => {
            const metadata = await Promise.all((ownedTokenUris || []).map(async uri => (
                fetch(getLink(String(uri))).then(res => {console.log(res); return res.json()})
            )))
            setOwnedNFTs((ownedTokenIds || []).map((tokenId, i) => ({
                contractAddress,
                name: metadata[i].name,
                tokenId: tokenId && tokenId.toNumber(),
                image: getLink(metadata[i].image),
            })))
        }
        if(ownedTokenIds && ownedTokenUris) {
            getTokenMetadata();
        }
    }, [ownedTokenIds, ownedTokenUris, contractAddress])

    return {
        ownedNFTs,
    };
}

export default useOwnedNFTs;