import { getProduct } from '../api';
import { hideLoading, parseRequestUrl, showLoading } from '../utils'
import Rating from '../components/Rating'

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click',() => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="content">
      <div class="back">
        <a href="/#/">Kembali ke Halaman Awal</a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}"/>
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numberReviews} penilaian`,
            })}
            </li>
            <li>
              Harga: <strong>Rp ${product.price}</strong>
            </li>
            <li>
              Deskripsi:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
          <ul>
            <li>
              Harga : Rp ${product.price}
            </li>
            <li>
              Status :
                ${product.countInStock > 0 
                  ? `<span class="success">Stok Tersedia</span>`
                  : `<span class="error">Tidak Tersedia</span>`
              }
            </li>
            <li>
              <button id="add-button" class="fullw primary">Tambahkan ke Keranjang </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `;
  },
};
export default ProductScreen;
