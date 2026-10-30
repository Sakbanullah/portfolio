# MEMORY.md — front/

Ingatan jangka panjang untuk folder `front/`. Tambahkan catatan **bertanggal** setiap ada perubahan atau keputusan. Jangan hapus catatan lama: kalau sudah tidak berlaku, beri keterangan **superseded (YYYY-MM-DD)**. Aturan kerja proyek ada di `../AGENT.md`.

---

## 2026-10-29 — Frontend awal dibuat — **superseded (2026-10-29)** oleh gaya "Scroll-Style Report" (lihat catatan (11)); konten & keputusan data tetap berlaku, tema visualnya tidak.

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

## 2026-10-29 (2) — Timeline Experience scroll-based
- `Experience.jsx`: garis progress vermilion (`useScroll` target `<ol>`, offset `['start 75%','end 55%']`, `useSpring`, `scaleY`) + node diamond `whileInView` (`once:false`, margin -45%) yang terisi `var(--color-vermilion)` saat dilewati.
- `prefers-reduced-motion` → garis tidak dirender, node diam.
- Skipped: state "aktif per item" (judul menyala, item lain meredup).

## 2026-10-29 (3) — Audit .gitignore
- Dibuat `.gitignore` di root repo (sebelumnya hanya ada `front/.gitignore`). Menutup `.claude/`, `CLAUDE.local.md`, `.opencode/`, `.cursor/`, `.windsurf/`, `.continue/`, `.aider*`, `graphify-out/`, `.env*` (kecuali `.env.example`), `node_modules/`, `dist/`, `coverage/`, file OS/editor.
- `front/.gitignore` ditambah `coverage`.
- Tetap di-track: `AGENT.md`, `front/MEMORY.md`, `back/MEMORY.md`, source, `src/data/*.json`, lockfile.
- Repo `master` belum punya commit; tidak ada file sensitif yang telanjur tracked.

## 2026-10-29 (4) — Skills jadi tag chips
- Bar persentase dihapus: dianggap klaim palsu. `skills.json` kini hanya `{ "name" }` per item — field `level` dihapus, tidak ada pembaca lain.
- `Skills.jsx`: chip pill (`rounded-full ring-1`), hover vermilion, `Divider` di bawah judul kategori. Tanpa animasi.
- Catatan: tambahkan skill baru = cukup objek `{ "name": "..." }` di kategori yang relevan. Urutan array = prioritas tampil.

## 2026-10-29 (5) — Projects: proses berpikir (Why this?)
- `projects.json` dapat field baru per project: `problem`, `rationale: { why, decisions: [{ choice, reason }] }`, `impact`. Isi masih placeholder realistis untuk 4 project.
- `Projects.jsx`: tombol "Why this?" membuka panel di dalam card (`AnimatePresence`, height auto) — satu card terbuka sekaligus; `aria-expanded`/`aria-controls`; tanpa animasi bila reduced motion.
- Ukuran card diubah: semua `row: 1`, `featured` tetap `col: 2` — tinggi mengikuti isi saat panel terbuka.
- Tambah project baru: isi juga tiga field di atas (opsional secara kode; panel hanya tampil apa yang ada).

## 2026-10-29 (6) — Responsive & mobile friendly
- Breakpoint kustom `xs` (≥380px) di `index.css`: dipakai navbar (teks badge & font nama), Hero (ukuran judul), About (fakta 2 kolom vs 1).
- Navbar 320px: nama `whitespace-nowrap` + `text-base`, teks "OPEN TO WORK" disembunyikan ≤380px (span tetap ada untuk aksesibilitas), gap lebih rapat.
- Padding card `p-4 sm:p-6`; foto About `max-w-[160px] sm:max-w-[220px]`; email tombol `max-w-full break-all`.
- `body`: `overflow-x: clip` + `text-size-adjust: 100%` (iOS).
- Diuji 320/375/768/1024/1440 px: `scrollWidth == innerWidth` (tanpa scroll horizontal), 0 console error.
- Catatan: target sentuh tombol teks kecil ("Why this?", link repo) masih ~20px tinggi; diperbesar jika diminta.

## 2026-10-29 (7) — Lapisan motion, Tahap 3: smooth scroll + ScrollTrigger
- Dependensi baru (disetujui): `lenis@1.3.27`, `gsap@3.15.0` (ScrollTrigger). `lenis/dist/lenis.css` diimpor di hook, ikut mati bersama hook saat reduced motion.
- `src/hooks/useSmoothScroll.js`: Lenis global, dikendarai `gsap.ticker` (satu rAF loop). Anchor `href="#..."` di-handle manual: `offsetTop − tinggi navbar − 8`, diulang sekali via `setTimeout(0)` karena navbar mengecil saat menu mobile menutup. `scroll-padding-top` CSS dihapus (dulu 5rem, membuat jarak 19px terlalu besar).
- Jebakan Lenis: `.lenis-scroll` merender posisi lewat transform, jadi `getBoundingClientRect()` bergeser selama animasi — handler anchor bawaan Lenis (`anchors: true`) berhenti meleset. Karena itu `anchors` **tidak** dipakai.
- `src/hooks/useScrollReveal.js`: GSAP ScrollTrigger — garis `Divider` menggambar (`scaleX 0.2→1`) saat masuk viewport, parallax `y: -28` pada grid Projects (≥768px). Dibungkus `gsap.context()` + `ctx.revert()`.
- Pembagian library: framer-motion tetap untuk animasi masuk; ScrollTrigger hanya untuk yang bergantung posisi scroll. Tidak ada elemen yang dianimasikan keduanya.
- Diuji 375/768/1280 px, terang & gelap: tanpa overflow horizontal, anchor berhenti 8px di bawah navbar, 0 console error. Reduced motion: class `lenis` tidak dipasang, transform `none`, konten langsung tampil, anchor jadi lompat instan (80px di bawah, dari `scroll-behavior: smooth` bawaan → posisi akhir sama).
- Bundle: JS 375.28 kB → 524.11 kB (gzip 119.77 → 175.53 kB), CSS 27.15 → 27.96 kB (gzip 5.78 → 6.12 kB). ±149 kB JS = gsap core + ScrollTrigger + Lenis (baca: proporsional dengan framer-motion yang sudah ada).
- **Efek Tahap 3 yang dipilih: A — Ink reveal pada judul hero (mask SVG + GSAP).** Belum dikerjakan; menanti konfirmasi/pekerjaan berikutnya.
- Skipped: CustomScroller GSAP (ScrollTrigger tetap akurat lewat event Lenis); transisi antar-section (bukan bagian Tahap 3).

## 2026-10-29 (8) — Motion Tahap 4: micro-interaction — **sebagian superseded (2026-10-29)**: hover bingkai dalam, keadaan kartu, dan efek riak seigaiha tidak berlaku lagi.

- Card: hover sekarang menggerakkan bingkai ganda — bingkai dalam `before:` melebar (`inset-1.5 → inset-1`) dan menghangat ke `vermilion/30`, plus translate/ shadow lama. Semua Card (About/Experience/Projects/Skills/Contact/Hero) dapat efek yang sama otomatis. `Card` kini meneruskan prop lain (`{...rest}`) — dipakai Projects untuk `onClick`.
- Project detail = lightbox baru `sections/ProjectDetail.jsx` (`role="dialog"`, `aria-modal`): dibuka dari klik area card (dijaga: target `closest('a, button')` → tidak buka) atau tombol judul di `<h3>` (jalur keyboard, `aria-haspopup="dialog"`). Tutup: Esc, tombol ✕ (`data-autofocus`, fokus awal), klik latar blur. Fokus di-trap (Tab/Shift-Tab di dalam dialog) dan dikembalikan ke pemicu saat tutup. Lenis di-`stop()`/`start()` lewat `getLenis()` baru di `useSmoothScroll.js`; fallback `overflow:hidden` bila Lenis mati (reduced motion). Panel "Why this?" inline tetap ada.
- Fokus keyboard global: `:focus-visible` (outline 2px vermilion, offset 2) di `@layer base` — menutup semua elemen interaktif tanpa class per komponen.
- Tombol/link: `active:scale-[0.98]` di CTA (View projects, Get in touch, email Contact) dan `active:scale-95` di tombol ikon (toggle tema, hamburger, tutup dialog).
- Toggle tema: fade warna 300ms via class sementara `.theme-fade` di `<html>` (di-set `useTheme`, dihapus setelah 350ms; mati saat reduced motion — tidak ada transisi permanen global).
- Bugfix: `aria-label={profile.name}` nyasar di link menu mobile `Navbar.jsx` dihapus (melabeli semua link "Ren Aizawa").
- Diuji browser (QA script): 375/768/1280 terang+gelap — tanpa overflow horizontal; dialog: terbuka, fokus tertahan 25× Tab, Esc menutup, fokus kembali ke pemicu; panel Why this? tetap jalan. 0 console error.
- Bundle: JS 524.32 → 529.13 kB (gzip 175.58 → 177.62), CSS 28.96 → 32.05 kB (gzip 6.34 → 6.74).

## 2026-10-29 (9) — Motion Tahap 5: efek A (ink reveal) + pelengkap Tahap 3
- **Efek yang dipilih: A — ink reveal** (pemilik tidak mengisi pilihan → default A). B/C/D tidak dikerjakan.
- Ink reveal judul hero: `data-ink="hero"` pada `<h1>`; mask tiga blot `radial-gradient` (ellipse, union) yang GSAP kembangkan via CSS variable `--ink-x/-y1..3` (staggered, ease power2.inOut, total ±1.3s). Ada di `useScrollReveal.js` (dalam `gsap.context`, aman StrictMode). **Judul hero dikeluarkan dari framer-motion** (`rise()` tidak dipakai di `<h1>` lagi) — satu elemen satu library.
- Fail-safe: nilai default CSS mask = terbuka penuh → JS gagal / reduced motion → judul langsung terbaca & bisa dipilih. Baris `.theme-fade`-style guard `prefers-reduced-motion` menonaktifkan transisi.
- Pelengkap Tahap 3 yang tertinggal: **parallax kanji watermark Hero** (`data-reveal="kanji"`, GSAP `yPercent 0 → 14`, scrub 0.6) — target daftar Tahap 3 butir 4a yang belum pernah diimplementasi.
- Ketergantungan: `ogl` dihapus dari `package.json` — tidak pernah dipakai (riak seigaiha hover = CSS murni) dan efek B tidak dipilih. Tidak ada dependensi baru di Tahap 4/5.
- Diuji browser: ink vars 1.5% → 58% (animasi jalan), judul tetap terbaca; parallax kanji bergerak saat scroll (y 0 → 46.6px); reduced motion (emulasi): judul langsung penuh, tanpa class `lenis`; 375 dark tanpa overflow; 0 console error.
- Bundle akhir: JS 529.68 kB (gzip 177.83), CSS 33.63 kB (gzip 6.86). Total Tahap 3+4+5: JS +5.4 kB, CSS +5.5 kB dari baseline 524.32/28.96.

## 2026-10-29 (10) — Fix box-in-box: card satu batas visual
- **Akar masalah:** `Card.jsx` (sumber bersama semua section) merender dua batas — `ring-1` di tepi + pseudo `before:` border `rounded-lg` di `inset-1.5` (plus hover stage-4 `hover:before:inset-1` yang menggerakkannya). Hasil: setiap card tampak punya kotak kedua di dalam (nested card). Dihapus semua baris `before:` card; bingkai ganda kini hanya hidup di `Divider.jsx` (garis, bukan kotak). Hover card tetap: `-translate-y-0.5` + shadow.
- Yang **disengaja dipertahankan** setelah audit (elemen internal sah, bukan wrapper kosong): ring bingkai foto About (berisi gambar), border-l + node diamond timeline Experience, pill chip Skills/Projects, ring tombol ikon kecil (toggle/hamburger/Stamp/✕), ring modal `ProjectDetail`, border navbar/footer (pemisah level halaman). CSS global tak menyimpan inset-shadow berulang.
- Bundle: JS 529.68 → 529.44 kB (gzip 177.83 → 177.77), CSS 33.95 → 32.49 kB (gzip 6.88 → 6.70).
- Verifikasi browser: full-page 1280 + 375, terang & gelap — semua card satu batas bersih, 0 console error, lint + build lulus. Catatan screenshot full-page: konten Experience/Projects tampak kosong karena `whileInView` belum terpicu saat tangkap; di viewport nyata konten tampil (dulu begitu, bukan regresi).
- Aturan baru di `AGENT.md`: "Card = satu batas visual"; bingkai dalam pseudo dilarang.

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

## 2026-10-29 (11) — Tampilan baru: "Scroll-Style Report" (gulungan lukisan tinta)
**Status:** selesai. `npm run lint` (oxlint) bersih, `npm run build` lulus, QA browser (Playwright) 320/375/1280/1440 terang & gelap: tanpa overflow horizontal, 0 error console.
- **Struktur:** 6 bab (Hero, About, Experience, Projects, Skills, Contact) di dalam satu frame gulungan: `.roller` di atas & bawah (`App.jsx`). Data JSON & `size: { col, row }` di Card **tidak berubah**.
- **Palet/font baru** (`index.css`): washi `#efe6d5` / paper `#f8f3e8` / sumi `#211d19` / vermilion `#b3342a` / kin `#9a7b3f` / matsu `#3a4f45`; gelap `#12161c` (kertas hitam kebiruan) + tinta krem + emas `#c3a25e`. Font: Shippori Mincho + Noto Serif SC (cadangan kanji vertikal) + Inter.
- **Judul bab:** `SectionHeading` kini menerima `chapter={n}` (prop, nomor 02–06) dan merender `第0N章` + kanji + judul **vertikal** (`.vertical-title`). Kicker tetap horizontal. Teks isi tetap horizontal, `leading-loose`.
- **Kertas:** `.paper-cut` (card: border 1px + bayangan tipis, sudut kotak). Serat kertas = noise SVG data-URI di `body` (`background-attachment: fixed`; `multiply` terang, `screen` gelap — noise hitam tak terlihat di kertas gelap tanpa `screen`).
- **Motion:** semua `whileInView` per section/card **dihapus** (sesuai spesifikasi: tanpa animasi masuk). Yang tersisa: `.hero-unroll` (gulungan terbuka sekali, clip-path, `both`, mati di reduced motion), ink reveal judul hero (GSAP, default mask terbuka), parallax kanji & garis Divider (GSAP), `ChapterNav` (IntersectionObserver, `rootMargin: '-40% 0px -35% 0px'`, pilih entri dengan indeks tertinggi; `aria-current` hanya dekorasi, nav `aria-hidden`).
- **Dihapus:** `SeigaihaHover.jsx` + CSS `.seigaiha`, `.seigaiha-ripple`, `@keyframes seigaiha-drift` (riak hover tidak sesuai gaya; sisa-sisa motion ditelusuri).
- **Tombol:** pill → kotak (tanpa `rounded-full`); `text-[#faf6ee]` → `text-paper`.
- Bundle: JS 529.92 kB (gzip 177.93), CSS 33.59 kB (gzip 7.14) — hampir sama dengan sebelumnya.
- Skipped: batang gulungan animatif saat scroll, variasi tipis tekstur per bab (satu tekstur global cukup), pemisahan bab Project→Detail (detail tetap lightbox).

## 2026-10-29 — Layout audit: akar masalah non-viewport — **superseded (2026-10-29)** (desain berubah; pelajaran `text-xs` vs `text-[11px]` masih relevan).
Diverifikasi: sweep lebar 240–2560 px, root font 16/20/26 px, zoom, mobile 390, desktop 1024/1280.
Hasil: tidak ada overflow horizontal, crop teks, atau tumpang tindih navbar. Konfigurasi viewport
(`width=device-width, initial-scale=1`) dan `max-w-6xl` sudah benar — **tidak diubah**.
Perbaikan dilakukan pada dua hal yang menyebabkan tampilan tidak konsisten:
1. **Ekspresi warna CSS tidak valid** — delapan `*-[11px]` label dan diamond divider tidak mengikuti skala rem.
2. **`color:var(--color-kin)` pada `bg-kin/70`** — akibatnya diamond Divider tampil hitam/abu, bukan emas.
3. **`text-[11px]`** (pada SectionHeading, About, Contact, Experience, Projects, Hero) tidak mengikuti font
   default pengguna — diganti `text-xs` agar proporsional saat browser zoom / font-size diperbesar.
4. **`grid-cols-1 xs:grid-cols-2` pada fakta About** — diganti `repeat(auto-fit,minmax(8rem,1fr))`
   supaya jumlah kolom menyesuaikan lebar, bukan breakpoint tetap.
5. **`max-w-[160px]` → `max-w-40` / `max-w-55`** — token spasi, konsisten dengan skala rem Tailwind.
6. **Logo navbar (link `#top`) tidak punya label aksesibel saat `truncate`** — ditambah `aria-label={profile.name}`.
Tidak ada perubahan desain, konten, breakpoint, atau ukuran section.
