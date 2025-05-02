// Write tests for each method in the cart.js module, covering:
// ■ Positive Tests: Valid inputs producing expected results.
// ■ Negative Tests: Invalid inputs handled gracefully.
// ■ Edge Cases: Unusual or extreme values

function addItem(cart, item, quantity=1) {
    if (typeof quantity !== "number" || isNaN(quantity) || quantity <= 0 ) {
        throw new Error("Invalid quantity.");
    }
    cart.push({item: item, quantity: quantity});
}

// I assume that it removes an item entirely since the quantity is not specified
function removeItem(cart, item) {
    const indexofItem = cart.findIndex(el => el.item.id === item.id);
    if (indexofItem === -1) {
        throw new Error("The item was not found.");
    }
    cart.splice(indexofItem, 1);
}

function getTotalItems(cart) {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (!Number.isSafeInteger(total)) {
        // alternatively we could throw an error but I wanted to try mocking
        console.log("WARNING: The total quantity exeeds the maximum safe integer! Precision may be lost!");
    }
    return total;
}

module.exports = {addItem, removeItem, getTotalItems};