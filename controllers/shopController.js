const Product = require('../models/productsModel');
const CartItem = require('../models/cartModel');
// const AppError = require('../utilities/appError');

////////////////////////////////////////////
// PRODUCT CRUD
////////////////////////////////////////////

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json({
      status: 'success',
      results: allProducts.length,
      data: allProducts,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      messag: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log(newProduct);

    res.status(201).json({
      status: 'success',
      data: {
        products: newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.addProductToCart = async (req, res) => {
  // find the product in the product collection
  const clickedProduct = await Product.findById(req.params.id);
  // TODO: get the productID -- THIS CODE NEEDS REFACTORING
  const productID = req.params.id;
  // copy product properties in order to create new cart item
  const {
    productName,
    price,
    amountWeight,
    description,
    imageCover,
  } = clickedProduct;

  try {
    // add product to the cart collection
    const newCartItem = await CartItem.create({
      productID,
      productName,
      price,
      amountWeight,
      description,
      imageCover,
    });
    res.status(200).json({
      status: 'success',
      data: {
        newCartItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

////////////////////////////////////////////
// CART CRUD
////////////////////////////////////////////

exports.getAllCartItems = async (req, res) => {
  try {
    const allCartItems = await CartItem.find();

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
    const cartItem = await CartItem.findById(req.params.id);

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
