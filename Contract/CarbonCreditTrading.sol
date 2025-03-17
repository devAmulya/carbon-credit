// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditToken is ERC20, Ownable {
    uint256 public constant TOKEN_PRICE = 0.001 ether; // 1 CCT = 0.001 ETH

    // Mapping to track yearly burned credits per user
    mapping(address => mapping(uint256 => uint256)) public burnedCredits;

    struct Sale {
        address seller;
        uint256 amount;
        uint256 pricePerToken;
    }

    mapping(uint256 => Sale) public sales;
    uint256 public saleCounter = 0;

    constructor() ERC20("Carbon Credit Token", "CCT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // ✅ Fixed Supply: Government gets CC at deployment
    }

    // ✅ Buy credits from the government (Fixed Supply Model)
    function buyCredits(uint256 amount) external payable {
        require(balanceOf(owner()) >= amount, "Not enough credits available"); // ✅ Check gov stock
        require(msg.value >= amount * TOKEN_PRICE, "Insufficient ETH"); // ✅ Check ETH payment

        _transfer(owner(), msg.sender, amount); // ✅ Transfer from gov stock instead of minting
    }

    // ✅ Burn credits (Retire Carbon Credits)
    function burnCredits(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Not enough credits");
        _burn(msg.sender, _amount);

        // Track burned credits for this year
        uint256 currentYear = block.timestamp / 31536000 + 1970;
        burnedCredits[msg.sender][currentYear] += _amount;

    }

    // ✅ Check burned credits for a year
    function getBurnedCredits(address _user, uint256 _year) external view returns (uint256) {
        return burnedCredits[_user][_year];
    }

    // ✅ List credits for sale (Marketplace)
    function listForSale(uint256 amount, uint256 pricePerToken) external {
        require(balanceOf(msg.sender) >= amount, "Not enough credits");
        _transfer(msg.sender, address(this), amount);  // Hold tokens in contract

        sales[saleCounter] = Sale(msg.sender, amount, pricePerToken);
        saleCounter++;
    }

    // ✅ Buy credits from another company (Marketplace Trading)
    function buyFromMarket(uint256 saleId) external payable {
        Sale memory sale = sales[saleId];
        require(msg.value >= sale.amount * sale.pricePerToken, "Not enough ETH");

        _transfer(address(this), msg.sender, sale.amount);
        payable(sale.seller).transfer(msg.value);

        delete sales[saleId];  // Remove from listings
    }

    // ✅ Withdraw ETH from contract (Only Admin/Government)
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    // ✅ Check current CC balance for any address
    function getBalance(address _user) external view returns (uint256) {
        return balanceOf(_user);
    }
}
