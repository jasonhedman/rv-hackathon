import useOwnedNFTs from "./useOwnedNFTs";

const usePoolNFTs = (contractAddress: string) => {

    const { ownedNFTs } = useOwnedNFTs(contractAddress, String(process.env.NEXT_PUBLIC_POOL_ADDRESS));

    return { 
        ownedNFTs 
    };
}

export default usePoolNFTs;