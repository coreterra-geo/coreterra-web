# AGENTS.md

## Project context

Coreterra adalah perusahaan konsultan geoengineering.

Coreterra membantu klien memahami kondisi bawah permukaan melalui investigasi lapangan, pengumpulan data, analisis engineering, serta penyusunan desain dan rekomendasi teknis yang dapat dipertanggungjawabkan.

Website harus mengkomunikasikan bahwa keputusan engineering yang baik dimulai dari pemahaman yang baik terhadap kondisi tanah, batuan, geologi, dan kondisi lokasi.

Core message:

**Understand the ground. Engineer with confidence.**

Gunakan pesan tersebut sebagai arah komunikasi, bukan sebagai klaim absolut.

---

## Business narrative

Gunakan alur berikut sebagai narrative utama website:

1. **Site Investigation**
   Investigasi lokasi melalui drilling, mapping, survey, dan aktivitas lapangan lain yang relevan untuk memahami kondisi geologi, geoteknik, dan lingkungan.

2. **Data Collection**
   Pengumpulan, pencatatan, validasi, dan pengorganisasian data lapangan maupun data pendukung.

3. **Analysis**
   Analisis data untuk memahami karakteristik tanah dan batuan, kondisi lokasi, risiko, batasan teknis, dan dasar engineering decision.

4. **Design and Recommendations**
   Mengubah hasil investigasi dan analisis menjadi desain serta rekomendasi engineering yang jelas dan dapat digunakan sebagai dasar pengambilan keputusan proyek.

Pertahankan hubungan sebab-akibat:

**Investigation → Data → Analysis → Engineering Decision**

Jangan menampilkan empat tahap tersebut sebagai service card yang tidak saling berhubungan.

Website harus menunjukkan bahwa semuanya merupakan satu engineering workflow.

---

# Brand direction

## Brand character

Coreterra harus terasa:

- grounded
- technical
- precise
- credible
- engineering-led
- calm
- confident
- premium
- connected to geology and earth

Hindari tampilan yang terasa seperti:

- SaaS startup
- AI startup
- crypto website
- generic construction company
- architecture portfolio
- futuristic technology platform

---

## Colors

Gunakan warna yang berasal dari karakter visual Coreterra:

- charcoal
- graphite
- dark grey
- soil brown
- weathered stone
- warm neutral
- off-white

Gunakan brown sebagai accent, bukan sebagai warna dominan pada seluruh halaman.

Pastikan contrast tetap tinggi dan readable.

Hindari:

- neon gradient
- purple-blue technology gradient
- glowing UI
- excessive glassmorphism
- saturated corporate blue
- random accent colors

---

# Logo

Logo utama berada di:

`public/logo.png`

Struktur logo terdiri dari:

- bentuk charcoal/abu-abu gelap
- bentuk cokelat tanah
- garis berlapis yang merepresentasikan strata/geological layers

Jangan:

- mengubah proporsi logo
- memotong logo
- menambahkan glow
- menambahkan shadow berlebihan
- membuat logo 3D
- mengubah warna tanpa alasan yang jelas

---

# Primary hero visual

Primary landing-page visual berada di:

`public/hero-geotechnical-drilling.webp`

Jika nama asset berbeda, inspect folder `public/` dan gunakan asset drilling utama yang tersedia.

Gambar tersebut merupakan visual reference utama untuk homepage.

Karakter visualnya:

- geotechnical drilling rig
- actual field investigation
- rugged natural terrain
- visible borehole operation
- soil and rock context
- engineered slope / infrastructure context
- mountain landscape
- restrained industrial equipment
- overcast cinematic atmosphere
- earthy neutral color palette

Gunakan image tersebut untuk membentuk visual language landing page.

---

## Hero image composition

Pertahankan karakter composition dari gambar:

- drilling rig merupakan visual focus utama
- rig berada di sisi kanan
- sisi kiri relatif tenang dan memiliki negative space
- mountain/terrain memberikan depth
- geological ground tetap terlihat
- infrastructure context tetap secondary

Tempatkan hero content terutama di sisi kiri.

Jangan menempatkan headline utama di atas drilling rig jika mengurangi readability.

Gunakan overlay atau gradient hanya untuk readability.

Overlay harus terasa natural dan restrained.

Contoh:

dark transparent gradient

left → transparent/right

bukan colorful gradient.

---

# Image usage

Jangan membuat gambar drilling menjadi sekadar decorative background.

Gunakan visual tersebut untuk mengkomunikasikan:

**tools → investigation → understanding → engineering insight**

Jika menggunakan image cropping:

- pastikan drilling rig tetap recognizable
- hindari crop yang kehilangan borehole context
- hindari crop yang hanya menampilkan machinery tanpa terrain
- pertahankan environmental context jika viewport memungkinkan

Gunakan `object-position` yang responsive.

Desktop dan mobile boleh memiliki crop berbeda.

---

# Landing page narrative

Landing page harus terasa seperti satu engineering story.

Preferred page flow:

1. Navigation
2. Hero
3. Engineering premise / introduction
4. Investigation-to-decision workflow
5. Expertise / capabilities
6. Evidence / engineering approach
7. Selected project context if actual project data exists
8. Final CTA
9. Footer

Jangan menambahkan section hanya untuk membuat halaman lebih panjang.

Setiap section harus memiliki fungsi komunikasi yang jelas.

---

# Hero

Hero harus menjadi visual anchor homepage.

Hero harus mengkomunikasikan:

**Understanding what lies beneath is the first step toward better engineering decisions.**

Gunakan:

- primary headline
- concise supporting statement
- clear CTA
- drilling visual
- restrained engineering detail

Hero boleh memiliki eyebrow seperti:

`GEOTECHNICAL & GEOENGINEERING CONSULTANCY`

jika sesuai dengan content existing.

Jangan menggunakan headline generik seperti:

- Building the future
- Innovating tomorrow
- Engineering excellence
- Transforming possibilities

tanpa konteks geoengineering yang jelas.

---

# Content guidelines

Gunakan bahasa:

- lugas
- profesional
- confident
- technically credible
- mudah dipahami klien teknis maupun non-teknis

Hindari marketing hyperbole.

Jangan mengarang:

- client
- project
- certification
- employee count
- years of experience
- project count
- success rate
- technology
- proprietary platform
- testimonial
- awards
- capability

kecuali informasi tersebut sudah tersedia di repository atau context project.

Hindari klaim absolut seperti:

- zero risk
- guaranteed safety
- always accurate
- completely reliable

---

# Visual system

Gunakan visual vocabulary yang mengambil inspirasi dari geoengineering:

- geological strata
- contour lines
- topographic lines
- borehole references
- sectional lines
- engineering grid
- coordinate markers
- technical annotation
- elevation/depth indicators

Gunakan dengan restraint.

Elemen engineering harus terasa seperti bagian dari visual system, bukan dekorasi random.

---

# Motion

Motion boleh digunakan, tetapi harus restrained.

Prefer:

- subtle image scale
- depth movement
- section reveal
- geological-line movement
- typography reveal
- small parallax
- opacity transition

Avoid:

- bouncing objects
- excessive cursor effects
- dramatic zoom
- spinning objects
- particles
- scroll-jacking
- excessive section pinning

Motion harus mendukung hierarchy dan storytelling.

---

# Current media constraint

Saat ini homepage hanya memiliki static hero poster.

Jangan:

- mengasumsikan video tersedia
- membuat `<video>` dengan file yang tidak tersedia
- membuat fake video path
- mengunduh stock video secara otomatis
- membuat remote media dependency

Hero harus terasa complete hanya menggunakan static image.

Arsitektur boleh dibuat agar video dapat ditambahkan nanti tanpa redesign besar.

---

# Responsive behavior

Desktop:

- pertahankan cinematic wide composition
- content berada terutama di kiri
- drilling visual tetap dominant di kanan
- subtle interaction diperbolehkan

Tablet:

- kurangi visual complexity
- pertahankan drilling rig sebagai anchor

Mobile:

- prioritaskan headline dan CTA
- gunakan crop image yang mempertahankan drilling rig
- kurangi atau disable pointer/parallax effect
- hindari fixed hero height yang menyebabkan content terpotong

---

# Accessibility

Pastikan:

- semantic HTML
- heading hierarchy benar
- keyboard navigation
- visible focus states
- accessible button/link labels
- sufficient text contrast
- meaningful alt text untuk informative images
- decorative graphics tidak mengganggu screen reader
- `prefers-reduced-motion` dihormati

---

# Repository rules

Sebelum mengubah kode:

1. Inspect project structure.
2. Inspect existing homepage.
3. Inspect existing components.
4. Inspect styles/design tokens.
5. Inspect dependencies.
6. Inspect existing routes.
7. Read relevant project skills.

Reuse existing implementation patterns jika sesuai.

Pertahankan perubahan existing di working tree.

Ubah hanya file yang diperlukan.

---

# Dependency policy

Jangan langsung menambahkan animation library.

Prefer:

1. CSS
2. SVG
3. Web Animations API
4. small purpose-built JavaScript
5. existing project animation dependency

Jangan install:

- GSAP
- Three.js
- Framer Motion
- Lenis
- Lottie

kecuali benar-benar diperlukan atau sudah digunakan project.

---

# Production safety

Jangan:

- deploy
- push production
- modify production configuration
- modify infrastructure
- modify authentication
- modify database
- modify unrelated backend/API

kecuali secara eksplisit diminta.

---

# Verification

Setelah implementation:

- run lint
- run typecheck if available
- run build
- run relevant tests
- inspect obvious runtime errors
- verify desktop
- verify tablet
- verify mobile
- verify image cropping
- verify overflow
- verify CTA
- verify reduced-motion behavior

Jangan menyatakan sesuatu sudah berhasil jika tidak dapat diverifikasi.