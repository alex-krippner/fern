export default class Checkout {
  async makePayment(stripe) {
    // 1) Get checkout session
    console.log('starting stripe session');
    const paymentSession = await axios({
      method: 'GET',
      url: `http://localhost:8000/checkout/checkout-session`,
      withCredentials: true,
    });

    // 2) Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: paymentSession.data.stripeSession.id,
    });
  }

  async deleteCartSession() {
    console.log('sending delete request');
    await axios({
      method: 'DELETE',
      url: `http://localhost:8000/checkout/checkout-session`,
      withCredentials: true,
    });
  }
}
