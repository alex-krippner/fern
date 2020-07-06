const Product = require('../models/productsModel');
const Cart = require('../models/cartModel');
const factory = require('./handlerFactory');
const CartSession = require('../models/cartSessionModel');

const catchAsync = require('../utilities/catchAsyncError');
const AppError = require('../utilities/appError');

// const AppError = require('../utilities/appError');

const createCart = (userId, productId) =>
  catchAsync(async (req, res, next) => {
    // find the product in the product collection
    const clickedProduct = await Product.findById(productId);
    console.log(clickedProduct);

    const {
      _id,
      name,
      price,
      weight,
      description,
      imageCover,
    } = clickedProduct;

    const newCart = {
      userId: userId,
      cartItems: [
        {
          productId: _id,
          name: name,
          price: price,
          weight: weight,
          description: description,
          imageCover: imageCover,
        },
      ],
    };

    const cart = new Cart(newCart);

    const cartDoc = await cart.save();

    if (!clickedProduct) {
      return next(new AppError(`No  document found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: cartDoc,
      },
    });
  });

////////////////////////////////////////////
// PRODUCT CRUD
////////////////////////////////////////////

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product);

exports.createProduct = factory.createOne(Product);

exports.setProductId = (req, res, next) => {
  // if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.product) req.body.product = req.product.id;
  next();
};

exports.addToCart = catchAsync(async (req, res, next) => {
  // console.log('request received');
  let productId = req.params.id;
  let cart = new CartSession(
    req.session.cart ? req.session.cart : { items: {} }
  );

  await Product.findById(productId, function (err, product) {
    if (err) {
      console.log(err);
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    // console.log(
    //   `This is the cart of the session ${req.sessionID}`,
    //   req.session.cart
    // );
  });
  res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.getShoppingCart = catchAsync(async (req, res, next) => {
  const { cart } = req.session;
  const data = {
    products: Object.values(cart.items),
    totalPrice: cart.totalPrice,
  };
  console.log(data.totalPrice);
  res.status(200).json({
    status: 'success',
    data,
  });
});

// exports.addToCart = catchAsync(async (req, res, next) => {
//   // check if there is a session cart
//   let cart;
//   const productId = req.params.id;
//   console.log('This is the productId', productId);
//   console.log('This is the session id', req.session.id);
//   if (!req.session.cart) {
//     cart = createCart(req.sessionId, productId);
//   } else {
//     req.session.cart.add(productId);
//   }
//   cart = req.session.cart;
//   // if there is no session create a cart
//   // if there is a session then get the cart
// });

// exports.createCart = catchAsync(async (req, res, next) => {
//   // find the product in the product collection
//   const clickedProduct = await Product.findById(req.params.id);

//   const { _id, name, price, weight, description, imageCover } = clickedProduct;

//   const newCart = {
//     userId: req.params.userId,
//     cartItems: [
//       {
//         productId: _id,
//         name: name,
//         price: price,
//         weight: weight,
//         description: description,
//         imageCover: imageCover,
//       },
//     ],
//   };

//   const cart = new Cart(newCart);

//   const cartDoc = await cart.save();

//   if (!clickedProduct) {
//     return next(new AppError(`No  document found with that ID`, 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: cartDoc,
//     },
//   });
// });

////////////////////////////////////////////
// CART CRUD
////////////////////////////////////////////

exports.getAllCartItems = async (req, res) => {
  try {
    const allCartItems = await Cart.find();

    res.status(200).json({
      status: 'success',
      results: allCartItems.length,
      data: allCartItems,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        cartItem,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// REMOVED FROM shopRoutes
// REPLACED BY addProductToCart
// MAYBE ADD/REFACTOR LATER?
// exports.addCartItem = async (req, res) => {
//   try {
//     const newCartItem = await CartItem.create(req.body);
//     console.log(newCartItem);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         cartItem: newCartItem,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       messsage: 'Invalid data sent!',
//     });
//   }
// };

exports.increaseCartItemAmount = async (req, res) => {
  try {
    const increasedCartItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        increasedCartItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(402).json({
      status: 'fail',
      message: err,
    });
  }
};
