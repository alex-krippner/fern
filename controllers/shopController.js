const Products = require('../models/productsModel');

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();

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
    const product = await Products.findById(req.params.id);

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
    const newProduct = await Products.create(req.body);
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

// exports.getAllItems = async (req, res) => {
//   try {
//     const cartItems = await CartItem.find();

//     res.status(200).json({
//       status: 'success',
//       results: cartItems.length,
//       data: {
//         cartItems,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getCartItem = async (req, res) => {
//   try {
//     const cartItem = await CartItem.findById(req.params.id);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         cartItem,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.addItem = async (req, res) => {
//   try {
//     const newCartItem = await CartItem.create(req.body);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         cartItem: newCartItem,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: 'An error has occured',
//       err,
//     });
//   }
// };
