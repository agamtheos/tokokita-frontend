const CheckoutSteps = {
  render: (props) => {
    return `
    <div class="checkout-steps">
      <div class="${props.step1 ? 'active' : ''}">Login</div>
      <div class="${props.step2 ? 'active' : ''}">Alamat Pengiriman</div>
      <div class="${props.step3 ? 'active' : ''}">Metode Pembayaran</div>
      <div class="${props.step4 ? 'active' : ''}">Checkout</div>
    </div>
    `;
  },
};
export default CheckoutSteps;
