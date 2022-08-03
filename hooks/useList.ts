import { useMoralisQuery, useNewMoralisObject, useMoralis } from "react-moralis";

import useApprovalForAll from "./useApprovalForAll";

const useList = () => {

    const { user } = useMoralis();

    const { isApprovedForAll, approveForAll } = useApprovalForAll(process.env.NEXT_PUBLIC_SWAPPER_ADDRESS);

    const { data: userListings } = useMoralisQuery(
        "TradingBlock",
        query => query.equalTo("userAddress", user?.get('ethAddress')).equalTo("active", true),
        [],
        {
            live: true,
        }
    )

    const { save } = useNewMoralisObject("TradingBlock")

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
                userAddress: user?.get('ethAddress'),
                userUsername: user?.get('username'),
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

    return {
        listedTokens: userListings.map(listing => ({
            id: listing.id,
            tokenId: listing.get('tokenId')
        })),
        list,
        unlist,
        isApprovedForAll,
        approveForAll,
    }
}

export default useList;