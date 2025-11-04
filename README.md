# UTS Pemrograman Web 1: Aplikasi Pemesanan Buku Online

## Informasi
- **Nama**: Abdi Putra Perdana
- **NIM**: 312410426
- **Kelas**: TI 24 A3
- **Mata Kuliah**: Pemrograman Web 1

## Deskripsi Project
Aplikasi web sederhana untuk pemesanan buku pada sebuah toko online. Project ini merupakan tugas UTS yang berfokus pada proses front-end aplikasi menggunakan HTML, CSS, dan JavaScript murni. Data yang digunakan adalah data dummy dalam format Array JSON yang tersimpan dalam file terpisah.

---

## Halaman 1: Login (index.html)

Halaman autentikasi pengguna dengan validasi input dan modal untuk fitur tambahan.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c5a64356-278a-4b51-b14a-8c56f4b03f3a" />


**Fitur:**
- Input email dan password dengan validasi format
- Alert/pop-up untuk notifikasi error saat login gagal
- Modal box "Lupa Password" dengan form reset password
- Modal box "Daftar" untuk registrasi akun baru
- Info kredensial untuk testing

**Kredensial Testing:**
- `rina@gmail.com` / `rina123` (User)
- `agus@gmail.com` / `agus123` (User)
- `siti@gmail.com` / `siti123` (Admin)

**JavaScript Implementation:**
- Event listener untuk form submission
- Validasi email menggunakan regex
- Pengecekan kredensial dengan array `dataPengguna`
- Modal manipulation untuk Lupa Password dan Daftar
- Session management dengan `sessionStorage`

**Validasi:**
- Format email harus valid
- Field tidak boleh kosong
- Password minimal 6 karakter (pada form daftar)
- Konfirmasi password harus sama

---

## Halaman 2: Dashboard (dashboard.html)

Menu utama aplikasi dengan greeting dinamis dan navigasi ke berbagai fitur.

<img width="1656" height="1156" alt="image" src="https://github.com/user-attachments/assets/dc2c4074-6b0e-4a7f-9970-3c162803303c" />


**Fitur:**
- Greeting dinamis berdasarkan waktu local (Selamat Pagi/Siang/Sore/Malam)
- Display nama user dan role
- Menu navigasi ke:
  - 📦 Katalog Buku (stok.html)
  - 🚚 Tracking Pengiriman (tracking.html)
  - 🛒 Pemesanan (checkout.html)
  - 📊 Laporan Pemesanan (modal)
  - 📜 History Transaksi (modal)
  - 👤 Profil Saya (modal)
- Tombol logout dengan konfirmasi

**JavaScript Implementation:**
```javascript
// Greeting berdasarkan waktu
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Selamat Pagi";
    else if (hour >= 11 && hour < 15) return "Selamat Siang";
    else if (hour >= 15 && hour < 18) return "Selamat Sore";
    else return "Selamat Malam";
}
```

**Modal Laporan:**
- Statistik total transaksi
- Total pendapatan
- Transaksi selesai dan dalam proses
- Tabel transaksi terbaru

**Modal History:**
- Daftar semua transaksi dari `dataTransaksi`
- Status dengan color coding

---

## Halaman 3: Katalog Buku (stok.html)

Menampilkan daftar buku yang tersedia dengan fitur CRUD lengkap.

<img width="1656" height="1476" alt="image" src="https://github.com/user-attachments/assets/69dec377-bb2e-4167-8f1e-fe0e61ca7d3d" />

**Fitur:**
- Tabel katalog buku yang dinamis dari `dataKatalogBuku`
- Search/filter real-time berdasarkan kode, nama, atau jenis barang
- Tombol "Tambah Buku" dengan form modal
- Tombol "Edit" untuk mengubah data buku
- Tombol "Hapus" dengan konfirmasi
- Display cover buku dengan fallback image
- Color coding stok (Hijau: >200, Kuning: >100, Merah: ≤100)

**Struktur Data (data.js):**
```javascript
var dataKatalogBuku = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 548,
        harga: "Rp 180.000",
        cover: "img/pengantar_komunikasi.jpg"
    },
    // ... data lainnya
];
```

**JavaScript Implementation:**
- `renderTabelBuku()`: Render tabel dari array
- `editBuku()`: Edit data dengan modal form
- `hapusBuku()`: Hapus data dengan konfirmasi
- Search dengan event listener `input`
- Validasi duplikat kode barang
- Format harga otomatis dengan `formatRupiah()`

**Validasi Form:**
- Semua field required harus diisi
- Kode barang tidak boleh duplikat
- Stok dan edisi harus berupa angka positif

---

## Halaman 4: Pemesanan (checkout.html)

Halaman untuk melakukan pemesanan buku dengan sistem keranjang belanja.

<img width="1656" height="1317" alt="image" src="https://github.com/user-attachments/assets/c79f34d2-6bf6-4568-8d74-b5b9f48233e9" />


**Fitur:**
- **Daftar Buku:**
  - Display semua buku dari katalog dengan cover
  - Search/filter buku real-time
  - Info stok dengan color coding
  - Tombol "Tambah ke Keranjang"
  
- **Keranjang Belanja:**
  - Daftar item yang dipilih
  - Kontrol quantity (+/- button)
  - Hapus item dari keranjang
  - Hitung total otomatis
  - Tombol "Proses Checkout"

- **Form Checkout (Modal):**
  - Informasi Pemesan (nama, email, telepon, alamat)
  - Informasi Pembayaran (metode, ekspedisi)
  - Ringkasan pesanan dengan total
  - Generate nomor DO otomatis

**JavaScript Implementation:**
```javascript
// Keranjang disimpan di sessionStorage
let keranjang = getCart();

// Fungsi tambah ke keranjang
function tambahKeKeranjang(kodeBarang) {
    const buku = dataKatalogBuku.find(b => b.kodeBarang === kodeBarang);
    // Cek stok tersedia
    // Tambah atau update quantity
    saveCart(keranjang);
    renderKeranjang();
}

// Hitung total
function calculateCartTotal(cart) {
    return cart.reduce((total, item) => {
        return total + parseHarga(item.harga) * item.qty;
    }, 0);
}
```

**Validasi:**
- Email format harus valid
- Semua field required harus diisi
- Quantity tidak boleh melebihi stok
- Keranjang tidak boleh kosong saat checkout

**Success Flow:**
- Generate nomor DO: `202300XX`
- Clear keranjang
- Tampil modal sukses dengan detail pesanan
- Nomor DO bisa digunakan untuk tracking

---

## Halaman 5: Tracking Pengiriman (tracking.html)

Halaman untuk melacak status pengiriman pesanan dengan progress bar dan timeline.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/92af8beb-dc90-46ac-b984-c8cec6f10e60" />


**Fitur:**
- Input nomor Delivery Order
- Tombol "Cari" untuk mencari data
- Display hasil tracking:
  - **Informasi Pemesan**: Nama, nomor DO, total pembayaran
  - **Status Pengiriman**: Progress bar dengan persentase
  - **Detail Ekspedisi**: Ekspedisi, tanggal kirim, jenis paket
  - **Riwayat Pengiriman**: Timeline dengan waktu dan keterangan

**Struktur Data Tracking (data.js):**
```javascript
var dataTracking = {
    "20230012": {
        nomorDO: "20230012",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN"
            },
            // ... riwayat lainnya
        ]
    }
};
```

**JavaScript Implementation:**
```javascript
// Progress berdasarkan status
function getProgress(status) {
    const progressMap = {
        'Dikirim': 100,
        'Dalam Perjalanan': 60,
        'Diproses': 30,
        'Dikemas': 20
    };
    return progressMap[status] || 0;
}

// Color coding status
function getStatusColor(status) {
    const colors = {
        'Dikirim': '#27ae60',
        'Dalam Perjalanan': '#17a2b8',
        'Diproses': '#f39c12',
        'Dikemas': '#ffc107'
    };
    return colors[status] || '#667eea';
}
```

**Progress Bar:**
- Dikirim: 100% (Hijau)
- Dalam Perjalanan: 60% (Biru)
- Diproses: 30% (Kuning)
- Dikemas: 20% (Kuning Muda)

**Timeline Riwayat:**
- Visual timeline dengan dot dan line
- Waktu dan keterangan setiap update
- Last item highlight dengan warna berbeda

**Error Handling:**
- Tampil pesan error jika nomor DO tidak ditemukan
- Smooth scroll ke hasil atau error message

---

## Implementasi Teknis

### HTML Structure
```html
<!-- Semantic HTML5 Elements -->
<header>
    <div class="container">
        <!-- Header content -->
    </div>
</header>

<div class="container">
    <div class="card">
        <!-- Main content -->
    </div>
</div>
```

**Semantic Elements Used:**
- ✅ `<header>` untuk bagian kepala halaman
- ✅ `<form>` untuk semua input form
- ✅ `<table>` untuk data tabular
- ✅ `<div class="card">` untuk content sections
- ✅ Proper label dan input associations

### CSS Architecture

**1. External CSS (css/style.css):**
```css
/* Base Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
}

/* Component Styles */
.card { ... }
.btn { ... }
.modal-overlay { ... }
.alert { ... }
.progress-bar { ... }
```

**2. Internal CSS:**
- Digunakan untuk styling spesifik per halaman
- Contoh: Layout grid pada stok.html

**3. Inline CSS:**
- Digunakan untuk styling dinamis via JavaScript
- Contoh: Progress bar width, color status

**Design Patterns:**
- Gradient background untuk visual menarik
- Box shadow untuk depth
- Border radius untuk modern look
- Hover effects untuk interactivity
- Color coding untuk status indication
- Responsive grid layout

### JavaScript Modules

**1. Data Management (data.js):**
```javascript
var dataPengguna = [...];      // Data user login
var dataKatalogBuku = [...];   // Data katalog buku
var dataTracking = {...};      // Data tracking pengiriman
var dataTransaksi = [...];     // Data history transaksi
```

**2. Utility Functions (script.js):**
```javascript
// Authentication
saveLoginData(email, nama, role)
getLoginData()
checkLogin()
logout()

// UI Functions
getGreeting()
createModal(title, content)
closeModal()
showAlert(message, type)
closeAlert()

// Data Formatting
formatRupiah(angka)
formatTanggal(tanggal)
parseHarga(hargaStr)

// Validation
validateEmail(email)
validateRequired(value)

// Cart Management
saveCart(cartItems)
getCart()
calculateCartTotal(cart)
```

**3. DOM Manipulation:**
- `document.createElement()` untuk membuat elemen baru
- `appendChild()` untuk menambah elemen
- `innerHTML` untuk render content
- `addEventListener()` untuk event handling
- `querySelector()` & `getElementById()` untuk select elements

**4. Event Handling:**
```javascript
// Form Submit
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle login
});

// Button Click
document.getElementById('btnTambahBuku').addEventListener('click', function() {
    // Show modal
});

// Real-time Search
document.getElementById('searchInput').addEventListener('input', function(e) {
    const keyword = e.target.value.toLowerCase();
    // Filter data
});
```

**5. Session Management:**
- `sessionStorage.setItem()` untuk menyimpan data
- `sessionStorage.getItem()` untuk mengambil data
- `sessionStorage.clear()` untuk logout
- Data yang disimpan: email, nama, role, cart

---

## Fitur JavaScript yang Diimplementasikan

### ✅ Manipulasi DOM
- Dynamic table rendering dari array
- Create dan update modal elements
- Real-time search filtering
- Progress bar animation
- Alert notifications

### ✅ Validasi Form
- Email format validation (regex)
- Required fields validation
- Password confirmation check
- Duplicate checking (kode barang)
- Stock availability check

### ✅ Modal & Pop-up
- Custom modal implementation
- Lupa Password modal
- Daftar/Register modal
- Checkout form modal
- Success confirmation modal

### ✅ Alert Box
- Success alerts (hijau)
- Error alerts (merah)
- Info alerts (biru)
- Auto-close after 3 seconds
- Manual close button

### ✅ Data Management
- CRUD operations (Create, Read, Update, Delete)
- Array manipulation (filter, map, reduce, find)
- Session storage for cart
- Data formatting (currency, date)

### ✅ Interactive UI
- Hover effects
- Smooth transitions
- Responsive buttons
- Color coding status
- Loading states

---

## Fitur Tambahan (Kreativitas)

- 🎨 **Modern Gradient Design** - Background gradient yang menarik
- 🔍 **Real-time Search** - Filter data tanpa reload
- 🛒 **Shopping Cart System** - Keranjang belanja dengan quantity control
- 💾 **Session Persistence** - Data tetap tersimpan saat navigasi
- 📊 **Progress Bar Visual** - Progress tracking dengan animasi
- 🎯 **Smart Color Coding** - Indikasi visual untuk stok dan status
- ⏰ **Dynamic Greeting** - Sapaan berdasarkan waktu real
- ✨ **Smooth Animations** - Fade in/out, slide up effects
- 📱 **Responsive Layout** - Grid yang adaptif
- 🖼️ **Image Fallback** - Placeholder untuk gambar error
- 🔔 **Auto-close Alerts** - Notifikasi hilang otomatis
- 📈 **Statistics Dashboard** - Laporan dengan visualisasi data

---

**© 2025 - UTS Pemrograman Web 1**
