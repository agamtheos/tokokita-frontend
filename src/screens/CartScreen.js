/* eslint-disable no-use-before-define */
import { parseRequestUrl, rerender } from "../utils";
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
    }      
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }  
};
const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
}

const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({...item, qty: Number(e.target.value)}, true)
      });
    });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        removeFromCart(deleteButton.id);
      });
    });
    document.getElementById('checkout-button').addEventListener('click', () => {
      document.location.hash = '/login';
    }); 
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Keranjang Belanja</h3>
            <div>Harga</div>
          </li>
          ${
            cartItems.length === 0
            ? '<div>Keranjang Belanja Kosong. <a href="/#/">Silahkan Tambahkan Barang Belanjaan Anda</a>'
            : cartItems.map(item => `
            <li>
              <div class="cart-image">
                <img src="${item.image}" alt="${item.name}" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.product}">
                    ${item.name}
                  <a/>
                </div>
                <div class="cart-jumlah">
                  Jumlah:
                  <select class="qty-select" id="${item.product}">
                    ${[...Array(item.countInStock).keys()].map((x) => 
                      item.qty === x + 1
                      ? `<option selected value="${x + 1}">${x + 1}</option>`
                      : `<option value="${x + 1}">${x + 1}</option>`
                      )}
                  </select>
                  <button type="button" class="delete-button" id="${item.product}">
                    Hapus
                  </button>
                </div>
              </div>
              <div class="cart-price">
                Rp ${item.price}
              </div>
            `
              ).join('\n')
          }
        </ul>
      </div>
      <div class="cart-action">
          <h3>
            Subtotal (${cartItems.reduce((akm, current) => akm + current.qty, 0)} items)
            :
            Rp ${cartItems.reduce((akm, current) => akm + current.price * current.qty, 0)}
          </h3>
          <button id="checkout-button" class="fullw primary">
            Beli
          </button>
      </div>

    </div>
    `;
  },
};

export default CartScreen;