// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    //type visibility varName => variable declaration
    address public manager;
    address payable[] public players;

    //address[] public players;------OLD CODE
    
    constructor() {
        manager = msg.sender;   //msg => global var thats already available to us automatically
    }
    
    function enter() public payable {
        // Note: Although optional, it's a good practice to include error messages
        // in `require` calls.
        require(
            msg.value > .01 ether,
            "A minimum payment of .01 ether must be sent to enter the lottery"
        );
        //require(msg.value > .01 ether); ------OLD CODE
        // As of Solidity 0.8.0 the global variable `msg.sender` has the type
        // `address` instead of `address payable`. So we must convert msg.sender
        // into `address payable` before we can add it to the players array.
        players.push(payable(msg.sender));
        
        //players.push(msg.sender); ------OLD CODE
    }
    
    function random() private view returns (uint256) {
        // For an explanation of why `abi.encodePacked` is used here, see
        // https://github.com/owanhunte/ethereum-solidity-course-updated-code/issues/1
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.number, players)
                )
            );
        //return uint(keccak256(block.difficulty, now, players)); ------OLD CODE    
    }
    
    function pickWinner() public onlyOwnerCalls {
        uint index = random() % players.length; 
        
        // As of Solidity 0.4.24 at least, `this` is a deprecated way to get the address of the
        // contract. `address(this)` must be used instead.
        // players[index].transfer(this.balance); ---OLD CODE
        address contractAddress = address(this);

        players[index].transfer(contractAddress.balance);
        players = new address payable[](0);         //Empty the players array(with an initial size of zero) so as to start lottery all again
        
        //players[index].transfer(this.balance);  ------OLD CODE
    }
    
    modifier onlyOwnerCalls() {
        require(msg.sender == manager, "Only Manager/Owner can run this Function!");    
        _;          // Underscore means 'Run the rest of the code for that Function'
    }
    
    function getPlayers() public view returns (address payable[] memory) {
    //function getPlayers() public view returns (address[]) {  ------OLD CODE
        return players;
    }
}