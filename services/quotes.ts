import { AssetInfo } from "../hooks/types";

export const getCurrentPrice = async (symbol: string) : Promise<AssetInfo | null> => {
    return fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                return null;
            }
            return {
                price: data.latestPrice,
                changePercent: data.changePercent
            };
        })
}