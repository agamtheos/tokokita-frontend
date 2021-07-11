import axios from 'axios';
import Rating from '../components/Rating';
import { hideLoading, showLoading } from '../utils';

const HomeScreen = {
  render: async () => {
    showLoading();
    const response = await axios('http://localhost:5000/api/products', {
      headers: {
        'Content-Type': 'application.json',
      },
    });
    hideLoading();
    // jika response null atau response.statusText tidak equal 'OK', return error
    if (!response || response.statusText !== 'OK') {
      return '<div>Error in getting data</div>';
    }
    // jika sukses
    const products = response.data;

    return `
    <ul class="products">
      ${products.map((product) => `
      <li>
      <div class="product">
      <a href="/#/product/${product._id}">
        <img src="${product.image}" alt="${product.name}"/>
      </a>
      <div class="product-name">
        <a href="/#/product/1">
          ${product.name}
        </a>
      </div>
      <div class="product-rating">
        ${Rating.render({
          value: product.rating,
          text: `${product.numberReviews} Penilaian`
        })}
      </div>
      <div class="product-brand">
        ${product.brand}
      </div>
      <div class="product-price">
        Rp ${product.price}
      </div>
    </div>
      </li>
      `)
    .join('\n')}
    `;
  },
};
export default HomeScreen;
