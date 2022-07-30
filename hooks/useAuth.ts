import { useEffect } from "react";

import { useMoralis } from "react-moralis";
import { Moralis } from 'moralis';

interface Connector {
    name: string;
    connectorId: Moralis.Web3ProviderType;
}

export const connectors : Connector[] = [
    {
        name: "Metamask",
        connectorId: "metamask",
    }
]


const useAuth = () => {

    const { authenticate, isAuthenticated, account, isWeb3EnableLoading, isWeb3Enabled, enableWeb3 } = useMoralis();

    const connectWallet = async (connector: Connector) => {
        await authenticate({
            provider: connector.connectorId
        })
        window.localStorage.setItem("connectorId", connector.connectorId);
    }

    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (connectorId && isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
          enableWeb3({ provider: connectorId as Moralis.Web3ProviderType });
      }, [isAuthenticated, isWeb3Enabled]);

    return {
        address: account,
        connectWallet,
    }
}

export default useAuth;