const mongoose = require('mongoose');

/*
 ********  CART ITEM SCHEMA  ********
 */

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
  },
  name: {
    type: String,
    required: [true, 'Please add product name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add product price'],
  },
  weight: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Please add product description'],
  },
  imageCover: String,
  quantity: {
    type: Number,
    default: 0,
  },
  totaPrice: {
    type: Number,
  },
});

/*
 ********  CART SCHEMA  ********
 */

const cartSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiryDate: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  cartItems: [cartItemSchema],
});

/*
 ********  CART SCHEMA METHODS ********
 */

cartSchema.methods.add = function (productId) {
  // if item already in cartItems update price and quantity
  this.cartItems.forEach((cartItem) => {
    if (cartItem.id === productId) {
      cartItem.quantity++;
      cartItem.totaPrice = cartItem.price * cartItem.quantity;
    }
  });
  // if not than create new item
};

//

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

// class CartClass {
//   constructor(oldCart) {
//     this.items = oldCart.items || {};
//     this.totalQty = oldCart.totalQty || 0;
//     this.totalPrice = oldCart.totalPrice || 0;
//   }

//   add(item, id) {
//     let storedItem = this.items[id];
//     if (!storedItem) {
//       storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
//     }
//     storedItem.qty++;
//     storedItem.price = storedItem.item.price * storedItem.qty;
//     this.totalQty++;
//     this.totalPrice += storedItem.price;
//   }

//   generateArray() {
//     let arr = [];
//     for (let id in this.items) {
//       arr.push(this.items[id]);
//     }
//     return arr;
//   }
// }
