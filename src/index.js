import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearlib from 'nearlib';
import { BrowserRouter } from 'react-router-dom';
import Context from './Context';

// Initializing contract
async function initContract() {
  window.nearConfig = getConfig(process.env.NODE_ENV || 'development')
  console.log("nearConfig", window.nearConfig);

  // Initializing connection to the NEAR DevNet.
  window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig));

  // Needed to access wallet login
  window.walletAccount = new nearlib.WalletAccount(window.near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  window.accountId = window.walletAccount.getAccountId();

  // Initializing our contract APIs by contract name and configuration.
  let acct = await new nearlib.Account(window.near.connection, window.accountId);
  window.contract = await new nearlib.Contract(acct, window.nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['welcome', 'getChallenges', 'getCurrentChallengesForUser'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['setNewChallenge', 'markDailyChallengeComplete', 'set30DayChallenge', 'isChallengeComplete'],
    // Sender is the account ID to initialize transactions.
    sender: window.accountId
  });
}



window.nearInitPromise = initContract().then(() => {
  const defaultState = {
    contract: window.contract,
    wallet: window.walletAccount,
  };

  ReactDOM.render(
    <Context.Provider value={defaultState}>
      <App contract={window.contract} wallet={window.walletAccount} />
    </Context.Provider>
    ,
    document.getElementById('root')
  );
}).catch(console.error)