const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
const { abi, evm } = require("../compile");

const INITIAL_MSG = "Hi there!";
let accounts;
let inbox;

beforeEach(async () => {//is executed before each test
  // Get a list of all accounts.
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract.
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: "0x" + evm.bytecode.object, arguments: [INITIAL_MSG] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("Our Contract has a default message", async () => {
    const msg = await inbox.methods.message().call();    //Calling a function=> Readonly & Instantaneous operation
    assert.strictEqual(msg, INITIAL_MSG);
  });

  it("can change the message", async () => {
    const newMsg = "bye";
    await inbox.methods.setMessage(newMsg).send({ from: accounts[0] });

    const msg = await inbox.methods.message().call();
    assert.strictEqual(msg, newMsg);
  });
});


/**
class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car;          //Initialize global variable
beforeEach(() => {
    car = new Car();
})

describe('Car Class--', () => {
    it('Has a park function', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('Can Drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
});
 */
