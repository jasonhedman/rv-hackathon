import { useEffect, useState } from 'react';
import { getCurrentPrice } from '../services/quotes';

import { AssetInfo } from './types';

const useAssetPrice = (symbol : string) => {
    const [assetInfo, setAssetInfo] = useState<AssetInfo>({ price: 0, changePercent: 0 });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getPrice = async () => {
            const data = await getCurrentPrice(symbol);
            if(data) setAssetInfo(data);
            setLoading(false);
        };
        getPrice();
    }, [symbol]);

    return { assetInfo, loading };
}

export default useAssetPrice