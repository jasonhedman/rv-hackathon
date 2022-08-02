Moralis.Cloud.job("getETFOpenPrices", async () => {

    const config = await Moralis.Config.get({useMasterKey: true});

    const ETFOpen = Moralis.Object.extend("ETFOpen");

    const tokens = await Moralis.Web3API.token.getAllTokenIds({
        chain: 'rinkeby',
        address: config.get("contractAddress"),
    });

    const tickers = tokens.result.map(token => (
        JSON.parse(token.metadata).attributes?.find(attr => attr.trait_type === "symbol")?.value 
    )).filter(Boolean);

    const prices = await Promise.all(tickers.map(ticker => 
        getCurrentPrice(ticker, config.get("iexAPIKey"))));

    await Promise.all(prices.map(async (price, index) => {
        const etfOpen = new ETFOpen();
        etfOpen.set("ticker", tickers[index]);
        etfOpen.set("price", price);
        return etfOpen.save();
    }))
})