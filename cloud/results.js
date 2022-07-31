Moralis.Cloud.job("getOpenValue", async (request) => {

  const portfolioValues = await getPortfolioValues();

  const Open = Moralis.Object.extend("Open");

  await Promise.all(portfolioValues.map(async portfolioValue => {
    const open = new Open();
    open.set("userAddress", portfolioValue.userAddress);
    open.set("value", portfolioValue.value);
    return open.save();
  }))
});

Moralis.Cloud.job("getCloseValue", async (request) => {

  const portfolioValues = await getPortfolioValues();

  const Close = Moralis.Object.extend("Close");

  await Promise.all(portfolioValues.map(async portfolioValue => {
    const close = new Close();
    close.set("userAddress", portfolioValue.userAddress);
    close.set("value", portfolioValue.value);
    return close.save();
  }))
});

Moralis.Cloud.define("getPortfolioValue", async (request) => {
  const value = await getPortfolioValue(request.params.userAddress);
  return value;
})

Moralis.Cloud.define('getValuesAndChanges', async (request) => {
  const values = await getPortfolioValues();
  const valuesAndChanges = await Promise.all(values.map(async valueObj => {
    const change = await getPortfolioChange(valueObj.userAddress, valueObj.value);
    return {
      userAddress: valueObj.userAddress,
      value: valueObj.value,
      change
    }
  }))
  return valuesAndChanges.sort((a, b) => b.change - a.change);
})

const getPortfolioValues = async () => {

  const User = Moralis.Object.extend("_User");
  const query = new Moralis.Query(User);
  query.notEqualTo("ethAddress", undefined);
  const users = await query.find({ useMasterKey: true });

  return Promise.all(users.map(async (user) => {
    const value = await getPortfolioValue(user.get("ethAddress"));
    return {
      userAddress: user.get("ethAddress"),
      value
    };
  }));

}

const getPortfolioValue = async (userAddress) => {
  const config = await Moralis.Config.get({useMasterKey: true});
  const contractAddress = config.get("contractAddress");
  const alphaVantageKey = config.get("alphaVantageKey");

  const userNFTs = await Moralis.Web3API.account.getNFTsForContract({
    chain: "rinkeby",
    address: userAddress,
    token_address: contractAddress,
  })
  const symbols = userNFTs.result.map(nft => JSON.parse(nft.metadata).attributes.find(attr => attr.trait_type === "symbol").value);
  const prices = await Promise.all(symbols.map(symbol => getCurrentPrice(symbol, alphaVantageKey)));
  return prices.reduce((acc, price) => acc + price, 0)
}

const getPortfolioChange = async (userAddress, currentValue) => {
  const Open = Moralis.Object.extend("Open");
  const query = new Moralis.Query(Open);
  query.equalTo("userAddress", userAddress);
  const open = await query.first();
  const openValue = open.get("value");
  return currentValue - openValue;
}


const getCurrentPrice = async (symbol, alphaVantageKey) => (
  Moralis.Cloud.httpRequest({
    url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphaVantageKey}`
  })
    .then(res => (parseFloat(res.data['Global Quote']['05. price'])))
)