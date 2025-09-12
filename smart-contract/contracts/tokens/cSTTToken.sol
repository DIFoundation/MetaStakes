// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title STTToken
 * @dev Standard ERC20 token for Somnia Token - used for staking in Stake and Bake protocol
 */
contract cSTTToken is ERC20, Ownable {
    
    // Events for subgraph
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    mapping(address => uint256) public lastFaucetTime;
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**decimals());
        emit TokensMinted(msg.sender, initialSupply * 10**decimals());
    }
    
    /**
     * @dev Mint tokens - only owner can mint (for testing/demo purposes)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function faucet(address to) external {
        require(block.timestamp - lastFaucetTime[msg.sender] >= 1 hours, "You can only faucet once per hour");
        _mint(to, 100);
        lastFaucetTime[msg.sender] = block.timestamp;
    }
    
    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    /**
     * @dev Burn tokens from specified address (with approval)
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address from, uint256 amount) external {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }
}