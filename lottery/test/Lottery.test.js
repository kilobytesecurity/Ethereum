const assert = require("assert");         //assert library already part of node.js standard libraries
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
//const { interface, bytecode } = require("../compile");   -------- OLD CODE
const { abi, evm } = require("../compile");

let lottery;   //will hold instance of our contract
let accounts;   //Will hold the accounts provided by ganache

beforeEach(async () => {//is executed before each test
  // Get a list of all accounts.
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract.
  //lottery = await new web3.eth.Contract(JSON.parse(interface)) ------OLD CODE
  lottery = await new web3.eth.Contract(abi)
    //.deploy({ data: bytecode }) ---------- OLD CODE
    .deploy({ data: "0x" + evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("allows multiple accounts to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether') //2000000 Wei  
    }); 
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether') //2000000 Wei  
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether') //2000000 Wei  
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]); //equal(valueItShudBe, ValueItIs)
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 10
  
      })
      assert(false); //Test fails no matter what
    } catch (err) {
      assert(err); //assert.ok jst assures that there's a value 
    }
  });
  it ('Only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err); //Assert that the error exists
    }
  });

  it ('sends money to winner and resets players array', async () => {
    await lottery.methods.enter().send({
      from:accounts[0],
      value: web3.utils.toWei('2','ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({ from: accounts[0]});
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei('1.8', 'ether')); //some ether is spent on gas for the transactions
  });
});