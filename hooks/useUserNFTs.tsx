import { useAccount } from "wagmi"
import useOwnedNFTs from "./useOwnedNFTs";

const useUserNFTs = (contractAddress: string) => {

    const { address } = useAccount();

    const { ownedNFTs } = useOwnedNFTs(contractAddress, String(address));

    return {
        ownedNFTs
    };

}

export default useUserNFTs;