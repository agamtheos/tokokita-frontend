import { getUserInfo, getShipping, setShipping } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        setShipping({
          nama: document.getElementById('nama').value,
          noHp: document.getElementById('noHp').value,
          alamat: document.getElementById('alamat').value,
          kota: document.getElementById('kota').value,
          kodePos: document.getElementById('kodePos').value,
          provinsi: document.getElementById('provinsi').value,          
        });
        document.location.hash = '/payment';
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const { nama, noHp, alamat, kota, kodePos, provinsi } = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
    <div class="form-container">
      <form id="shipping-form">
        <ul class="form-items">
          <li>
            <h1>Data Pengiriman</h1>
          </li>
          <li>
            <label for="nama">Nama Penerima</label>
            <input type="text" name="nama" id="nama" value="${nama}" />
          </li>
          <li>
            <label for="noHp">No. Ponsel</label>
            <input type="text" name="noHp" id="noHp" value="${noHp}" />
          </li>
          <li>
            <label for="alamat">Alamat</label>
            <input type="text" name="alamat" id="alamat" value="${alamat}" />
          </li>
          <li>
            <label for="kota">Kabupaten / Kota</label>
            <input type="text" name="kota" id="kota" value="${kota}" />
          </li>
          <li>
            <label for="provinsi">Provinsi</label>
            <input type="text" name="provinsi" id="provinsi" value="${provinsi}" />
          </li>
          <li>
            <label for="kodePos">Kode Pos</label>
            <input type="text" name="kodePos" id="kodePos" value="${kodePos}" />
          </li>
          <li>
            <button type="submit" class="fullw primary">Lanjutkan</button>
          </li>        
        </ul>
      </form>
    </div>
    
    `;
  },
};
export default ShippingScreen;