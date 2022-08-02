Moralis.Cloud.job("getETFOpenPrices", async () => {

    const config = await Moralis.Config.get({useMasterKey: true});

    const ETFOpen = Moralis.Object.extend("ETFOpen");

    const tokens = await Moralis.Web3API.token.getAllTokenIds({
        chain: 'rinkeby',
        address: config.get("contractAddress"),
    });

    const tickers = tokens.result.map(token => (
        JSON.parse(token.metadata).attributes?.find(attr => attr.trait_type === "Ticker")?.value 
    )).filter(Boolean);

    for(const ticker of tickers) {
        const currentPrice = await getCurrentPrice(ticker, config.get("iexAPIKey"));
        const etfOpen = new ETFOpen();
        etfOpen.set("ticker", ticker);
        etfOpen.set("price", currentPrice);
        await etfOpen.save();
    }

})