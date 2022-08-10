//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CCDao {
    address[] DaoMembers;

    function addMember() public {
        DaoMembers.push(msg.sender);
    }

    function viewMembers() public view returns (address[] memory) {
        return DaoMembers;
    }

    // function setGreeting(string memory _greeting) public {
    //     console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    //     greeting = _greeting;
    // }
}
