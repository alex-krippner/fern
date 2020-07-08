export const addToCart = async (productId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8000/shop/add-to-cart/${productId}`,
      withCredentials: true,
    });

    const { data } = res.data;
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

export const getCart = async () => {
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
};

export const updateCart = async (productId, change) => {
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

    return updatedCart;
  } catch (err) {
    console.log('error', err);
  }
};
