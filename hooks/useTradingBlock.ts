import { useEffect, useState } from "react";

import { useMoralis, useMoralisQuery } from "react-moralis";
import { getLink } from "../services/ipfs";
import { parseMetadata } from "../services/metadata";

import { Token, Attribute } from "./types";

const useTradingBlock = () => {

    const { Moralis } = useMoralis();

    const { data: activeListings } = useMoralisQuery(
        "TradingBlock",
        query => query.equalTo("active", true),
        [],
        {
            live: true,
        }
    )

    const [listedTokens, setListedTokens] = useState<Token[]>([]);

    useEffect(() => {
        const getMetadata = async () => {
            const metadata = (await Promise.all(activeListings.map(async (listing) => {
                return Moralis.Web3API.token.getTokenIdMetadata({
                    chain: "rinkeby",
                    address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
                    token_id: listing.get('tokenId'),
                })
            })))
            setListedTokens(parseMetadata(metadata))
        }
        if(activeListings.length > 0) {
            getMetadata();
        }
    }, [activeListings])

    return {
        listedTokens,
    }
}

export default useTradingBlock;