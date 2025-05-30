import api from './api.js';

const setUserHeader = user => {
  document.getElementById('user-name').textContent = user.name || user.email || 'Usuário';
  document.getElementById('user-photo').src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}`;
};

const jwtDecode = () => {
  const token = localStorage.getItem('token').split('.')[1];
  const user = JSON.parse(atob(token));
  setUserHeader(user);
  console.log(user);
}

if (window.location.pathname.includes('home.html')) {
  jwtDecode();
}

const getPosts = () =>{
  api
  .get ('posts',{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    })
  .then (res =>{
    console.log(res);
  })
  .catch(err => {
    console.log(err)
  })
}


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (email === 'usuario@email.com' && password === '9692') {
      messageDiv.innerHTML = '<div class="success">Login realizado com sucesso!</div>';
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1200);
    } else {
      messageDiv.innerHTML = '<div class="error">E-mail ou senha inválidos.</div>';
    }
  });
});
