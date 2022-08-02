import { useEffect } from "react";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";

import TokenABI from "../abis/Token.json";

const useApprovalForAll = (operator : string) => {

    const { account } = useMoralis();

    const { data: isApprovedForAll, isLoading, fetch: getApprovalForAll } = useWeb3ExecuteFunction({
        contractAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
        abi: TokenABI,
        functionName: "isApprovedForAll",
        params: {
            owner: account,
            operator,
        },
    })

    useEffect(() => {
        if(isApprovedForAll === null) {
            getApprovalForAll();
        }
    }, [isApprovedForAll, getApprovalForAll]);

    const { fetch } = useWeb3ExecuteFunction({
        contractAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
        abi: TokenABI,
        functionName: "setApprovalForAll",
        params: {
            approved: true,
            operator,
        },
    });

    const approveForAll = async () => {
        await fetch();
    }

    return {
        isApprovedForAll,
        approveForAll
    }

}

export default useApprovalForAll