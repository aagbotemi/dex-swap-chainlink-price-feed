// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Swap{
    event input(uint256);

    struct TokenDetails {
        address tokenAddress;
        uint256 price;
    }

    struct AggregatorFeed {
        AggregatorV3Interface priceFeed;
    }

    address owner;
    TokenDetails[] pricefeed;

    // address is tokenAddress
    mapping(address => TokenDetails) _tokenInfo;
    // uint is tokenAddress
    mapping(address => AggregatorFeed) _tokenUsd;

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorize");
        _;
    }

    constructor(){
        owner = msg.sender;
    }  


    function setPriceFeed(address _tokenaddr, address _addrFeedInput) public {
        AggregatorFeed memory AF = _tokenUsd[_tokenaddr];
        AF.priceFeed = AggregatorV3Interface(_addrFeedInput);
    }


    function RegisterToken(address _tokenaddr) public {
        TokenDetails memory TD = _tokenInfo[_tokenaddr];
        AggregatorFeed memory AF = _tokenUsd[_tokenaddr];
        // AggregatorFeed memory AF = _tokenInfo[_addr];
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = AF.priceFeed.latestRoundData();
        TD.tokenAddress = _tokenaddr;
        TD.price = uint256(price);
        uint256 priceIndex = pricefeed.length;
        pricefeed.push(TD);
    }

    function SetTokenPrice(uint256 feedindex, uint256 setPrice) public{
        require(msg.sender == owner);
        pricefeed[feedindex].price = setPrice;

    }

    function SwapExactTokentoToken (address tokenaddr, address tokenaddr2,address owner1, address owner2,uint tokenvalue1, uint tokenvalue2) public {
        IERC20 exactToken = IERC20(tokenaddr);
        IERC20 token = IERC20(tokenaddr2);

        require(exactToken.allowance(owner1, address(this)) >= tokenvalue1, "You are withdrawing more than your allowance");
        require(token.allowance(owner2, address(this)) >= tokenvalue2, "You are withdrawing more than your allowance");

        for(uint256 i=0; i < pricefeed.length; i++){
            if(pricefeed[i].tokenAddress == tokenaddr){
                uint256 checkprice1 = pricefeed[i].price;
                token.transferFrom(owner2, owner1, (tokenvalue2 * checkprice1));
            }
            if(pricefeed[i].tokenAddress == tokenaddr2){
                uint256 checkprice2 = pricefeed[i].price;
                exactToken.transferFrom(owner1, owner2, (tokenvalue1 * checkprice2));
            }
        }        
    }
}