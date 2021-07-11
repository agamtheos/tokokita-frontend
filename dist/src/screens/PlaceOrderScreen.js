import { createOrder } from '../api';
import CheckoutSteps from '../components/CheckoutSteps';
import { getCartItems, getPayment, getShipping, cleanCart } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils'

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = '/cart';
  }
  const shipping = getShipping();
  if (!shipping.alamat) {
    document.location.hash = '/shipping';
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = '/payment';
  }
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 200000 ? 0 : 32000;
  const taxPrice = Math.round(0.1 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }
};

const PlaceOrderScreen = {
  after_render: async() => {
    document.getElementById("placeorder-button")
    .addEventListener('click', async() =>{
      const order = convertCartToOrder();
      showLoading();
      const data = await createOrder(order);
      hideLoading();
      if(data.error){
        showMessage(data.error);
      } else {
        cleanCart();
        document.location.hash = `/order/' + data.order._id`;
      }
    });
    
  },
  render: () => {
    const {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    } = convertCartToOrder();
    return `
    <div>
      ${CheckoutSteps.render({
        step1:true,
        step2:true,
        step3:true,
        step4:true,
      })}
      <div class="order">
        <div class="order-info">
          <div>
            <h2>Pengiriman</h2>
            <div>
            ${shipping.alamat}, ${shipping.kota}, ${shipping.kodePos},
            ${shipping.provinsi}
            </div>
          </div>
          <div>
            <h2>Pembayaran</h2>
            <div>
              Metode Pembayaran : ${payment.paymentMethod}
            </div>
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2>Keranjang Belanja</h2>
                <div>Harga</div>
              </li>
              ${orderItems.map(
                (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="/#/product/>${item.product}">${item.name} </a>
                    </div>
                    <div> Jumlah: ${item.qty} </div>
                  </div>
                  <div class="cart-price"> Rp${item.price}</div> 
                </li>
                `
              )}
            </ul>
          </div>
        </div>
        <div class="order-action">
          <ul>
                <li>
                    <h2>Ringkasan Pesanan</h2>
                </li> 
                <li><div>Items</div><div>Rp${itemsPrice}</div></li>
                <li><div>Pembayaran</div><div>Rp${shippingPrice}</div></li>
                <li><div>Pajak</div><div>Rp${taxPrice}</div></li>
                <li class="total"><div>Sub Total</div><div>Rp${totalPrice}</div></li>
                <li>
                <button id="placeorder-button" class="fullw primary">
                Pesan Sekarang
                </button>
                </li>
          </ul>
        </div>
      </div>
    </div>
    `;
  },

};
export default PlaceOrderScreen;