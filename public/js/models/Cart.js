// import axios from 'axios';

// export default class Cart {
//   constructor(userId) {
//     this.userId = userId;
//   }

//   async createCart() {
//     try {
//       const res = await axios(`http://localhost:8000/shop/${this.userId}/cart`);
//       const cartItemData = res.data.cartDoc.cartItems[0];

//       this.productId = cartItemData.productId;
//       this.name = cartItemData.name;
//       this.price = cartItemData.price;
//       this.weight = cartItemData.weight;
//       this.description = cartItemData.description;
//       this.imageCover = cartItemData.imageCover;
//     } catch (err) {
//       console.log(err);
//       alert('Something went wrong :<(');
//     }
//   }
// }
