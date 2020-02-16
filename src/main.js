// Initializing contract
async function initContract() {
  console.log('nearConfig', nearConfig);

  // Initializing connection to the NEAR DevNet.
  window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

  // Initializing Wallet based Account. It can work with NEAR DevNet wallet that
  // is hosted at https://wallet.nearprotocol.com
  window.walletAccount = new nearlib.WalletAccount(window.near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  window.accountId = window.walletAccount.getAccountId();

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ["getResponse"],     // <-- find this line and change it to match
    changeMethods: ["setResponse"],   // <-- find this line and change it to match
    sender: window.accountId
  });
}

// Using initialized contract
async function doWork() {
  // Based on whether you've authorized, checking which flow we should go.
  // if (!window.walletAccount.isSignedIn()) {
  //   signedOutFlow();
  // } else {
  //   signedInFlow();
  // }
}

// Function that initializes the signIn button using WalletAccount
function signedOutFlow() {
  // Displaying the signed out flow container.
  // Array.from(document.querySelectorAll('.signed-out')).forEach(el => el.style.display = '');
  // // Adding an event to a sing-in button.
  // document.getElementById('sign-in').addEventListener('click', () => {
  //   window.walletAccount.requestSignIn(
  //     window.nearConfig.contractName,
  //     'Zero to Hero Tutorial',     // <-- find this line and change it to match
  //   );
  // });
}

// Main function for the signed-in flow (already authorized by the wallet).
function signedInFlow() {
  // Displaying the signed in flow container.
  Array.from(document.querySelectorAll('.signed-in')).forEach(el => el.style.display = '');

  // Displaying current account name.
  document.getElementById('account-id').innerText = window.accountId;

  // Adding an event to a say-hi button.
  document.getElementById('say-hi').addEventListener('click', () => {
    // We call say Hi and then update who said Hi last.
    window.contract.sayHi().then(updateWhoSaidHi);
  });

  // Adding an event to a sing-out button.
  document.getElementById('sign-out').addEventListener('click', e => {
    e.preventDefault();
    walletAccount.signOut();
    // Forcing redirect.
    window.location.replace(window.location.origin + window.location.pathname);
  });

  // fetch who last said hi without requiring button click
  // but wait a second so the question is legible
  setTimeout(updateWhoSaidHi, 1000);
}

// Function to update who said hi
function updateWhoSaidHi() {
  // JavaScript tip:
  // This is another example of how to use promises. Since this function is not async,
  // we can't await for `contract.whoSaidHi()`, instead we attaching a callback function
  // usin `.then()`.
  contract.whoSaidHi().then((who) => {
    const el = document.getElementById('who');
    el.innerText = who || 'No one';

    // only link to profile if there's a profile to link to
    if (who) {
      el.href = 'https://explorer.nearprotocol.com/accounts/' + who;
    }

    // change the ? to a !
    const parent = el.parentNode;
    parent.innerHTML = parent.innerHTML.replace('?', '!');
  });
}

// Loads nearlib and this contract into window scope.
window.nearInitPromise = initContract()
  .then(doWork)
  .catch(console.error);

async function makeApiCallAndSave() {
  //for visibility purposes
  console.log('calling api endpoint')
  //calling endpoint
  let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/btc.json');
  let body = await response.json();
  //stripping only the data we want from the API response
  let data = body.bpi.USD.rate
  //Saving the data to the blockchain by calling the Oracle Contracts setResponse function
  await contract.setResponse({ apiResponse: data });
  // Check to see if the data was saved properly
  let apiResponse = await contract.getResponse();
  console.log(`${apiResponse} is the API response available to the Oracle on-chain`);
}

async function fetchAndDisplayResponse() {
  // getting the response from the blockchain
  let apiResponse = await contract.getResponse();
  // logging on the console for some feedback
  console.log(apiResponse);
  // Displaying the message once we have it.
  document.getElementById('response').innerText = apiResponse;
}