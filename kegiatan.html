<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Kegiatan — PRAMYOSMAR</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    .kegiatan-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.8rem;
      margin-top: 2rem;
    }
    .kegiatan-card {
      background: var(--glass-bg);
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s;
    }
    .kegiatan-card:hover {
      transform: translateY(-6px);
    }
    .kegiatan-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      cursor: pointer;
    }
    .kegiatan-info {
      padding: 1.2rem;
    }
    .kegiatan-title {
      font-size: 1.2rem;
      margin: 0 0 0.5rem;
      color: white;
    }
    .kegiatan-date {
      font-size: 0.85rem;
      color: var(--neon-blue);
    }
    .file-upload-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      border: 2px dashed var(--glass-border);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s;
      color: #aaa;
    }
    .file-upload-area:hover {
      border-color: var(--neon-blue);
      background: rgba(0, 243, 255, 0.05);
      color: var(--neon-blue);
    }
    .file-upload-area svg {
      width: 28px; height: 28px; margin-bottom: 0.5rem;
    }
    .image-preview img {
      max-height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo-container">
      <div class="logo-glow">
        <svg class="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#00f3ff" stroke-width="2"/>
          <path d="M30,50 L45,35 L45,65 Z" fill="#e040fb"/>
          <path d="M70,50 L55,35 L55,65 Z" fill="#00f3ff"/>
        </svg>
      </div>
      <h1 class="org-title">PRAMYOSMAR</h1>
      <p class="tagline">Pramuka Muda Yogyakarta Mandiri, Solid, dan Berakhlak</p>
    </div>
    <nav class="nav">
      <a href="index.html">Beranda</a>
      <a href="berita.html">Berita</a>
      <a href="kegiatan.html" class="active">Kegiatan</a>
      <a href="materi.html">Materi</a>
      <a href="ujian.html">Ujian & Struktur</a>
      <a href="kontak.html">Kontak</a>
    </nav>
  </header>

  <main class="page-content">
    <div class="container">
      <h1 class="page-title glow">🗓️ Daftar Kegiatan</h1>

      <!-- Admin Upload -->
      <div class="admin-section">
        <button class="admin-btn" id="admin-btn"></button>
        <div class="upload-form glass" id="upload-form">
          <h3>➕ Upload Kegiatan Baru</h3>
          
          <div class="form-group">
            <label>Judul Kegiatan</label>
            <input type="text" id="keg-judul" placeholder="Contoh: Drone Mapping Camp">
          </div>
          
          <div class="form-group">
            <label>Tanggal</label>
            <input type="date" id="keg-tgl">
          </div>
          
          <div class="form-group">
            <label>Deskripsi Lengkap</label>
            <textarea id="keg-desc" rows="4" placeholder="Deskripsi detail untuk halaman lengkap..."></textarea>
          </div>
          
          <!-- 🖼️ File Upload (Galeri) -->
          <div class="form-group">
            <label for="keg-foto-input">Upload Foto Kegiatan</label>
            <div class="file-upload-area glass" onclick="document.getElementById('keg-foto-input').click()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span id="keg-foto-label">Pilih file gambar (JPG/PNG)</span>
              <input 
                type="file" 
                id="keg-foto-input" 
                accept="image/jpeg,image/png,image/webp"
                style="display:none"
              >
            </div>
            <div id="keg-foto-preview" class="image-preview" style="display:none; margin-top:1rem;">
              <img id="keg-preview-img" src="" alt="Preview" style="max-width:100%; border-radius:8px;">
            </div>
          </div>

          <button class="submit-btn" onclick="uploadKegiatan()">Upload Kegiatan</button>
        </div>
      </div>

      <!-- Daftar Kegiatan -->
      <div class="kegiatan-grid" id="kegiatan-list">
        <p class="glow" style="grid-column:1/-1; text-align:center;">Memuat...</p>
      </div>
    </div>
  </main>

  <script>
    // 🔐 Konfigurasi
    const ADMIN_PASSWORD = "ADMIN_PASSWORD";
    let isAdmin = false;

    // 🚀 Inisialisasi
    document.addEventListener('DOMContentLoaded', () => {
      isAdmin = localStorage.getItem('pramyosmar_admin') === 'true';
      updateAdminUI();
      renderKegiatan();
    });

    // 🔐 Admin
    function loginAdmin() {
      const pass = prompt("🔐 Masukkan password admin:");
      if (pass === ADMIN_PASSWORD) {
        localStorage.setItem('pramyosmar_admin', 'true');
        isAdmin = true;
        alert("✅ Login berhasil!");
        updateAdminUI();
      } else if (pass !== null) {
        alert("❌ Password salah!");
      }
    }
    function logoutAdmin() {
      if (confirm("Yakin logout?")) {
        localStorage.removeItem('pramyosmar_admin');
        isAdmin = false;
        updateAdminUI();
        alert("✅ Logout berhasil.");
      }
    }
    function updateAdminUI() {
      document.getElementById('admin-btn').textContent = isAdmin ? "Logout Admin" : "Login Admin";
      document.getElementById('admin-btn').onclick = isAdmin ? logoutAdmin : loginAdmin;
      document.getElementById('upload-form').style.display = isAdmin ? 'block' : 'none';
    }

    // 👁️ Preview Gambar
    document.getElementById('keg-foto-input').addEventListener('change', function(e) {
      const file = e.target.files[0];
      const preview = document.getElementById('keg-foto-preview');
      const img = document.getElementById('keg-preview-img');
      const label = document.getElementById('keg-foto-label');

      if (file) {
        if (!file.type.match('image.*')) {
          alert("❌ Hanya file gambar (JPG/PNG) yang diizinkan.");
          this.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
          img.src = event.target.result;
          preview.style.display = 'block';
          label.textContent = `✓ ${file.name}`;
        };
        reader.readAsDataURL(file);
      }
    });

    // 🗓️ Upload Kegiatan — Versi Fix Terbaru
    function uploadKegiatan() {
      if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");

      const judul = document.getElementById('keg-judul').value.trim();
      const tanggal = document.getElementById('keg-tgl').value;
      const desc = document.getElementById('keg-desc').value.trim();

      if (!judul || !desc) return alert("❌ Judul dan deskripsi wajib diisi!");

      const fileInput = document.getElementById('keg-foto-input');
      const imageData = document.getElementById('keg-preview-img').src;

      // Siapkan data
      const newData = {
        id: Date.now(),
        title: judul,
        tanggal: tanggal,
        description: desc,
        image: imageData
      };

      // Ambil data lama
      let allData = JSON.parse(localStorage.getItem('pramyosmar_data') || '{"kegiatan":[],"berita":[],"materi":[],"ujian":[],"struktur":[]}');
      allData.kegiatan.unshift(newData);
      
      // Simpan ke localStorage
      localStorage.setItem('pramyosmar_data', JSON.stringify(allData));
      
      // Tampilkan untuk copy-paste ke Gist
      const jsonStr = JSON.stringify(allData, null, 2);
      alert("✅ Kegiatan tersimpan lokal!\n📋 Salin data di bawah → paste ke file 'pramyosmar-data.json' di Gist Anda:");
      prompt("📋 COPY SEMUA TEKS INI → paste ke Gist:", jsonStr);
      
      // Reset form
      document.getElementById('keg-judul').value = '';
      document.getElementById('keg-tgl').value = '';
      document.getElementById('keg-desc').value = '';
      document.getElementById('keg-foto-input').value = '';
      document.getElementById('keg-foto-preview').style.display = 'none';
      document.getElementById('keg-foto-label').textContent = 'Pilih file gambar (JPG/PNG)';
      
      // Render ulang
      renderKegiatan();
    }

    // 📋 Render Kegiatan
    function renderKegiatan() {
      const container = document.getElementById('kegiatan-list');
      const data = JSON.parse(localStorage.getItem('pramyosmar_data') || '{"kegiatan":[]}');
      const kegiatan = data.kegiatan || [];

      if (kegiatan.length === 0) {
        container.innerHTML = `<p class="glow" style="grid-column:1/-1; text-align:center;">Belum ada kegiatan.</p>`;
        return;
      }

      container.innerHTML = kegiatan.map((k, i) => `
        <div class="kegiatan-card glass">
          <img 
            src="${k.image || 'https://via.placeholder.com/300x200/1a1a2e/555?text=NO+IMAGE'}" 
            alt="${k.title}" 
            class="kegiatan-img"
            onclick="alert('Fitur detail belum diaktifkan.\\nUntuk sekarang, data disimpan lokal.')"
          >
          <div class="kegiatan-info">
            <h3 class="kegiatan-title">${k.title}</h3>
            <p class="kegiatan-date">${k.tanggal || '—'}</p>
          </div>
        </div>
      `).join('');
    }
  </script>
</body>
</html>
