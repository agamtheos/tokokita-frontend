import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import daftar from './screens/daftar';
import Error404Screen from './screens/Error404Screen';
import home from './screens/home';
import LoginScreen from './screens/LoginScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import profile from './screens/profile';
import ShippingScreen from './screens/ShippingScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';

const routes = {
  '/': home,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/login': LoginScreen,
  '/daftar': daftar,
  '/profile': profile,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/checkout': PlaceOrderScreen,
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
