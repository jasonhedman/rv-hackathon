import useOwnedNFTs from "./useOwnedNFTs";

const usePoolNFTs = (contractAddress: string) => {

    const { ownedNFTs, loading } = useOwnedNFTs(contractAddress, String(process.env.NEXT_PUBLIC_POOL_ADDRESS));

    return { 
        ownedNFTs,
        loading
    };
}

export default usePoolNFTs;