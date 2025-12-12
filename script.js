// ─────────────────────────────────────────────────────
// ✅ PRAMYOSMAR — script.js FULL (JSONBin Version)
// BIN ID: 693c1f52ae596e708f95272f
// Fitur: Upload ke server, multi-device, aman
// ─────────────────────────────────────────────────────

// 🔑 Konfigurasi JSONBin (GANTI SECRET KEY SESUAI AKUN ANDA)
const BIN_ID = "693c1f52ae596e708f95272f";
// 💡 DAPATKAN SECRET KEY DI: https://jsonbin.io/693c1f52ae596e708f95272f → Security → Enable Secret Key → Copy
const BIN_SECRET_KEY = "YOUR_SECRET_KEY_HERE"; // ← GANTI DENGAN SECRET KEY ANDA!

// 🔐 Password Admin
const ADMIN_PASSWORD = "ADMIN_PASSWORD"; // ← Ganti jadi password Anda!
let isAdmin = false;

// 🚀 Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  // Coba baca dari server saat load
  const path = window.location.pathname.split('/').pop();
  
  if (path === 'kegiatan.html') {
    renderKegiatanFromServer();
  } else if (path === 'berita.html') {
    renderListFromServer('berita', 'berita-list');
  } else if (path === 'materi.html') {
    renderListFromServer('materi', 'materi-list');
  } else if (path === 'ujian.html') {
    renderListFromServer('ujian', 'ujian-list');
    renderListFromServer('struktur', 'struktur-list');
  }

  // Cek login admin
  updateAdminUI();
});

// ──────── 🔐 ADMIN ────────
function loginAdmin() {
  const pass = prompt("🔐 Masukkan password admin:");
  if (pass === ADMIN_PASSWORD) {
    isAdmin = true;
    alert("✅ Login berhasil!");
    updateAdminUI();
  } else if (pass !== null) {
    alert("❌ Password salah!");
  }
}

function logoutAdmin() {
  if (confirm("Yakin logout?")) {
    isAdmin = false;
    updateAdminUI();
    alert("✅ Logout berhasil.");
  }
}

function updateAdminUI() {
  document.querySelectorAll('.admin-btn').forEach(btn => {
    btn.textContent = isAdmin ? "Logout Admin" : "Login Admin";
    btn.onclick = isAdmin ? logoutAdmin : loginAdmin;
  });

  document.querySelectorAll('.upload-form').forEach(form => {
    form.style.display = isAdmin ? 'block' : 'none';
  });
}

// ──────── 📤 UTILITAS UPLOAD ────────
function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function previewImage(input, previewId, labelId) {
  const preview = document.getElementById(previewId);
  const label = document.getElementById(labelId);
  const img = preview?.querySelector('img');

  if (!input.files?.[0] || !img) return;

  const file = input.files[0];
  if (!file.type.match('image.*')) {
    alert("❌ Hanya file gambar (JPG/PNG/WebP) yang diizinkan.");
    input.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    img.src = e.target.result;
    if (preview) preview.style.display = 'block';
    if (label) label.textContent = `✓ ${file.name}`;
  };
  reader.readAsDataURL(file);
}

// ──────── ☁️ SIMPAN KE JSONBIN SERVER ────────
async function saveToServer(type, newData) {
  if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");

  try {
    // Ambil data lama dulu
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": BIN_SECRET_KEY }
    });
    
    if (!getRes.ok) throw new Error("Gagal baca data lama");
    
    const oldData = await getRes.json();
    const current = oldData.record || {
      kegiatan: [], berita: [], materi: [], ujian: [], struktur: []
    };

    // Tambah data baru di awal
    if (!current[type]) current[type] = [];
    current[type].unshift(newData);

    // Simpan ulang
    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": BIN_SECRET_KEY,
        "X-Bin-Private": "true"
      },
      body: JSON.stringify(current)
    });

    if (putRes.ok) {
      alert("✅ Data berhasil disimpan ke server!\nSemua pengguna bisa melihatnya.");
      
      // Refresh tampilan
      if (type === 'kegiatan') {
        renderKegiatanFromServer();
      } else {
        renderListFromServer(type, `${type}-list`);
      }
    } else {
      const err = await putRes.json();
      throw new Error(err.message || "Gagal update server");
    }
  } catch (err) {
    alert(`❌ Gagal simpan ke server:\n${err.message}`);
  }
}

// ──────── 📋 RENDER DARI SERVER ────────
async function renderListFromServer(type, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": BIN_SECRET_KEY }
    });
    
    if (!response.ok) throw new Error("Gagal koneksi ke server");
    
    const data = await response.json();
    const items = (data.record?.[type] || []).slice(0, 20); // max 20

    if (items.length === 0) {
      container.innerHTML = `<p class="glow">Belum ada data ${type}.</p>`;
      return;
    }

    const html = items.map((item, i) => {
      let imgTag = '';
      if (item.image) {
        imgTag = `<img src="${item.image}" alt="${item.title || item.nama}" class="card-img" style="max-width:100%; border-radius:8px; margin:0.5rem 0;">`;
      }

      return `
        <div class="glass card" style="margin-bottom:1.5rem; padding:1.5rem;">
          <h3>${item.title || item.nama || 'Tanpa Judul'}</h3>
          <p><small>${item.date || item.tanggal || ''}</small></p>
          <p>${item.description || item.isi || item.catatan || ''}</p>
          ${imgTag}
          ${item.jabatan ? `<p><strong>${item.jabatan}</strong></p>` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<p class="glow">❌ Gagal muat data: ${err.message}</p>`;
  }
}

async function renderKegiatanFromServer() {
  const container = document.getElementById('kegiatan-list');
  if (!container) return;

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": BIN_SECRET_KEY }
    });
    
    if (!response.ok) throw new Error("Gagal koneksi ke server");
    
    const data = await response.json();
    const kegiatan = (data.record?.kegiatan || []).slice(0, 30);

    if (kegiatan.length === 0) {
      container.innerHTML = `<p class="glow" style="grid-column:1/-1; text-align:center;">Belum ada kegiatan.</p>`;
      return;
    }

    container.innerHTML = kegiatan.map((k, i) => `
      <div class="kegiatan-card glass">
        <img 
          src="${k.image || 'image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%22 y=%2250%22 font-size=%2212%22 fill=%22%23555%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>NO IMAGE</text></svg>'}" 
          alt="${k.title}" 
          class="kegiatan-img"
          onclick="openDetail(${i})" <!-- Gunakan index untuk demo sederhana -->
        >
        <div class="kegiatan-info">
          <h3 class="kegiatan-title">${k.title}</h3>
          <p class="kegiatan-date">${k.tanggal || '—'}</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p class="glow">❌ Gagal muat kegiatan: ${err.message}</p>`;
  }
}

// ──────── 🧭 UTILITAS ────────
function openDetail(index) {
  localStorage.setItem('pramyosmar_kegiatan_index', index);
  window.location.href = 'kegiatan-detail.html';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ──────── 📤 UPLOAD FUNGSI KHUSUS ────────

// 🗓️ Upload Kegiatan
async function uploadKegiatan() {
  if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");

  const judul = document.getElementById('keg-judul')?.value.trim();
  const tanggal = document.getElementById('keg-tgl')?.value;
  const desc = document.getElementById('keg-desc')?.value.trim();
  const fileInput = document.getElementById('keg-foto-input');

  if (!judul || !desc) return alert("❌ Judul dan deskripsi wajib diisi!");

  let imageData = '';
  if (fileInput?.files?.[0]) {
    try {
      imageData = await getBase64FromFile(fileInput.files[0]);
    } catch (e) {
      return alert("❌ Gagal memuat gambar.");
    }
  }

  const data = { id: Date.now(), title: judul, tanggal, description: desc, image: imageData };
  await saveToServer('kegiatan', data);

  // Reset form
  document.getElementById('keg-judul').value = '';
  document.getElementById('keg-tgl').value = '';
  document.getElementById('keg-desc').value = '';
  if (fileInput) fileInput.value = '';
  const preview = document.getElementById('keg-foto-preview');
  if (preview) preview.style.display = 'none';
  const label = document.getElementById('keg-foto-label');
  if (label) label.textContent = 'Pilih file gambar (JPG/PNG)';
}

// 📰 Upload Berita (contoh)
async function uploadBerita() {
  if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");
  
  const judul = document.getElementById('berita-judul')?.value.trim();
  const tanggal = document.getElementById('berita-tanggal')?.value;
  const isi = document.getElementById('berita-isi')?.value.trim();
  const fileInput = document.getElementById('berita-foto-input');

  if (!judul || !isi) return alert("❌ Judul dan isi wajib diisi!");

  let imageData = '';
  if (fileInput?.files?.[0]) {
    try {
      imageData = await getBase64FromFile(fileInput.files[0]);
    } catch (e) {
      return alert("❌ Gagal memuat gambar.");
    }
  }

  const data = { id: Date.now(), title: judul, date: tanggal, isi, image: imageData };
  await saveToServer('berita', data);
}
