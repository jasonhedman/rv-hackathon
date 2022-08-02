export const getCurrentPrice = async (symbol: string) : Promise<number | null> => (
    fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`)
        .then(res => res.json())
        .catch(_ => 0)
)