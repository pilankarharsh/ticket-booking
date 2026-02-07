const USER_API = 'http://localhost:3001/api/users';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

fetch(`${USER_API}/profile`, {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
  .then(res => {
    if (!res.ok) {
      throw new Error('Unauthorized');
    }
    return res.json();
  })
  .then(user => {
    // Avatar initials
    const initials = user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();

    // Update UI (safe checks)
    const avatar = document.querySelector('.user-avatar-img');
    if (avatar) avatar.innerText = initials;

    const profileName = document.getElementById('profileName');
    if (profileName) profileName.innerText = user.name;

    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) profileEmail.innerText = user.email;
  })
  .catch(() => {
    // Token invalid or expired
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
