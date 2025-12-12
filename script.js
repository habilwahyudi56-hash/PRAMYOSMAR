// ========== CONFIG ==========
const ADMIN_PASSWORD = "ADMIN_PASSWORD"; // Ganti sesuai kebutuhan
let isAdmin = false;

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  isAdmin = localStorage.getItem('pramyosmar_admin') === 'true';
  updateAdminUI();
});

// ========== ADMIN ==========
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
  const btn = document.getElementById('admin-btn');
  if (!btn) return;

  btn.textContent = isAdmin ? "Logout Admin" : "Login Admin";
  btn.onclick = isAdmin ? logoutAdmin : loginAdmin;

  const form = document.getElementById('upload-form');
  if (form) form.style.display = isAdmin ? 'block' : 'none';
}
