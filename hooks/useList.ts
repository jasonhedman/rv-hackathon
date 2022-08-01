import { useMoralisQuery, useNewMoralisObject, useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import TokenABI from "../abis/Token.json";
import SwapperABI from "../abis/Swapper.json";

const useList = () => {

    const { account } = useMoralis();

    const { data: userListings } = useMoralisQuery(
        "TradingBlock",
        query => query.equalTo("userAddress", account).equalTo("active", true),
        [],
        {
            live: true,
        }
    )

    const { save, isSaving } = useNewMoralisObject("TradingBlock")

    const { data: isApprovedForAll } = useWeb3ExecuteFunction({
        contractAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
        abi: TokenABI,
        functionName: "isApprovedForAll",
        params: {
            owner: account,
            operator: process.env.NEXT_PUBLIC_SWAPPER_ADDRESS,
        },
    })

    const { fetch } = useWeb3ExecuteFunction();

    const list = async (tokenId : number) => {
        const listing = userListings.find(l => l.get('tokenId') === tokenId);
        if (listing) {
            await save({
                id: listing.id,
                active: false,
            })
        } else {
            await save({
                tokenId,
                userAddress: account,
                active: true,
            })
        }
    }

    const unlist = async (tokenId : number) => {
        const listing = userListings.find(l => l.get('tokenId') === tokenId);
        if (listing) {
            await save({
                id: listing.id,
                active: false
            })
        }
    }

    const createSwap = async (ownedTokenId : number, desiredTokenId : number) => {
        await fetch({
            params: {
                contractAddress: process.env.NEXT_PUBLIC_SWAPPER_ADDRESS,
                abi: SwapperABI,
                functionName: "depositForSwapping",
                params: {
                    _ownedTokenId: ownedTokenId,
                    _desiredTokenId: desiredTokenId,
                }
            }
        })
    }

    const approveForAll = () => {
        fetch({
            params: {
                contractAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
                abi: TokenABI,
                functionName: "setApprovalForAll",
                params: {
                    operator: process.env.NEXT_PUBLIC_SWAPPER_ADDRESS,
                    approved: true,
                }
            }
        })
    }

    return {
        listedTokens: userListings.map(listing => ({
            id: listing.id,
            tokenId: listing.get('tokenId')
        })),
        list,
        unlist,
        createSwap,
        isApprovedForAll,
        approveForAll,
    }
}

export default useList;