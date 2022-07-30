import { useMoralis } from "react-moralis";
import useOwnedNFTs from "./useOwnedNFTs";

const useUserNFTs = (contractAddress: string) => {

    const { account } = useMoralis();

    const { ownedNFTs, loading } = useOwnedNFTs(contractAddress, String(account));

    return {
        ownedNFTs,
        loading
    };

}

export default useUserNFTs;