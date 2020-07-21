const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utilities/catchAsyncError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // console.log(req.session);
  const { cart } = req.session;
  const { products } = req.body;
  // console.log(cart);
  const items = Object.values(cart.items);
  // console.log([...items]);

  const lineItems = items.map((item) => {
    const lineItemsObject = {
      name: item.item.name,
      amount: item.item.price * 100,
      currency: 'eur',
      quantity: item.qty,
    };

    return lineItemsObject;
  });

  console.log([...lineItems]);

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/shop`,
    // customer_email: req.body.customer.email,
    client_reference_id: req.sessionID,
    line_items: [...lineItems],
  });

  res.status(200).json({
    status: 'success',
    stripeSession,
  });
});

// write a function that creates a list item object for each cart item
// line_items object properties: name, amount, qty
