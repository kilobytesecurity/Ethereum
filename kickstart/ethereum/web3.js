import Web3 from 'web3';


let web3;

//We need to be sure that we are running the same version of web3
//typeof - check if a variable is defined
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    //We are in the browser and metamask is running.
    //hijack Metamask's injected provider(window.ethereum)
    web3 = new Web3(window.ethereum);

    // Reload the page when the currently connected chain changes.
    ethereum.on("chainChanged", (_chainId) => {
    window.location.reload();
    });

    ethereum.on("disconnect", (_error) => {
    window.location.reload();
    });    
} else {
    // We are on the server OR user isn't running metamask
    const network = process.env.RINKEBY_ENDPOINT;
    const provider = new Web3.providers.HttpProvider(network);
    web3 = new Web3(provider);
    console.log("We are on the Server without metamask");
} 
  
export default web3;
