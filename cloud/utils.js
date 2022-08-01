const getCurrentPrice = async (symbol, apiKey) => (
    Moralis.Cloud.httpRequest({
      url: `https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${apiKey}`
    })
      .then(res => res.data)
)

const round = (num, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}