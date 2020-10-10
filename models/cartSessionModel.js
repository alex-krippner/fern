module.exports = function CartSession(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      this.items[id] = { item: item, qty: 0, price: 0 };
      storedItem = this.items[id];
    }
    storedItem.qty += 1;
    storedItem.price = storedItem.item.price * storedItem.qty;
    storedItem.inCart = true;
    this.totalQty += 1;
    this.totalPrice += storedItem.item.price;
  };

  this.updateQuantity = function (id, quantity) {
    const storedItem = this.items[id];
    this.totalQty = oldCart.totalQty + (quantity - storedItem.qty);
    this.totalPrice += storedItem.item.price * (quantity - storedItem.qty);
    storedItem.qty += quantity - storedItem.qty;
    storedItem.price = storedItem.item.price * storedItem.qty;
  };

  this.removeItem = function (id) {
    const storedItem = this.items[id];
    this.totalQty = oldCart.totalQty - storedItem.qty;
    this.totalPrice = oldCart.totalPrice - storedItem.price;
    delete this.items[id];
  };
};
