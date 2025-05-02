const cartModule = require("../cart");


let cart;
beforeEach(() => {
    cart = [
        {item: {id: 19, name: "Jeans", price: 51}, quantity: 2},
        {item: {id: 3, name: "Fleece Jacket", price: 121}, quantity: 1},
        {item: {id: 7, name: "Ground Coffee", price: 11}, quantity: 4},
    ];
});


describe('addItem function', () => {
    const newItem = {id: 1, name: "Beetle juice", price: 1};

    test('should add item to the cart', () => {
        cartModule.addItem(cart, newItem, 4);
        expect(cart.length).toBe(4);
        expect(cart[3]).toEqual({item: {id: 1, name: "Beetle juice", price: 1}, quantity: 4});
    });

    test('should throw an error if the quantity is negative', () => {
        expect(() => cartModule.addItem(cart, newItem, -3)).toThrow("Invalid quantity.");
    });

    test('should throw an error if the quantity is 0', () => {
        expect(() => cartModule.addItem(cart, newItem, 0)).toThrow("Invalid quantity.");
    });

    test('should throw an error if the quantity is not a number', () => {
        expect(() => cartModule.addItem(cart, newItem, "njnj")).toThrow("Invalid quantity.");
    });
});

describe('removeItem function', () => {
    test('should remove item from the cart', () => {
        cartModule.removeItem(cart, {id: 3, name: "Fleece Jacket", price: 121});
        expect(cart.length).toBe(2);
        expect(cart).not.toContainEqual({item: {id: 3, name: "Fleece Jacket", price: 121}, quantity: 1});
    });

    test('should remove the last item from the cart', () => {
        cartModule.removeItem(cart, {id: 7, name: "Ground Coffee", price: 11});
        expect(cart.length).toBe(2);
        expect(cart).not.toContainEqual({item: {id: 7, name: "Ground Coffee", price: 11}, quantity: 4});
    });
    
    test('should throw an error if the item is not in the cart initially', () => {
        const item = {id: 4, name: "unknown item", price: 21};
        expect(() => cartModule.removeItem(cart, item)).toThrow("The item was not found.");
    });
})

describe('getTotalItems', () => {
    test('should calculate total number of items', () => {
        expect(cartModule.getTotalItems(cart)).toBe(7);
    });

    test('should return 0 if the cart is empty', () => {
        expect(cartModule.getTotalItems([])).toBe(0);
    });

    test('should should warn if the total quantity exceeds max safe integer', () => {
        cart[0].quantity = Number.MAX_SAFE_INTEGER;
        //cart[1].quantity = Number.MAX_SAFE_INTEGER;
        const expectedMessage = "WARNING: The total quantity exeeds the maximum safe integer! Precision may be lost!";
        // mock console.log
        const consoleLog = jest.spyOn(console, 'log');
        cartModule.getTotalItems(cart);
        expect(consoleLog).toHaveBeenCalledWith(expectedMessage);
        consoleLog.mockRestore();
    });

});