const mocha = require("mocha");
const chai = require("chai");
const utils = require("../utils");
const expect = chai.expect;

// ========================================================
// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
// ========================================================

it("should say hello", function () {
  const hello = utils.sayHello();
  expect(hello).to.be.a("string");
  expect(hello).to.equal("Hello");
  expect(hello).with.lengthOf(5);
});

describe("\"MeasureIt.com\"", function () {
  // ========================================================
  // Level 1 Challenges
  // ========================================================
  var area, circleArea;

  before(function (done) {
    area = utils.area;
    circleArea = utils.circleArea;
    done();
  })

  it("should return the area of a 5 by 6 rectangle", function () {
    const the_area = area(5, 6);

    expect(the_area).to.be.a("number");
    expect(the_area).to.equal(30);
  });

  it("should return the area of a circle of radius 5", function () {
    const the_area = circleArea(5);

    expect(the_area).to.be.a("number");
    expect(the_area).to.be.closeTo(78.5398, 0.0001)
  });
})

describe("Cart", function () {
  // ========================================================
  // Level 2 Challenges
  // ========================================================
  // NOTE: The following unimplemented test cases are examples
  // of "Pending Tests" in Chai. Someone should write these
  // tests eventually.
  // ========================================================
  var Item, Cart, generateExampleCart;

  before(function (done) {
    Item = utils.Item;
    Cart = utils.Cart;
    generateExampleCart = () => {
      return Cart(Item("Banana", 1.02), Item("Apple", 1.42), Item("Orange", 1.36));
    }
    done();
  })

  it("Should create a new (object) Item with name and price", function () {
    const the_item = Item("Banana", 1.02);

    expect(the_item).to.be.a("object");
    expect(the_item).to.have.property("name", "Banana");
    expect(the_item).to.have.property("price", 1.02);
  });

  it("Should return an array containing all items in cart", function () {
    const the_cart = generateExampleCart();

    expect(the_cart).to.be.an("array");
    expect(the_cart).to.deep.equal([{
        name: "Banana",
        price: 1.02
      },
      {
        name: "Apple",
        price: 1.42
      },
      {
        name: "Orange",
        price: 1.36
      }
    ]);
  });

  it("Should add a new item to the shopping cart", function () {
    const the_cart = generateExampleCart();

    the_cart.add(Item("Romaine", 0.43))
    expect(the_cart).to.deep.contain({
      name: "Romaine",
      price: 0.43
    }, );
  });

  it("Should return the number of items in the cart", function () {
    const cart = generateExampleCart();
    expect(cart).to.have.property("count", 3);
  });

  it("Should remove items from cart", function () {
    const cart = generateExampleCart();

    cart.remove(0);

    expect(cart).with.lengthOf(2);
    expect(cart).to.deep.equal([{
        name: "Apple",
        price: 1.42
      },
      {
        name: "Orange",
        price: 1.36
      }
    ])
  });

  // ========================================================
  // Stretch Challenges
  // ========================================================

  it("Should update the count of items in the cart", function () {
    const cart = generateExampleCart();
    const originalCount = cart.count;

    cart.remove(0);
    expect(cart).to.have.property("count", originalCount - 1)
    cart.add(utils.Item("Tomato", 1.32))
    expect(cart).to.have.property("count", originalCount)
  });

  it("Should validate that an empty cart has 0 items", function () {
    const cart = Cart();
    expect(cart).to.have.property("count", 0);
  });

  it("Should return the total cost of all items in the cart", function () {
    const cart = generateExampleCart();
    expect(cart.price).to.equal(3.80)
  });
});
