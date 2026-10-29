# MEMORY.md — front/

Ingatan jangka panjang untuk folder `front/`. Tambahkan catatan **bertanggal** setiap ada perubahan atau keputusan. Jangan hapus catatan lama: kalau sudah tidak berlaku, beri keterangan **superseded (YYYY-MM-DD)**. Aturan kerja proyek ada di `../AGENT.md`.

---

## 2026-10-29 — Frontend awal dibuat

**Status:** Frontend selesai dan bisa dijalankan (`npm install && npm run dev`). Build produksi bersih, lint tanpa warning. Belum ada backend.

**Keputusan yang sudah disepakati dengan pemilik proyek:**
- Bahasa konten: **Inggris**. Ornamen kanji tetap (dekoratif).
- Font judul: **Shippori Mincho**; isi: **Inter**.
- Card resizable lewat **field JSON `size: { col, row }`** (CSS grid span). Mode edit drag/resize (react-grid-layout) **ditunda / tidak dibuat** sampai diminta.
- Foto section About: placeholder SVG inline di `About.jsx`, bukan file gambar.
- Tanpa router (satu halaman scroll ber-anchor), tanpa form kontak (menunggu `back/`).
- Animasi scroll memakai `whileInView` + `once: true`; semua menghormati `prefers-reduced-motion`. Posisi awal animasi memakai `opacity: 0.001` (bukan `0`) supaya konten tetap lolos tangkapan screenshot full-page.
- Card memakai `grid-flow-dense` agar tidak ada lubang di grid bento.

**Isi data masih placeholder** (nama "Ren Aizawa", email `ren.aizawa@example.com`, URL GitHub/LinkedIn `example-dev`) — harus diganti pemilik situs.

**Catatan teknis:**
- Versi: React 19.3.1, Vite 8.3.5, Tailwind 4.3.3, framer-motion 14.7.1.
- Linter utama scaffold ini adalah **oxlint** (`npm run lint`), bukan ESLint.
- Token tema gelap didefinisikan ulang pada selector `.dark` di `src/index.css` sebagai CSS variable — jadi semantic class Tailwind otomatis berubah warna.
- Saat mode gelap aktif, tombol toggle berlabel "Switch to light mode".

## To-do / Next
```json
[
  { "id": 1, "task": "Ganti data placeholder di src/data/profile.json (nama, email, sosial, bio)" },
  { "id": 2, "task": "Ganti experience.json dan projects.json dengan data asli" },
  { "id": 3, "task": "Ganti placeholder SVG di About.jsx dengan foto asli" },
  { "id": 4, "task": "Deploy (Vercel / Netlify) setelah data final" },
  { "id": 5, "task": "Mulai folder back/ bila dibutuhkan form kontak / API nyata" }
]
```
