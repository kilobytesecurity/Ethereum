import React, { Component } from 'react';
import "./App.css";
import web3 from './web3';
import lottery from "./lottery";

const { ethereum } = window;

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
    enteringLottery: false,
    pickingWinner: false,
  };
  
  async componentDidMount() {
    //Whenever we are using the provider from metamask, the from field in the call()
    //doesn't have to be set as its set automatically as the first accounts we are signed into
    //const manager = await lottery.methods.manager().call({from: accounts[0]});
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    //this.setState({manager: manager}); -- to ES 2015 syntax below
    this.setState({manager, players, balance});   
    //Once state var has been used then we need initialize it ahead of time in aconstructor
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ message: 'Waiting on transaction success...', enteringLottery: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
    } catch (err) {
        this.setState({ message: 'Oops!! Invalid Entry.', enteringLottery: false });
      return
    } 
    this.setState({ message: 'You have been entered!', enteringLottery: false });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...', pickingWinner: true });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!', pickingWinner: false });
  };
  
  render() {
    //web3.eth.getAccounts returns a promise. Normally we would make use of the 
    // async await syntax, but that cant work in a render() method so a promise is chained on
    //web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <div className="test-site-msg">
          This is a test-only deployment of the{" "}
          <a href="https://github.com/kilobytesecurity/Ethereum/lottery-react">
            Lottery React app
          </a>, based on the udemy.com course{" "}
          <a href="https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/">
            Ethereum and Solidity: The Complete Developer's Guide
          </a>. Ether transactions from this app run on the <em>Rinkeby test network only</em>.
        </div>


        <div className="page-center">
          <section className="card">
            <h1 className="no-margin-top">Lottery Contract</h1>
            <p>
              This contract is managed by {this.state.manager}.
              {this.state.players.length === 1
                ? ` There is currently 1 person entered, `
                : ` There are currently ${this.state.players.length} people entered, `}
              competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether!
            </p>
            
            <hr />

            <form onSubmit={this.onSubmit}>
              <h4>Want to try your luck?</h4>
              <div>
                <label>Amount of ether to enter</label>
                <input
                  value={this.state.value}
                  onChange={event => this.setState({ value: event.target.value })}
                />
              </div>
              <button className="btn primaryBtn" type="submit" disabled={this.state.enteringLottery}>
                Enter
              </button>
            </form>

            {this.state.manager.toLowerCase() === ethereum.selectedAddress && this.state.players.length > 0 && (
              <>
                <hr />
                <h4>Ready to pick a winner?</h4>
                <button
                  className="btn primaryBtn"
                  type="button"
                  onClick={this.onClick}
                  disabled={this.state.pickingWinner}
                >
                  Pick a winner!
                </button>
              </>
            )}

            <hr className="spacey" />
            <h2>{this.state.message}</h2>
          </section>
        </div>
      </div>
    );
  }
}

export default App;