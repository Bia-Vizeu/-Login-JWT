document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  const response = await fetch('http://localhost:3000/posts', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (response.ok) {
    const posts = await response.json();
    const container = document.createElement('div');
    posts.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <small>${post.date} | ${post.views} views | ${post.likes} likes</small>
        <hr>
      `;
      container.appendChild(div);
    });
    document.body.appendChild(container);
  } else {
    document.body.innerHTML = '<h2>Você não está autorizado. Faça login novamente.</h2>';
    localStorage.removeItem('token');
    setTimeout(() => window.location.href = 'index.html', 2000);
  }
});