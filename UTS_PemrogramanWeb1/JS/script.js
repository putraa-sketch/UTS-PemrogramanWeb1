// Fungsi untuk menyimpan data login ke sessionStorage
function saveLoginData(email, nama, role) {
  sessionStorage.setItem("userEmail", email);
  sessionStorage.setItem("userName", nama);
  sessionStorage.setItem("userRole", role);
  sessionStorage.setItem("isLoggedIn", "true");
}

// Fungsi untuk mendapatkan data login
function getLoginData() {
  return {
    email: sessionStorage.getItem("userEmail"),
    nama: sessionStorage.getItem("userName"),
    role: sessionStorage.getItem("userRole"),
    isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true",
  };
}

// Fungsi untuk logout
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// Fungsi untuk cek apakah user sudah login
function checkLogin() {
  const loginData = getLoginData();
  if (!loginData.isLoggedIn) {
    window.location.href = "index.html";
  }
  return loginData;
}

// Fungsi untuk greeting berdasarkan waktu
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) {
    return "Selamat Pagi";
  } else if (hour >= 11 && hour < 15) {
    return "Selamat Siang";
  } else if (hour >= 15 && hour < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
}

// Fungsi untuk convert string harga ke angka
function parseHarga(hargaStr) {
  // Hapus "Rp" dan "." lalu convert ke number
  return parseInt(hargaStr.replace(/Rp\s?/g, "").replace(/\./g, ""));
}

// Fungsi untuk format rupiah
function formatRupiah(angka) {
  // Jika input sudah string dengan format Rp, return aja
  if (typeof angka === "string" && angka.includes("Rp")) {
    return angka;
  }

  // Jika string tanpa Rp, convert dulu
  if (typeof angka === "string") {
    angka = parseInt(angka.replace(/\./g, ""));
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

// Fungsi untuk format tanggal
function formatTanggal(tanggal) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(tanggal).toLocaleDateString("id-ID", options);
}

// Fungsi untuk membuat modal
function createModal(title, content) {
  const modalHTML = `
        <div class="modal-overlay" id="customModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <span class="modal-close" onclick="closeModal()">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// Fungsi untuk menutup modal
function closeModal() {
  const modal = document.getElementById("customModal");
  if (modal) {
    modal.remove();
  }
}

// Fungsi untuk show alert
function showAlert(message, type = "info") {
  const alertHTML = `
        <div class="alert alert-${type}" id="customAlert">
            ${message}
            <button class="alert-close" onclick="closeAlert()">&times;</button>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", alertHTML);

  // Auto close after 3 seconds
  setTimeout(() => {
    closeAlert();
  }, 3000);
}

// Fungsi untuk menutup alert
function closeAlert() {
  const alert = document.getElementById("customAlert");
  if (alert) {
    alert.classList.add("fade-out");
    setTimeout(() => alert.remove(), 300);
  }
}

// Fungsi untuk validasi email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Fungsi untuk validasi form kosong
function validateRequired(value) {
  return value.trim() !== "";
}

// Fungsi untuk menyimpan keranjang
function saveCart(cartItems) {
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
}

// Fungsi untuk mendapatkan keranjang
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Fungsi untuk menghitung total keranjang
function calculateCartTotal(cart) {
  return cart.reduce((total, item) => {
    const harga = parseHarga(item.harga);
    return total + harga * item.qty;
  }, 0);
}
