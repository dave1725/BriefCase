// SPDX-License-Identifier: MIT
// Project : BriefCase
// Owner : Techmac
pragma solidity ^0.8.9;

contract FileTransactions {
    address public owner;
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct sharedWith {
        string cid;
        address receiver;
        bytes32 timestamp;
    }
    //mapping to store the CID and receiver
    mapping(address => sharedWith[]) dataHolder;

    event addedFileToIPFS(address _sender, address _receiver, string _cid);

    function addFileToIPFS(address _sender, address _receiver, string memory _cid) external {
        require(msg.sender != _receiver);
        dataHolder[_sender].push(sharedWith(_cid,_receiver,bytes32(block.timestamp)));
        emit addedFileToIPFS(_sender, _receiver, _cid);
    }

    function getFiles(address _sender) external view returns(sharedWith[] memory){
        return dataHolder[_sender];
    }
}