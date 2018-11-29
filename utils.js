const sayHello = () => {
  return "Hello";
};

const area = (w, h) => {
  return w * h;
};

const perimeter = (w, h) => {
  return w + w + h + h;
};

const circleArea = r => {
  return Math.PI * r * r;
};

const Item = (name, price) => {
  return {name, price}
}

const Cart = (...items) => {
  items.add = function(item) {
    this.push(item)
  }
  items.remove = function(index) {
    this.splice(index, 1)
  }
  Object.defineProperties(items, {
    price: {
      get: function() {
        return this.reduce((total, item) => total + item.price, 0)
      }
    },
    count: {
      get: function() {
        return this.length;
      }
    }
  })
  return items
}

module.exports = { sayHello, area, perimeter, circleArea, Item, Cart };
