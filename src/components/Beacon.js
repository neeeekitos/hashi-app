import React, { Component } from 'react'
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

class Beacon extends Component {

    async componentWillMount() {
        this.checkBeacon()
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

    async setupBeacon() {
        try {
            console.log("Requesting permissions...");
            const permissions = await this.state.wallet.client.requestPermissions();
            console.log("Got permissions:", permissions.address);
        } catch (error) {
            console.log("Got error:", error);
        }
    }

    async checkBeacon() {
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

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


export default Beacon;