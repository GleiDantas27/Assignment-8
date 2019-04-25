/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};
var ownerName = "",
    depositAmount = "",
    withdrawAmount = "";
function bankAccount(ownerName, trans) {
    "use strict";
    // SETTING THE BALANCE OF THE CUSTOMER TO "0" DOLLARS
    var balance = 0, owner = ownerName;
    var Account = {
        //DEPOSIT METHOD
        deposit: function (depositAmount) {
            if (isNaN(depositAmount)  || depositAmount === "") {
                alert('Error: please enter a number!');
            } else {  
                balance = depositAmount;
                $("display").innerHTML = owner + " has a balance of "  + balance + "" + "dollars";
            }
        },
        //WITHDRAW METHOD
        withdraw: function (withdrawAmount) {
            // CHECKING IF ITS A VALID NUMBER
            if (isNaN(withdrawAmount)  || withdrawAmount === "") {
                alert('Error: please enter a valid number!');
            }
            // CHECKING FOR AN OVERDRAFT SITUATION
            if (withdrawAmount < depositAmount) {
                balance = depositAmount - withdrawAmount;
                $("display").innerHTML = owner + " has a balance of "  + balance + "" + "dollars";
            }
                else {
                    withdrawAmount > depositAmount;
                    alert('Error: Not enough funds bro!');
                }
            // LIMITING THE WITHDRAW AMOUNT TO 999.99 DOLLARS
            if (withdrawAmount > 999.99) {
                alert("The Maximum withdraw Amount Allowed for your Plan is 999.99 dollars!")
                balance = depositAmount;
            }
            
        }
    }; //END OF ACCOUNT OBJECT
    if (trans === "deposit") {
        Account.deposit(depositAmount);
    } else if (trans === "withdraw") {
        Account.withdraw(withdrawAmount);
    }
    $("display").innerHTML = owner + " has a balance of "  + balance + " " + "dollars" + ".";
    return Account;
}
window.addEventListener("load", function () {
    "use strict";
    $("btnName").onclick = function () {
        ownerName = window.prompt('Enter your name');
        // CHECKING FOR A VALID NAME
        if (isNaN(ownerName)) {
            window.console.log(ownerName);
            bankAccount(ownerName);
        } else {
            alert("Must input letters");
            return false;
        }
    };
    $("btnDeposit").onclick = function () {
        depositAmount = window.prompt(' Deposit the Amount Desired', '999.99');
        window.console.log(depositAmount);
        bankAccount(ownerName, "deposit");
    };
    $("btnWithdraw").onclick = function () {
        withdrawAmount = window.prompt(' Withdraw the Amount desired', '999.99');
        window.console.log(withdrawAmount);
        bankAccount(ownerName, "withdraw");
    };
});
