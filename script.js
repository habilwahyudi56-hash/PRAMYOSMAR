// ───────────────────────────────────────
// ✅ PRAMYOSMAR — script.js FULL
// Fitur: Admin, Upload (file picker), Render, Routing Simulasi
// ───────────────────────────────────────

// 🔐 Konfigurasi Admin
const ADMIN_PASSWORD = "ADMIN_PASSWORD"; // Ganti sesuai kebutuhan
let isAdmin = localStorage.getItem('pramyosmar_admin') === 'true';

// 🚀 Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Cek status admin
  isAdmin = localStorage.getItem('pramyosmar_admin') === 'true';
  updateAdminUI();

  // Jika ada halaman yang butuh render khusus
  const path = window.location.pathname.split('/').pop();

  if (path === 'berita.html') {
    renderList('berita', 'berita-list');
  } else if (path === 'kegiatan.html') {
    renderKegiatanList(); // sudah ada di kegiatan.html local script
  } else if (path === 'materi.html') {
    renderList('materi', 'materi-list');
  } else if (path === 'ujian.html') {
    renderList('ujian', 'ujian-list');
    renderList('struktur', 'struktur-list');
  } else if (path === 'struktur.html') {
    renderList('struktur', 'struktur-list');
  }
});

// ──────── 🔐 SISTEM ADMIN ────────
function loginAdmin() {
  const pass = prompt("🔐 Masukkan password admin:");
  if (pass === ADMIN_PASSWORD) {
    localStorage.setItem('pramyosmar_admin', 'true');
    isAdmin = true;
    alert("✅ Login berhasil!");
    updateAdminUI();
  } else if (pass !== null) {
    alert("❌ Password salah! Coba lagi.");
  }
}

function logoutAdmin() {
  if (confirm("Yakin ingin logout?")) {
    localStorage.removeItem('pramyosmar_admin');
    isAdmin = false;
    updateAdminUI();
    alert("✅ Logout berhasil.");
  }
}

function updateAdminUI() {
  // Update semua tombol admin di halaman
  document.querySelectorAll('.admin-btn').forEach(btn => {
    btn.textContent = isAdmin ? "Logout Admin" : "Login Admin";
    btn.onclick = isAdmin ? logoutAdmin : loginAdmin;
  });

  // Tampilkan/sembunyikan semua form upload
  document.querySelectorAll('.upload-form').forEach(form => {
    form.style.display = isAdmin ? 'block' : 'none';
  });
}

// ──────── 📤 UPLOAD UMUM (base64) ────────
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

// ──────── 📋 RENDER LIST UMUM ────────
function renderList(type, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = JSON.parse(localStorage.getItem(`pramyosmar_${type}`) || '[]');
  
  if (items.length === 0) {
    container.innerHTML = `<p class="glow">Belum ada data ${type}.</p>`;
    return;
  }

  // Template berbeda tergantung jenis
  const html = items.map(item => {
    let imgTag = '';
    if (item.image) {
      imgTag = `<img src="${item.image}" alt="${item.title || item.nama}" class="card-img">`;
    } else if (item.file && (item.file.endsWith('.jpg') || item.file.endsWith('.png'))) {
      imgTag = `<img src="${item.file}" alt="file" class="card-img">`;
    }

    let fileType = '';
    if (item.file) {
      if (item.file.endsWith('.pdf')) fileType = '📄 PDF';
      else if (item.file.endsWith('.jpg') || item.file.endsWith('.png')) fileType = '🖼️ Gambar';
    }

    return `
      <div class="glass card" style="margin-bottom:1.5rem; padding:1.5rem;">
        <h3>${item.title || item.nama || 'Tanpa Judul'}</h3>
        <p><small>${item.date || item.tanggal || ''}</small></p>
        <p>${item.isi || item.description || item.catatan || ''}</p>
        ${imgTag}
        ${item.jabatan ? `<p><strong>${item.jabatan}</strong></p>` : ''}
        ${fileType ? `<p>${fileType}</p>` : ''}
        ${item.file ? `<a href="${item.file}" target="_blank" class="neon-border" style="display:inline-block; margin-top:0.5rem; padding:0.4rem 1rem;">Buka File</a>` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// ──────── 🧭 UTILITAS ────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ──────── 📤 UPLOAD SPESIFIK (bisa dipanggil dari halaman mana saja) ────────

// Contoh: upload berita (dipanggil dari berita.html)
function uploadBerita(judul, tanggal, isi, fileInput) {
  if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");
  if (!judul || !isi) return alert("❌ Judul dan isi wajib diisi!");

  (async () => {
    let imageData = '';
    if (fileInput?.files?.[0]) {
      try {
        imageData = await getBase64FromFile(fileInput.files[0]);
      } catch (e) {
        return alert("❌ Gagal memuat gambar.");
      }
    }

    const data = { id: Date.now(), title: judul, date: tanggal, isi, image: imageData };
    saveData('berita', data);
    alert("✅ Berita berhasil diupload!");
  })();
}

// Upload kegiatan (sudah ada di kegiatan.html — ini versi reusable)
function uploadKegiatan2(judul, tanggal, desc, fileInput) {
  if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");
  if (!judul || !desc) return alert("❌ Judul dan deskripsi wajib diisi!");

  (async () => {
    let imageData = '';
    if (fileInput?.files?.[0]) {
      try {
        imageData = await getBase64FromFile(fileInput.files[0]);
      } catch (e) {
        return alert("❌ Gagal memuat gambar.");
      }
    }

    const data = { id: Date.now(), title: judul, tanggal, description: desc, image: imageData };
    saveData('kegiatan', data);
    alert("✅ Kegiatan berhasil diupload!");
  })();
}

// Upload struktur (nama, jabatan, foto)
function uploadStruktur(nama, jabatan, fileInput) {
  if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");
  if (!nama || !jabatan) return alert("❌ Nama dan jabatan wajib diisi!");

  (async () => {
    let imageData = '';
    if (fileInput?.files?.[0]) {
      try {
        imageData = await getBase64FromFile(fileInput.files[0]);
      } catch (e) {
        return alert("❌ Gagal memuat foto.");
      }
    }

    const data = { id: Date.now(), nama, jabatan, image: imageData };
    saveData('struktur', data);
    alert("✅ Anggota berhasil ditambahkan!");
  })();
}

// Upload materi/ujian (judul, isi/file)
function uploadMateri(judul, isi, fileInput, jenis = 'teks') {
  if (!isAdmin) return alert("🔒 Login sebagai admin dulu!");
  if (!judul || !isi) return alert("❌ Judul dan isi/file wajib diisi!");

  (async () => {
    let fileData = isi;
    if (fileInput?.files?.[0]) {
      try {
        fileData = await getBase64FromFile(fileInput.files[0]);
      } catch (e) {
        return alert("❌ Gagal memuat file.");
      }
    }

    const data = { 
      id: Date.now(), 
      title: judul, 
      isi: jenis === 'teks' ? isi : '', 
      file: fileData,
      jenis 
    };
    saveData(jenis === 'soal' ? 'ujian' : 'materi', data);
    alert(`✅ ${jenis === 'soal' ? 'Soal' : 'Materi'} berhasil diupload!`);
  })();
}

// ──────── 💾 SIMPAN KE LOCALSTORAGE ────────
function saveData(type, data) {
  const key = `pramyosmar_${type}`;
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.unshift(data);
  localStorage.setItem(key, JSON.stringify(list));
  
  // Refresh render jika di halaman yang sesuai
  if (window.location.pathname.includes(type)) {
    if (type === 'kegiatan') {
      if (typeof renderKegiatanList === 'function') renderKegiatanList();
    } else {
      renderList(type, `${type}-list`);
    }
  }
}
