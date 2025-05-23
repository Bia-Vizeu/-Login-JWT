import api from './api.js';

const setUserHeader = user => {
  const name = user.name || user.email || 'Usuário';
  const avatar = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

  document.getElementById('user-name').textContent = name;
  document.getElementById('user-photo').src = avatar;
};

const jwtDecode = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    const payload = token.split(".")[1];
    const user = JSON.parse(atob(payload));

    console.log(user);

    localStorage.setItem("userName", user.name || "Usuário");
    localStorage.setItem("userAvatar", user.avatar || "");
    setUserHeader(user);
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
  }
};

const login = (email, password) => {
  api
    .post("/login", {
      user: email,
      psw: password
    })
    .then(res => {
      localStorage.setItem("token", res.data.token);
      jwtDecode();
      getPosts();
      document.getElementById('message').innerHTML = '<div class="success">Login realizado com sucesso!</div>';
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1200);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('message').innerHTML = '<div class="error">E-mail ou senha inválidos.</div>';
    });
};

const getPosts = () => {
  api
    .get("/posts", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res.data);
      // Aqui você pode fazer algo com os posts, como renderizá-los na tela
    })
    .catch(err => {
      console.error("Erro ao buscar os posts:", err);
    });
};

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      login(email, password);
    });
  }
});
