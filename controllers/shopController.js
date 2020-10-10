const Product = require('../models/productsModel');
const CartSession = require('../models/cartSessionModel');

const catchAsync = require('../utilities/catchAsyncError');

exports.addToCart = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const cart = new CartSession(
    req.session.cart ? req.session.cart : { items: {} }
  );

  const product = await Product.findById(productId);

  cart.add(product, product.id);
  req.session.cart = cart;

  res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.getShoppingCart = catchAsync(async (req, res, next) => {
  const cart = new CartSession(
    req.session.cart ? req.session.cart : { items: {} }
  );

  const data = {
    totalQty: cart.totalQty,
    products: cart.items,
    totalPrice: cart.totalPrice,
  };
  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.updateQuantity = catchAsync(async (req, res, next) => {
  let { cart } = req.session;
  const { productId, quantity } = req.body;
  // create new CartSession instance to access class methods
  cart = new CartSession(cart);
  cart.updateQuantity(productId, quantity);

  req.session.cart = cart;
  const updatedCart = {
    cartTotalQty: cart.totalQty,
    cartTotalPrice: cart.totalPrice,
    productId: cart.items[productId],
    itemQty: cart.items[productId].qty,
    itemTotalPrice: cart.items[productId].price,
  };

  res.status(200).json({
    status: 'success',
    data: {
      updatedCart,
    },
  });
});

exports.removeItem = catchAsync(async (req, res, next) => {
  let { cart } = req.session;
  const { productId } = req.body;
  cart = new CartSession(cart);
  cart.removeItem(productId);

  req.session.cart = cart;

  const updatedCart = {
    totalQty: cart.totalQty,
    products: cart.items,
    totalPrice: cart.totalPrice,
  };
  res.status(200).json({
    status: 'success',
    data: {
      updatedCart,
    },
  });
});
