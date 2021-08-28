import React, { Component } from 'react'
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export const BeaconContext = React.createContext({
    wallet: new BeaconWallet({ name: "Beacon Docs Taquito" }),
    connect: () => { },
    disconnect: () => { },
    address: "",
});

class Beacon extends Component {

    async componentWillMount() {
        this.isConnected(this.state.wallet)
    }

    constructor() {
        super();
        const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
        const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
        Tezos.setWalletProvider(wallet);
        this.state = {
            Tezos: Tezos,
            wallet: wallet,
        }
    }

    async setupBeacon(wallet) {
        try {
            console.log("Requesting permissions...");
            const permissions = await wallet.client.requestPermissions();
            console.log("Got permissions:", permissions.address);
        } catch (error) {
            console.log("Got error:", error);
        }
    }

    async getActiveAccount() {
        const activeAccount = await this.state.wallet.client.getActiveAccount();
        return activeAccount;
    }

    async isConnected() {
        // The following code should always be run during pageload if you want to show if the user is connected.
        const activeAccount = await this.state.wallet.client.getActiveAccount();
        if (activeAccount) {
            // User already has account connected, everything is ready
            // You can now do an operation request, sign request, or send another permission request to switch wallet
            console.log("Already connected:", activeAccount.address);
            return activeAccount;
        } else {
            // The user is not connected. A button should be displayed where the user can connect to his wallet.
            console.log("Not connected!");
        }
    }

    async disconnect() {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await this.state.wallet.clearActiveAccount();

        try {
            const account = await this.state.wallet.getPKH();
            console.log("Active Account", account);
        } catch {
            console.log("No wallet connected");
        }
    }

    render() {
        return (
            <BeaconContext.Provider value={{ wallet: this.wallet, connect: this.setupBeacon, disconnect: this.disconnect, address: this.getActiveAccount() }}>
                {this.props.children}
            </ BeaconContext.Provider >
        )
    }
}


export default Beacon;