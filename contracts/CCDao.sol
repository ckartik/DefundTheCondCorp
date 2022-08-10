// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the FakeNFTMarketplace
interface IVendorRegister {
    /// @dev vendorCost() reads the value of the public uint256 variable `vendorMonthlyCost`
    function vendorCost() external view returns (uint256);

    /// @dev available() returns whether or not the given _tokenId has already been purchased
    /// @return Returns a boolean value - true if available, false if not
    function available(uint256 _tokenId) external view returns (bool);

    /// @dev ownerOf() returns the owner of a given _tokenId from the NFT marketplace
    /// @return returns the address of the owner
    function ownerOf(uint256 _tokenId) external view returns (address);

    /// @dev purchase() purchases an NFT from the FakeNFTMarketplace
    /// @param _tokenId - the fake NFT tokenID to purchase
    function purchase(uint256 _tokenId) external payable;

    /// @dev sell() pays the NFT owner `nftSalePrice` ETH and takes`tokenId` ownership back
    /// @param _tokenId the fake NFT token Id to sell back
    function sell(uint256 _tokenId) external;
}

// Minimal interface for CryptoDevs NFT containing the functions we care about
interface IDaoMemberNFT {
    /// @dev balanceOf returns the number of NFTs owned by the given address
    /// @param owner - address to fetch number of NFTs for
    /// @return Returns the number of NFTs owned
    function balanceOf(address owner) external view returns (uint256);

    /// @dev tokenOfOwnerByIndex returns a tokenID at given index for owner
    /// @param owner - address to fetch the NFT TokenID for
    /// @param index - index of NFT in owned tokens array to fetch
    /// @return Returns the TokenID of the NFT
    function tokenOfOwnerByIndex(address owner, uint256 index)
        external
        view
        returns (uint256);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    /// @dev Returns the owner of the `tokenId` token.
    function ownerOf(uint256 tokenId) external view returns (address owner);
}

contract CondoCorpDao {
    IDaoMemberNFT daoMemberNFT;
    uint256 memberIDCounter;
    constructor(address nftContract) payable {
        daoMemberNFT = IDaoMemberNFT(nftContract);
        memberIDCounter = 0;
    }

    enum VendorContractProposal {
        ADD,
        REJECT
    }

    enum VoteType {
        YAY,
        NAY
    }

    enum ProposalType {
        BODChange,
        VendorAdd,
        VendorRemove
    }
    
    struct Proposal {
        uint256 targetID;
        uint256 deadline;

        uint256 yayVotes;
        uint256 nayVotes;

        bool executed;

        ProposalType proposalType;

        mapping(address => bool) voters;
    }

    struct Member {
        uint256 joinedAt;
        uint256 lockedMembershipNFT;
        uint256 memberID;
    }

    // Maps Proposal ID to a proposal
    mapping(uint256 => Proposal) public proposals;
    mapping(address => Member) public members;
}   