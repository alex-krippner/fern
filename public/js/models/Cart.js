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

      this.totalPrice = updatedCart.cartTotalPrice;
      this.totalQty = updatedCart.cartTotalQty;
      this.products[productId].qty = updatedCart.itemQty;
      this.products[productId].price = updatedCart.itemTotalPrice;
    } catch (err) {
      console.log('error', err);
    }
  }

  async removeItem(productId) {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:8000/shop/shopping-cart/remove-item`,
        withCredentials: true,
        data: {
          productId,
        },
      });

      const { updatedCart } = res.data.data;
      this.totalQty = updatedCart.totalQty;
      this.totalPrice = updatedCart.totalPrice;
      this.products = updatedCart.products;
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
