import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from 'web3';          //Constructor function, hence W

//Current provider (from metamask)has all public and private keys
//const web3 = new Web3(window.web3.currentProvider); --OLD CODE

/**
 * POINTS TO NOTE: 
 *
 * 1) I'm making use of the @metamask/detect-provider utility for detecting
 *    the MetaMask Ethereum provider and enforcing that MetaMask be used, as
 *    opposed to some other ethereum-compatible browser (via options.mustBeMetaMask).
 *
 *    See https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
 *    for more details on using the Ethereum Provider API.
 * 
 * 2) Even if MetaMask is installed and the Ethereum provider detected, App.js
 *    enforces a requirement that the user MUST be on the Rinkeby test network.
 *
 *    See https://docs.metamask.io/guide/getting-started.html#connecting-to-metamask
 *
 * 4) MetaMask provides the Ethereum Provider API (window.ethereum) for developers
 *    to work with. Note that in January 2021 the former window.web3 API was
 *    removed in favor of the window.ethereum API.
 *
 * 
 */

  let web3 = null;

  // Get the provider, or null if it couldn't be detected.
  const provider = detectEthereumProvider({
    mustBeMetaMask: true
  });

  if (provider) {
    console.log("MetaMask Ethereum provider successfully detected!");

    const { ethereum } = window;
    web3 = new Web3(ethereum);
    
    // Reload the page when the currently connected chain changes.
    ethereum.on("chainChanged", (_chainId) => {
      window.location.reload();
    });

    ethereum.on("disconnect", (_error) => {
      window.location.reload();
    });

    // Code to initiate connection request to user's Ethereum account(s) moved
    // to `src/App.js`, and only run in response to direct user action.
  } else {
    console.log("Please install MetaMask!");
  }

export default web3;

