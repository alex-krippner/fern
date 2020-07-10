module.exports = function CartSession(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    storedItem.inCart = true;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.updateQuantity = function (id, change) {
    let storedItem = this.items[id];
    if (change === 'incr') {
      storedItem.qty++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      this.totalQty++;
      this.totalPrice += storedItem.item.price;
    } else if (change === 'decr') {
      storedItem.qty--;
      storedItem.price = storedItem.item.price * storedItem.qty;
      this.totalQty--;
      this.totalPrice -= storedItem.item.price;
    }
  };
};
