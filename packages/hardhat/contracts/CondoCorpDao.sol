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
