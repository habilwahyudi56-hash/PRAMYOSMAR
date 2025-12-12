// ========== CONFIG ==========
const ADMIN_PASSWORD = "ADMIN_PASSWORD"; // Ganti sesuai kebutuhan
let isAdmin = false;

// ========== LOADING & PARTICLES ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
    }, 600);
  }, 1500);

  initParticles();
  initSlider();
  checkAdminStatus();
});

// Particle Background — Ringan & Futuristik
function initParticles() {
  const canvas = document.getElementById('particles-bg');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = Math.random() > 0.5 ? '#00f3ff' : '#e040fb';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ========== SLIDER KEGIATAN ==========
function initSlider() {
  const slider = document.getElementById('activity-slider');
  if (!slider) return;

  // Dummy data — bisa diganti via upload admin
  const activities = [
    { title: "Pelatihan Drone Mapping", date: "10 Des 2025", img: "assets/placeholder.jpg" },
    { title: "Hackathon Pramuka", date: "28 Nov 2025", img: "assets/placeholder.jpg" },
    { title: "Eco-Tech Camping", date: "15 Nov 2025", img: "assets/placeholder.jpg" },
    { title: "VR Survival Training", date: "30 Okt 2025", img: "assets/placeholder.jpg" },
  ];

  slider.innerHTML = activities.map(a => `
    <div class="activity-card glass">
      <img src="${a.img}" alt="${a.title}" class="card-img">
      <h3 class="card-title">${a.title}</h3>
      <p class="card-date">${a.date}</p>
    </div>
  `).join('');
}

// ========== ADMIN SYSTEM ==========
function checkAdminStatus() {
  isAdmin = localStorage.getItem('pramyosmar_admin') === 'true';
  updateAdminUI();
}

function loginAdmin() {
  const pass = prompt("Masukkan password admin:");
  if (pass === ADMIN_PASSWORD) {
    localStorage.setItem('pramyosmar_admin', 'true');
    isAdmin = true;
    alert("Login berhasil!");
    updateAdminUI();
  } else if (pass !== null) {
    alert("Password salah!");
  }
}

function logoutAdmin() {
  localStorage.removeItem('pramyosmar_admin');
  isAdmin = false;
  updateAdminUI();
  alert("Logout berhasil.");
}

function updateAdminUI() {
  const adminBtns = document.querySelectorAll('.admin-btn');
  adminBtns.forEach(btn => {
    btn.textContent = isAdmin ? "Logout Admin" : "Login Admin";
    btn.onclick = isAdmin ? logoutAdmin : loginAdmin;
  });

  // Tampilkan/sembunyikan form upload
  const forms = document.querySelectorAll('.upload-form');
  forms.forEach(form => {
    form.style.display = isAdmin ? 'block' : 'none';
  });
}

// ========== UPLOAD DUMMY (simpan ke localStorage) ==========
function uploadData(type, data) {
  if (!isAdmin) return alert("Login dulu sebagai admin!");

  const key = `pramyosmar_${type}`;
  let items = JSON.parse(localStorage.getItem(key) || '[]');
  items.push({ ...data, id: Date.now() });
  localStorage.setItem(key, JSON.stringify(items));
  alert(`${type} berhasil diupload (simulasi).`);
  location.reload(); // refresh UI
}

// ========== HALAMAN KHUSUS ==========
// Berita, Kegiatan, dll — dinamis berdasarkan localStorage
function renderList(type, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = JSON.parse(localStorage.getItem(`pramyosmar_${type}`) || '[]');
  container.innerHTML = items.length ? items.map(item => `
    <div class="glass card" style="margin-bottom:1.5rem; padding:1.5rem;">
      <h3>${item.title || item.nama || 'Tanpa Judul'}</h3>
      <p><small>${item.date || item.tanggal || ''}</small></p>
      <p>${item.description || item.isi || ''}</p>
      ${item.image ? `<img src="${item.image}" style="max-width:100%; border-radius:8px; margin-top:1rem;">` : ''}
      ${item.file ? `<a href="${item.file}" target="_blank" class="neon-border" style="display:inline-block; margin-top:0.5rem; padding:0.4rem 1rem;">📄 Buka File</a>` : ''}
    </div>
  `).join('') : `<p class="glow">Belum ada data ${type}.</p>`;
}

// Panggil saat load halaman khusus
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('berita.html')) {
    renderList('berita', 'berita-list');
  } else if (window.location.pathname.includes('kegiatan.html')) {
    renderList('kegiatan', 'kegiatan-list');
  } else if (window.location.pathname.includes('materi.html')) {
    renderList('materi', 'materi-list');
  } else if (window.location.pathname.includes('ujian.html')) {
    renderList('ujian', 'ujian-list');
  } else if (window.location.pathname.includes('struktur.html')) {
    renderList('struktur', 'struktur-list');
  }
});

// ========== UTILITAS ==========
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Preview gambar setelah dipilih
function previewImage(input, previewId, labelId) {
  const preview = document.getElementById(previewId);
  const label = document.getElementById(labelId);
  const img = preview.querySelector('img');

  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (!file.type.match('image.*')) {
      alert("❌ Hanya file gambar (JPG/PNG) yang diizinkan.");
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      img.src = e.target.result;
      preview.style.display = 'block';
      label.textContent = file.name;
    };
    reader.readAsDataURL(file);
  }
}

// Konversi file ke base64 (digunakan saat upload)
function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
