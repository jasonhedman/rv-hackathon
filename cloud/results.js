Moralis.Cloud.define("getPortfolioValue", async (request) => {
  return getUserPortfolioValue(request.params.userAddress);
})

Moralis.Cloud.define('getValuesAndChanges', async () => {
  const valuesAndChanges = await getPortfolioValuesAndChanges();
  return valuesAndChanges.sort((a, b) => b.change - a.change);
})

Moralis.Cloud.define('getPortfolioChanges', async () => {
  const changes = await getPortfolioChanges();
  return changes.sort((a, b) => b.changePercent - a.changePercent);
})

const getUsers = async () => {
  const User = Moralis.Object.extend("_User");
  const query = new Moralis.Query(User);
  query.notEqualTo("ethAddress", undefined);
  const users = await query.find({ useMasterKey: true });
  return users;
}

const getUserSymbols = async (userAddress) => {
  const config = await Moralis.Config.get({useMasterKey: true});
  const contractAddress = config.get("contractAddress");
  const userNFTs = await Moralis.Web3API.account.getNFTsForContract({
    chain: "rinkeby",
    address: userAddress,
    token_address: contractAddress,
  })
  return userNFTs.result.map(nft => JSON.parse(nft.metadata).attributes.find(attr => attr.trait_type === "Ticker").value);
}

const getCurrentPortfolioValue = async (tokenSymbols) => {
  const config = await Moralis.Config.get({useMasterKey: true});
  const iexAPIKey = config.get("iexAPIKey");
  const prices = await Promise.all(tokenSymbols.map(symbol => getCurrentPrice(symbol, iexAPIKey)));
  return round(prices.reduce((acc, price) => acc + price, 0))
}

const getOpenPortfolioValue = async (tokenSymbols) => {
  const ETFOpen = Moralis.Object.extend("ETFOpen");
  const query = new Moralis.Query(ETFOpen);
  query.containedIn("ticker", tokenSymbols);
  const etfOpens = await query.find();
  return etfOpens.reduce((acc, etfOpen) => acc + etfOpen.get("price"), 0);
}

const getUserPortfolioValue = async (userAddress) => {
  const symbols = await getUserSymbols(userAddress);
  return getCurrentPortfolioValue(symbols);
}

const getUserPortfolioValueAndChange = async (userAddress, username) => {
  const symbols = await getUserSymbols(userAddress);
  const open = await getOpenPortfolioValue(symbols);
  const value = await getCurrentPortfolioValue(symbols);
  return {
    value,
    change: round((value - open) / open * 100, 4) || 0,
    userAddress,
    username
  }
}

const getPortfolioValues = async () => {
  const users = await getUsers();
  return Promise.all(users.map(async (user) => {
    const value = await getUserPortfolioValue(user.get("ethAddress"));
    return {
      userAddress: user.get("ethAddress"),
      value
    };
  }));
}

const getPortfolioValuesAndChanges = async () => {
  const users = await getUsers();
  return Promise.all(users.map(async (user) => (
    getUserPortfolioValueAndChange(user.get("ethAddress"), user.get("username"))
  )));
}

const getPortfolioChange = async (symbols) => {
  const config = await Moralis.Config.get({useMasterKey: true});
  const changes = await Promise.all(symbols.map(async symbol => {
    const currentPrice = await getCurrentPrice(symbol, config.get('iexAPIKey'));
    const ETFOpen = Moralis.Object.extend("ETFOpen");
    const query = new Moralis.Query(ETFOpen);
    query.equalTo("ticker", symbol).descending('createdAt').limit(1);
    const open = await query.first();
    return (currentPrice - open.get('price')) / (open.get('price') || 1) * 100;
  }))
  return round((changes.reduce((acc, price) => acc + price, 0) / changes.length), 4);
}

const getUserPortfolioChange = async (userAddress, username) => {
  const symbols = await getUserSymbols(userAddress);
  const changePercent = await getPortfolioChange(symbols);
  return {
    changePercent,
    username,
    userAddress
  }
}

const getPortfolioChanges = async () => {
  const users = await getUsers();
  return Promise.all(users.map(async (user) => (
    getUserPortfolioChange(user.get('ethAddress'), user.get('username'))
  )));
}
