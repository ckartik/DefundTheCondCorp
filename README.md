<p align="center">
  <a href="https://www.yushi.dev/" target="_blank" rel="noreferrer"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F24613315%2Fr%2Fil%2F6236f5%2F2628608756%2Fil_794xN.2628608756_od7x.jpg&f=1&nofb=1" alt="my banner"></a>
</p>

<h3 align="center">
Hi there, Are you sick of your Condo Coporation or HOA? 👋
</h3>

Condo Corporations and HOA's are corrupt, and waste your money. Most people assume they can't do anything about it. Now you can, your votes result in direct and immediate removal/dismissal of board members that aren't meeting the needs of the community. 

## 💼 TECH STACK

![](https://img.shields.io/badge/Code-React-informational?style=flat&logo=react&color=61DAFB)
![](https://img.shields.io/badge/Code-Redux-informational?style=flat&logo=Redux&color=764ABC)
![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=JavaScript&color=F7DF1E)
![](https://img.shields.io/badge/Style-Bootstrap-informational?style=flat&logo=Bootstrap&color=7952B3)
![](https://img.shields.io/badge/Style-CSS3-informational?style=flat&logo=CSS3&color=1572B6)
![](https://img.shields.io/badge/Style-styled--components-informational?style=flat&logo=styled-components&color=DB7093)
![](https://img.shields.io/badge/Tools-Figma-informational?style=flat&logo=Figma&color=F24E1E)
![](https://img.shields.io/badge/Tools-NPM-informational?style=flat&logo=NPM&color=CB3837)
![](https://img.shields.io/badge/Tools-Heroku-informational?style=flat&logo=Heroku&color=430098)
![](https://img.shields.io/badge/Tools-Netlify-informational?style=flat&logo=netlify&color=00C7B7)
![](https://img.shields.io/badge/Tools-Git-informational?style=flat&logo=Git&color=F05032)
![](https://img.shields.io/badge/Tools-GitHub-informational?style=flat&logo=GitHub&color=181717)

## 📈 Contributors
~ ckartik
~ zKJET

# 🏄‍♂️ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> install and start your 👷‍ Hardhat chain:
```bash
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

🔏 Edit your smart contract `CondoCorpDao.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app

## CondoCorpDao.sol
## Hardhat  [![Hardhat][hardhat-badge]][hardhat] [![License: MIT][license-badge]][license]

[gha]: https://github.com/paulrberg/hardhat-template/actions
[gha-badge]: https://github.com/paulrberg/hardhat-template/actions/workflows/ci.yml/badge.svg
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg
[license]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg
``` js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CondoCorpDao {
    constructor() payable {}

    enum VoteType {
        YAY,
        NAY
    }

    enum ProposalType {
        BODRemove,
        BODAdd,
        VendorAdd,
        VendorRemove
    }

    struct Proposal {
        address targetAdr;
        uint256 deadline;
        uint256 yayVotes;
        uint256 nayVotes;
        bool executed;
        ProposalType proposalType;
        mapping(address => bool) voters;
    }

    modifier MemberOnly() {
        require(members[msg.sender] == true, "NOT_A_MEMBER");
        _;
    }

    // Maps Proposal ID to a proposal
    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public members;
    mapping(address => bool) public boardMembers;
    mapping(address => bool) public vendors;
    uint256 numProposals;

    function joinDAO() external {
        members[msg.sender] = true;
    }

    function createProposal(address targetAdr, ProposalType proposalType)
        external
        MemberOnly
        returns (uint256)
    {
        if (proposalType == ProposalType.BODAdd) {
            require(boardMembers[targetAdr] == false, "ALREADY_BOARD_MEMBER");
        }
        if (proposalType == ProposalType.BODRemove) {
            require(boardMembers[targetAdr] == true, "NOT_BOARD_MEMBER");
        }

        Proposal storage proposal = proposals[numProposals];
        proposal.deadline = block.timestamp + 2 minutes;
        proposal.proposalType = proposalType;
        proposal.targetAdr = targetAdr;

        numProposals++;

        return numProposals - 1;
    }

    function voteOnProposal(uint256 pid, VoteType vote) external MemberOnly {
        Proposal storage proposal = proposals[pid];
        require(proposal.voters[msg.sender] == false, "ALREADY VOTED");
        require(proposal.deadline < block.timestamp, "VOTING_CLOSED");

        proposal.voters[msg.sender] = true;

        if (vote == VoteType.YAY) {
            proposal.yayVotes += 1;
        } else {
            proposal.nayVotes += 1;
        }
    }

    function executeProposal(uint256 pid) external MemberOnly {
        Proposal storage proposal = proposals[pid];
        require(proposal.deadline > block.timestamp, "VOTE_STILL_OPEN");
        require(proposal.executed == false, "ALREADY_EXECUTED");
        proposal.executed = true;

        require(proposal.yayVotes > proposal.nayVotes);
        if (proposal.proposalType == ProposalType.BODAdd) {
            boardMembers[proposal.targetAdr] = true;
        } else if (proposal.proposalType == ProposalType.BODRemove) {
            delete boardMembers[proposal.targetAdr];
        } else if (proposal.proposalType == ProposalType.VendorAdd) {
            vendors[proposal.targetAdr] = true;
        } else if (proposal.proposalType == ProposalType.VendorRemove) {
            delete vendors[proposal.targetAdr];
        }
    }
}

```