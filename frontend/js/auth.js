const USER_API = 'http://localhost:3001/api/users';

function register() {
  fetch(`${USER_API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      email: document.getElementById('regEmail').value,
      password: document.getElementById('regPassword').value,
      role: document.getElementById('role').value
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}

function login() {
  fetch(`${USER_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('token', data.token);
    window.location.href = 'events.html';
  });
}
