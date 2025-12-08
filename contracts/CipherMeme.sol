// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CipherMeme {
    struct Meme {
        string memeId;
        string encryptedHash;
        address creator;
        uint256 createdAt;
        uint256 likes;
        uint256 shares;
        uint256 views;
    }
    
    mapping(string => Meme) public memes;
    string[] public allMemeIds;
    
    event MemeCreated(string memeId, address creator, uint256 timestamp);
    event MemeLiked(string memeId, address liker);
    event MemeShared(string memeId, address sharer);
    
    function createEncryptedMeme(string memory memeId, string memory encryptedHash) public {
        require(bytes(memeId).length > 0, "Meme ID required");
        require(bytes(memes[memeId].memeId).length == 0, "Meme already exists");
        
        memes[memeId] = Meme({
            memeId: memeId,
            encryptedHash: encryptedHash,
            creator: msg.sender,
            createdAt: block.timestamp,
            likes: 0,
            shares: 0,
            views: 0
        });
        
        allMemeIds.push(memeId);
        emit MemeCreated(memeId, msg.sender, block.timestamp);
    }
    
    function likeMeme(string memory memeId) public {
        require(bytes(memes[memeId].memeId).length > 0, "Meme does not exist");
        memes[memeId].likes++;
        emit MemeLiked(memeId, msg.sender);
    }
    
    function shareMeme(string memory memeId) public {
        require(bytes(memes[memeId].memeId).length > 0, "Meme does not exist");
        memes[memeId].shares++;
        emit MemeShared(memeId, msg.sender);
    }
    
    function viewMeme(string memory memeId) public {
        require(bytes(memes[memeId].memeId).length > 0, "Meme does not exist");
        memes[memeId].views++;
    }
    
    function getMemeStats(string memory memeId) public view returns (uint256, uint256, uint256) {
        Meme memory meme = memes[memeId];
        return (meme.likes, meme.shares, meme.views);
    }
    
    function getAllMemeIds() public view returns (string[] memory) {
        return allMemeIds;
    }
}
