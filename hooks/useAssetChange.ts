import { useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import { getCurrentPrice } from '../services/quotes';

const useAssetChange = (symbol : string) => {

    const [changePercent, setChangePercent] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const { data } = useMoralisQuery(
        "ETFOpen",
        query => query
            .equalTo('ticker', symbol)
            .descending('createdAt')
            .limit(1)
    )

    console.log(data);

    useEffect(() => {
        const getPrice = async () => {
            const currentPrice = await getCurrentPrice(symbol);
            setChangePercent(((currentPrice || 0) - data[0].get('price')) / (data[0].get('price') || 1) * 100);
            setLoading(false);
        };
        if(data.length > 0){
            getPrice();
        }
    }, [symbol, data]);

    return { changePercent, loading };
}

export default useAssetChange