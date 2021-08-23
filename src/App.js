import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Beacon from './components/Beacon.js'
import { useMetaMask } from 'metamask-react'
import Routes from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
require('dotenv').config()

function App() {

  const { ethereum, status, account } = useMetaMask();
  const [balance, setBalance] = useState(0);

  return (
    <div className="App">
      <Beacon>
        <Router>
          <header className="App-header">
            <Navbar status={status} balance={balance} />
            <div className="Content">
              <Routes
                ethereum={ethereum}
                status={status}
                account={account}
                setBalance={setBalance}
              />
            </div>
            <Footer />
          </header>
        </Router>
      </Beacon>
    </div>
  );
}
export default App;
