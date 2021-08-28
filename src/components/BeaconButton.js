import React from "react";
import Button from "./Button"
import { BeaconContext } from "./Beacon"

function BeaconButton() {
  return (
    <BeaconContext.Consumer>
      {({ wallet, connect, disconnect, address }) =>
        <header>
          {!false && <Button onClick={() => connect(wallet)}>Connect to a Tezos Wallet</Button>}
          {false && (
            <Button onClick={disconnect}>Disconnect from {address}</Button>
          )}
        </header>
      }
    </BeaconContext.Consumer>
  )
}

export default BeaconButton;