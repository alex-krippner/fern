const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utilities/catchAsyncError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { cart } = req.session;
  const items = Object.values(cart.items);

  // Create array of line items object from the cart items
  const lineItems = items.map((item) => {
    const lineItemsObject = {
      name: item.item.name,
      amount: item.item.price * 100,
      currency: 'eur',
      quantity: item.qty,
    };

    return lineItemsObject;
  });

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/shop`,
    client_reference_id: req.sessionID,
    line_items: [...lineItems],
  });

  res.status(200).json({
    status: 'success',
    stripeSession,
  });
  console.log(stripeSession);
});

exports.deleteCartSession = catchAsync(async (req, res, next) => {
  req.session.destroy();

  res.status(200).json({
    status: 'success',
  });
  console.log('cart session deleted');
});
