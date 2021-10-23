import Web3 from 'web3';          //Constructor function, hence W

//Current provider (from metamask)has all public and private keys
//const web3 = new Web3(window.web3.currentProvider); --OLD CODE
const web3 = new Web3(window.ethereum);
export default web3;