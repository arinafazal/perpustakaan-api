# REST API Pencatatan Peminjaman Buku Perpustakaan

## Deskripsi Umum & Tujuan Proyek
API ini dibangun untuk memenuhi tugas responsi. Tujuan dari API ini adalah untuk memanajemen pencatatan layanan peminjaman buku perpustakaan. API ini mendukung operasi CRUD (Create, Read, Update, Delete) serta dilengkapi dengan fitur *query filter* (contohnya menampilkan buku yang statusnya terlambat). 

Stack yang digunakan:
- **Backend:** Node.js & Express.js
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Link Hasil Deployment Vercel
🌐 **[KLIK DI SINI UNTUK MEMBUKA API](https://namaprojekmu.vercel.app)**

## Struktur Data / Schema
Database terdiri dari 3 tabel berelasi:
1. **`books`**: `id` (UUID), `title` (Text), `author` (Text).
2. **`members`**: `id` (UUID), `name` (Text), `email` (Text).
3. **`loans`**: `id` (UUID), `book_id` (UUID - FK), `member_id` (UUID - FK), `borrow_date` (Date), `due_date` (Date), `status` (Text: 'Dipinjam', 'Dikembalikan', 'Terlambat').

## Panduan Instalasi & Cara Menjalankan Lokal

1. Clone repositori ini:
   ```bash
   git clone <url-repo-github>
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd perpustakaan-api
   ```
3. Install dependensi:
   ```bash
   npm install
   ```
4. Buat file `.env` di *root directory* dan masukkan kredensial Supabase Anda:
   ```env
   SUPABASE_URL=url_proyek_supabase_anda
   SUPABASE_KEY=anon_key_supabase_anda
   PORT=3000
   ```
5. Jalankan server di environment development:
   ```bash
   npm run dev
   ```
6. API dapat diakses di `http://localhost:3000/api/loans`

## Contoh Request dan Response

### 1. GET Semua Peminjaman (Berisi Filter Status)
**Request:** `GET /api/loans?status=Terlambat`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "e8fc92db-...",
      "borrow_date": "2023-10-01",
      "due_date": "2023-10-08",
      "status": "Terlambat",
      "books": {
        "id": "...",
        "title": "Belajar Node.js",
        "author": "Budi"
      },
      "members": {
        "id": "...",
        "name": "Andi",
        "email": "andi@email.com"
      }
    }
  ]
}
```

### 2. POST (Membuat Peminjaman Baru)
**Request:** `POST /api/loans`
```json
{
  "book_id": "masukkan-uuid-buku",
  "member_id": "masukkan-uuid-member",
  "due_date": "2023-11-01",
  "status": "Dipinjam"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "baru-uuid-...",
    "book_id": "masukkan-uuid-buku",
    "member_id": "masukkan-uuid-member",
    "borrow_date": "2023-10-25",
    "due_date": "2023-11-01",
    "status": "Dipinjam"
  }
}
```
