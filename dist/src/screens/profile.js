import { update } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const profile = {
  after_render: () => {
    document.getElementById("logout-button").addEventListener('click', () => {
      clearUser();
      document.location.hash = '/'
    });
    document
    .getElementById("profile-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoading();
      const data = await update({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = '/';
      }
    });
  },
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
      <div class="form-container">
        <form id="profile-form">
          <ul class="form-items">
            <li>
              <h1>Profil Anda</h1>
            </li>
            <li>
              <label for="name">Nama</label>
              <input type="name" name="name" id="name" value="${name}" />
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" value="${email}"/>
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>
              <button type="submit" clas="primary">Simpan</button>
            </li>
            </li>
              <button type="button" id="logout-button">Logout</button>
            </li>
          </ul>
        </form>
      </div>
      `
  },
};
export default profile;