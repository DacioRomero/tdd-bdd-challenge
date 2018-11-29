const mocha = require("mocha");
const chai = require("chai");
const utils = require("../utils");
const expect = chai.expect;

// ========================================================
// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
// ========================================================

it("should say hello", function() {
  const hello = utils.sayHello();
  expect(hello).to.be.a("string");
  expect(hello).to.equal("Hello");
  expect(hello).with.lengthOf(5);
});

// ========================================================
// Level 1 Challenges
// ========================================================

it("should return the area of a 5 by 6 rectangle", function() {
  const area = utils.area(5, 6);
  expect(area).to.be.a("number");
  expect(area).to.equal(30);
});

it("should return the area of a circle of radius 5", function() {
  const circleArea = utils.circleArea(5);
  expect(circleArea).to.be.a("number");
  expect(circleArea).to.be.closeTo(78.5398, 0.0001)
});

// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: The following unimplemented test cases are examples
// of "Pending Tests" in Chai. Someone should write these
// tests eventually.
// ========================================================

it("Should create a new (object) Item with name and price", function() {
  const banana = utils.Item('Banana', 1.02);
  expect(banana).to.be.a('object');
  expect(banana).to.have.property('name', 'Banana');
  expect(banana).to.have.property('price', 1.02);
});

const generateCart = () => {
  const Item = utils.Item;
  return utils.Cart(Item('Banana', 1.02), Item('Apple', 1.42), Item('Orange', 1.36));
}

it("Should return an array containing all items in cart", function() {
  const cart = generateCart();
  expect(cart).to.be.an('array');
  expect(cart).to.deep.equal([
    {
      name: 'Banana', 
      price: 1.02
    },
    {
      name: 'Apple', 
      price: 1.42
    },
    {
      name: 'Orange', 
      price: 1.36
    }
  ]);
});

it("Should add a new item to the shopping cart", function() {
  const cart = generateCart();
  cart.add(utils.Item('Romaine', 0.43))
  expect(cart).to.deep.contain({
    name: 'Romaine',
    price: 0.43
  },);
});

it("Should return the number of items in the cart", function() {
  const cart = generateCart();
  expect(cart.count).to.equal(3)
});

it("Should remove items from cart", function() {
  const cart = generateCart();
  cart.remove(0);
  expect(cart).with.lengthOf(2);
  expect(cart).to.deep.equal([
    {
      name: 'Apple', 
      price: 1.42
    },
    {
      name: 'Orange', 
      price: 1.36
    }
  ])
});

// ========================================================
// Stretch Challenges
// ========================================================

it("Should update the count of items in the cart");

it("Should remove an item when count is 0");

it("Should return the total cost of all items in the cart", function() {
  const cart = generateCart();
  expect(cart.price).to.equal(3.80)
});
