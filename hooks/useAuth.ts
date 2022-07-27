import { useEffect, useState } from "react";

import { Connector, useAccount, useConnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

interface ConnectorOption {
    name: string;
    connector: Connector
}

export const connectors : ConnectorOption[] = [
    {
        name: "MetaMask",
        connector: new MetaMaskConnector()
    },
    {
        name: "Coinbase Wallet",
        connector: new CoinbaseWalletConnector({
            options: {
              appName: 'Decentralease',
            },
        })
    }
]


const useAuth = () => {

    const { address: addressWagmi } = useAccount()
    const { connect } = useConnect()

    const [address, setAddress] = useState<string>("")

    const connectWallet = (connector: Connector) => {
        connect({
            connector
        })
    }

    useEffect(() => {
        if(addressWagmi) {
            setAddress(addressWagmi)
        }
    }, [addressWagmi])

    return {
        address,
        connectWallet,
    }
}

export default useAuth;