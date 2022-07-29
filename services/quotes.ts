import { AssetInfo } from "../hooks/types";

export const getCurrentPrice = async (symbol: string) : Promise<AssetInfo | null> => {
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
        .then(res => res.json())
        .then(data => ({
            price: parseFloat(data['Global Quote']['05. price'] as string),
            changePercent: parseFloat(data['Global Quote']['10. change percent'].slice(0, -1))
        }))
        .catch(err => null);
}