import { useMoralisQuery, useNewMoralisObject, useMoralis } from "react-moralis";

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

    return {
        listedTokens: userListings.map(listing => ({
            id: listing.id,
            tokenId: listing.get('tokenId')
        })),
        list,
        unlist,
    }
}

export default useList;