// ─────────────────────────────────────────────────────
// ✅ PRAMYOSMAR — script.js (Gist Manual Version)
// ─────────────────────────────────────────────────────

// 🔑 GANTI DENGAN GIST ID ANDA (setelah buat gist)
const GIST_ID = "ab03fa48bf01564b8781111e0de1d17f"; // ← GANTI DENGAN GIST ID ANDA!

// 🔐 Password Admin
const ADMIN_PASSWORD = "ADMIN_PASSWORD";
let isAdmin = false;

// 🚀 Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();
  if (path === 'kegiatan.html') {
    renderKegiatanFromGist();
  }
  updateAdminUI();
});

// 🔐 Admin
function loginAdmin() {
  const pass = prompt("🔐 Masukkan password admin:");
  isAdmin = pass === ADMIN_PASSWORD;
  updateAdminUI();
  if (isAdmin) alert("✅ Login berhasil!");
}
function logoutAdmin() { 
  isAdmin = false; 
  updateAdminUI(); 
  alert("✅ Logout berhasil.");
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

// 📤 File → base64
function getBase64FromFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => console.error("Error:", error);
  });
}

// 👁️ Preview gambar
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

// 🌐 Baca dari Gist (publik)
async function renderKegiatanFromGist() {
  const container = document.getElementById('kegiatan-list');
  if (!container) return;

  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    if (!response.ok) throw new Error("Gagal mengambil data dari Gist");
    
    const gist = await response.json();
    const content = gist.files['pramyosmar-data.json']?.content;
    if (!content) throw new Error("File 'pramyosmar-data.json' tidak ditemukan di Gist");

    const data = JSON.parse(content);
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
          onclick="openDetail(${i})"
        >
        <div class="kegiatan-info">
          <h3 class="kegiatan-title">${k.title}</h3>
          <p class="kegiatan-date">${k.tanggal || '—'}</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p class="glow">❌ Gagal memuat kegiatan: ${err.message}</p>`;
  }
}

// 🗓️ Upload Kegiatan (simpan ke localStorage + tampilkan untuk update Gist)
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

  // Ambil data lama dari Gist (simulasi: baca dari localStorage dulu)
  const oldData = JSON.parse(localStorage.getItem('pramyosmar_gist_cache') || '{"kegiatan":[],"berita":[],"materi":[],"ujian":[],"struktur":[]}');
  oldData.kegiatan.unshift({
    id: Date.now(),
    title: judul,
    tanggal: tanggal,
    description: desc,
    image: imageData
  });

  // Simpan sementara ke localStorage
  localStorage.setItem('pramyosmar_gist_cache', JSON.stringify(oldData));

  // Tampilkan data untuk update Gist manual
  const updateData = {
    kegiatan: oldData.kegiatan,
    berita: oldData.berita,
    materi: oldData.materi,
    ujian: oldData.ujian,
    struktur: oldData.struktur
  };

  const jsonStr = JSON.stringify(updateData, null, 2);
  prompt("📋 COPY SEMUA TEKS DI BAWAH → paste ke file 'pramyosmar-data.json' di Gist Anda:", jsonStr);

  // Refresh tampilan lokal
  renderKegiatanFromGist();
}

// 🧭 Utilitas
function openDetail(index) {
  localStorage.setItem('pramyosmar_kegiatan_index', index);
  window.location.href = 'kegiatan-detail.html';
}
