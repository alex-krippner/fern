export default class Cart {
  constructor() {
    this.products = [];
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

  async updateCart(productId, change) {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:8000/shop/shopping-cart`,
        withCredentials: true,
        data: {
          productId,
          change,
        },
      });

      const { updatedCart } = res.data.data;
      console.log(updatedCart);
      return updatedCart;
    } catch (err) {
      console.log('error', err);
    }
  }

  addToStorage(clickedProductId, totalQty, totalPrice, products, inCart) {
    const cart = { clickedProductId, totalQty, totalPrice, products, inCart };
    this.persistData(cart);

    return cart;
  }

  persistData(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

/////////////////////////////////////////////////////////////////////////////
