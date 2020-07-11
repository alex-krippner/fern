export default class Cart {
  constructor(totalQty, totalPrice, products) {
    this.products = products || {};
    this.totalPrice = totalPrice || 0;
    this.totalQty = totalQty || 0;
  }

  async addToCart(productId) {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:8000/shop/add-to-cart/${productId}`,
        withCredentials: true,
      });
      this.totalQty = res.data.data.totalQty;
      this.totalPrice = res.data.data.totalPrice;
      this.products = res.data.data.items;

      // this.products[productId].inCart = true;
    } catch (err) {
      console.log('error', err);
    }
  }

  async getCart() {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:8000/shop/shopping-cart`,
        withCredentials: true,
      });
      const { data } = res.data;
      return data;
    } catch (err) {
      console.log('error', err);
    }
  }

  async updateCart(productId, quantity) {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:8000/shop/shopping-cart`,
        withCredentials: true,
        data: {
          productId,
          quantity,
        },
      });

      const { updatedCart } = res.data.data;
      console.log(res.data.data);
      //  this.addToStorage( null,
      //   updatedCart.cartTotalQty,
      //   updatedCart.cartTotalPrice,
      //   state.cart.products
      // );
      // console.log(updatedCart);
      return updatedCart;
    } catch (err) {
      console.log('error', err);
    }
  }

  addToStorage(totalQty, totalPrice, products) {
    const cart = { totalQty, totalPrice, products };
    this.persistData(cart);

    return cart;
  }

  persistData(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

/////////////////////////////////////////////////////////////////////////////
