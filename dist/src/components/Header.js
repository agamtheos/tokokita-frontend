import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const {name} = getUserInfo();
    return `
    <div class="brand">
        <a href="/#/">Toko Kita</a>
      </div>
      <div>
      ${name
        ? `<a href="/#/profile">${name}</a>`
        : `<a href="/#/login">Login</a>`
      }      
        <a href="/#/cart">Keranjang</a>
      </div>`
  },
  after_render: () => {

  },
};
export default Header;