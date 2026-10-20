export type Project = {
  number: string
  slug: string
  title: string
  client: string
  location: string
  category: string
  scope: string
  overview: string
  purpose: string
  activities: string[]
  image: string
  imageAlt: string
  imagePosition?: string
}

export const siteCopy = {
  brand: {
    name: 'CORETERRA',
    descriptor: 'KONSULTAN GEOENGINEERING',
    loaderTitle: 'Konsultan Geoengineering',
    loading: 'Membaca data lapangan',
    loadingContext: 'Coreterra / Geoengineering',
    homeLink: 'Coreterra, kembali ke beranda',
  },
  navigation: {
    menu: 'Menu',
    about: 'Tentang',
    services: 'Layanan',
    projects: 'Proyek',
    contact: 'Kontak',
    footer: 'Navigasi footer',
  },
  hero: {
    title: ['Kondisi lapangan.', 'Analisis geoteknik.', 'Arahan rekayasa.'],
    description: ['Konsultansi geoengineering untuk pertambangan,', 'infrastruktur, energi, dan eksplorasi.'],
    action: 'Lihat layanan',
  },
  about: {
    eyebrow: 'Tentang Coreterra',
    title: ['Mengenal kondisi', 'bawah permukaan'],
    description: 'PT Coreterra Geo Engineering adalah konsultan geoengineering. Lingkup pengalamannya mencakup geoteknik tambang, investigasi fondasi, hidrologi–hidrogeologi, survei geofisika, dan eksplorasi untuk tambang, infrastruktur, serta energi.',
  },
  servicesSection: {
    eyebrow: 'Bidang layanan',
    title: ['Ruang lingkup', 'geoengineering.'],
    description: 'Kajian dan investigasi disusun sesuai persoalan teknis, kondisi lokasi, serta data yang dibutuhkan untuk mengambil keputusan.',
    itemLabel: 'Layanan',
  },
  services: [
    { number: '01', title: 'Investigasi tanah & fondasi', description: 'Pengeboran, pengujian lapangan, dan interpretasi kondisi bawah permukaan untuk kebutuhan fondasi dan prasarana.', detail: 'Pengeboran / SPT / CPT' },
    { number: '02', title: 'Geoteknik tambang & infrastruktur', description: 'Kajian tanah dan batuan, stabilitas lereng, serta kondisi tanah dasar untuk tambang dan jalan angkut.', detail: 'Lereng / jalan angkut' },
    { number: '03', title: 'Hidrologi & hidrogeologi', description: 'Penilaian air permukaan dan air tanah sebagai bagian dari kajian tambang, drainase, dan pengelolaan risiko geoteknik.', detail: 'Air permukaan / air tanah' },
    { number: '04', title: 'Survei geofisika & eksplorasi', description: 'Survei geolistrik, geomagnetik, dan pengeboran eksplorasi untuk memahami struktur serta sebaran material bawah permukaan.', detail: 'Geolistrik / geomagnetik' },
  ],
  projectSection: {
    eyebrow: 'Pengalaman proyek',
    title: ['Kajian di beragam', 'kondisi lapangan.'],
    description: 'Contoh pekerjaan Coreterra mencakup lokasi tambang, jalan angkut, fondasi, fasilitas energi, dan area eksplorasi di Indonesia serta Malaysia.',
    explore: 'Jelajahi proyek',
    previous: 'Lihat proyek sebelumnya',
    next: 'Lihat proyek berikutnya',
    listLabel: 'Daftar pengalaman proyek; geser untuk melihat proyek lainnya',
    readMore: 'Baca selengkapnya',
    positionLabel: 'Posisi daftar proyek',
  },
  footer: {
    contactTitle: ['Mari mulai dari', 'kondisi lapangan.'],
    intro: 'Ceritakan kebutuhan kajian dan konteks lokasi Anda. Kami dapat memulai percakapan dari data yang sudah tersedia.',
    office: 'Alamat kantor',
    address: ['Gardenia Estate Blok A5 No. 12A', 'Ciputat, Banten — Jawa Barat', 'Indonesia'],
    contactMethods: 'Kontak kami',
    emailAction: 'Kirim email ke Coreterra',
    emailNote: 'Kirim kebutuhan kajian dan konteks lokasi.',
    phoneAction: 'Hubungi Coreterra melalui telepon',
    phoneNote: 'Diskusikan kebutuhan teknis secara langsung.',
    copyright: 'PT Coreterra Geo Engineering.',
  },
  projectDetail: {
    client: 'Klien', location: 'Lokasi', category: 'Klasifikasi', scope: 'Lingkup utama',
    eyebrow: 'Pengalaman proyek', summary: 'Ringkasan pekerjaan', title: 'Konteks & lingkup.',
    activities: 'Rangkaian pekerjaan', purpose: 'Arah penggunaan hasil',
    next: 'Proyek berikutnya', back: 'Kembali ke pengalaman proyek',
    navigation: 'Navigasi proyek', profileLabel: 'Profil proyek', allProjects: 'Semua proyek', notFound: 'Proyek tidak ditemukan', fileLabel: 'CT / PROJECT FILE', sectionLabel: '01 / KAJIAN',
  },
  notFound: {
    status: '404 / Halaman tidak ditemukan',
    title: 'Halaman tidak tersedia.',
    description: 'Alamat yang Anda buka tidak ditemukan. Kembali ke beranda untuk melihat layanan dan pengalaman proyek Coreterra.',
    action: 'Kembali ke beranda',
  },
  fieldDocumentation: 'Dokumentasi lapangan',
} as const

export const projects: Project[] = [
  {
    number: '01', slug: 'kajian-geoteknik-tambang-kalimantan-timur-tahap-1', title: 'Kajian geoteknik tambang — tahap 1', client: 'PT Bina Insan Sukses Mandiri', location: 'Kalimantan Timur, Indonesia', category: 'Geoteknik tambang',
    scope: 'Kajian geoteknik, hidrologi, dan hidrogeologi untuk mendukung perencanaan tambang yang aman dan berkelanjutan.',
    overview: 'Pekerjaan tahap pertama menilai kondisi geologi, geoteknik, air permukaan, dan air tanah pada area tambang. Data geologi serta geoteknik yang tersedia ditinjau dan diinterpretasikan, kemudian dipadukan dengan investigasi lapangan dan penilaian rekayasa untuk membangun dasar teknis perencanaan.',
    purpose: 'Menyediakan dasar teknis untuk perencanaan tambang, desain lereng, pengelolaan air, dan pengendalian risiko geoteknik.',
    activities: ['Tinjauan dan interpretasi data geologi serta geoteknik yang tersedia', 'Karakterisasi massa tanah dan batuan', 'Penilaian stabilitas lereng dan risiko geoteknik', 'Evaluasi kondisi hidrologi dan hidrogeologi'],
    image: '/about-slope-clean.webp', imageAlt: 'Kondisi lereng dan aliran air di area lapangan', imagePosition: 'center 58%',
  },
  {
    number: '02', slug: 'kajian-geoteknik-tambang-kalimantan-timur-tahap-2', title: 'Kajian geoteknik tambang — tahap 2', client: 'PT Bina Insan Sukses Mandiri', location: 'Kalimantan Timur, Indonesia', category: 'Geoteknik tambang',
    scope: 'Pendalaman kajian kondisi tanah, batuan, dan risiko terkait air untuk mendukung pengembangan tambang.',
    overview: 'Tahap kedua melanjutkan evaluasi kondisi tanah dan batuan serta risiko yang berkaitan dengan air pada area tambang. Kajian memperdalam analisis informasi geologi dan geoteknik, karakteristik massa tanah dan batuan, stabilitas lereng, serta aspek hidrologi-hidrogeologi untuk kebutuhan pengembangan tambang.',
    purpose: 'Memberikan rekomendasi teknis bagi pengembangan tambang, pengelolaan lereng, pengendalian drainase dan air, serta mitigasi risiko.',
    activities: ['Analisis lanjutan informasi geologi dan geoteknik', 'Evaluasi karakteristik tanah dan batuan', 'Penilaian stabilitas lereng dan risiko kondisi air', 'Penyusunan rekomendasi pengembangan tambang dan pengendalian air'],
    image: '/about-yard-clean.webp', imageAlt: 'Area kerja dan peralatan lapangan untuk investigasi geoteknik', imagePosition: 'center 52%',
  },
  {
    number: '03', slug: 'kajian-jalan-angkut-sumatera-selatan', title: 'Kajian jalan angkut tambang', client: 'PT Abadi Ogan Cemerlang', location: 'Sumatera Selatan, Indonesia', category: 'Infrastruktur tambang',
    scope: 'Investigasi tanah dasar, pengujian lapangan, dan evaluasi trase jalan angkut tambang.',
    overview: 'Kajian geoteknik ini mendukung pengembangan dan evaluasi jalan angkut tambang. Investigasi lapangan direncanakan dan diawasi untuk memahami kondisi tanah dasar serta sifat rekayasa material di sepanjang trase, sehingga kebutuhan penyiapan badan jalan dan pengelolaan risiko dapat dirumuskan dengan lebih terukur.',
    purpose: 'Memberi masukan geoteknik untuk penyiapan tanah dasar, struktur perkerasan, geometri jalan, drainase, dan pengelolaan risiko.',
    activities: ['Perencanaan dan pengawasan investigasi lapangan', 'Standard Penetration Test (SPT) dan Cone Penetration Test (CPT)', 'Pengambilan sampel serta pengujian laboratorium tanah', 'Evaluasi tanah dasar, trase jalan, geometri, dan kebutuhan drainase'],
    image: '/about-slope-clean.webp', imageAlt: 'Kondisi medan dan akses lapangan yang mewakili konteks pekerjaan jalan angkut', imagePosition: 'center 42%',
  },
  {
    number: '04', slug: 'eksplorasi-batugamping-jawa-barat', title: 'Eksplorasi batugamping', client: 'LSI Engineering & Consultants Limited — Bathwall Corporation', location: 'Jawa Barat, Indonesia', category: 'Eksplorasi geologi',
    scope: 'Pengeboran eksplorasi, pencatatan inti bor, dan dokumentasi kondisi litologi batugamping.',
    overview: 'Program pengeboran eksplorasi batugamping mengumpulkan informasi geologi dan geoteknik melalui pencatatan inti bor, penilaian perolehan inti, penanganan sampel, serta dokumentasi litologi. Informasi tersebut digunakan untuk memahami stratigrafi, sebaran, ketebalan, kualitas, dan kesinambungan batugamping.',
    purpose: 'Mendukung evaluasi sumber daya dan pemahaman awal untuk pengembangan tambang batugamping.',
    activities: ['Pengeboran eksplorasi batugamping', 'Pencatatan geologi dan geoteknik inti bor', 'Penilaian perolehan inti serta penanganan sampel', 'Dokumentasi litologi dan interpretasi kondisi bawah permukaan'],
    image: '/bamboo.jpeg', imageAlt: 'Sampel inti batuan yang tersusun untuk dokumentasi eksplorasi geologi',
  },
  {
    number: '05', slug: 'survei-geolistrik-pltm-jawa-barat', title: 'Survei geolistrik PLTM', client: 'PT Volta Indo Technology', location: 'Pongkor, Jawa Barat, Indonesia', category: 'Geofisika & energi',
    scope: 'Investigasi geolistrik untuk mengenali struktur geologi bawah permukaan pada studi pembangkit listrik tenaga minihidro.',
    overview: 'Survei geolistrik untuk rencana pembangkit listrik tenaga minihidro menelaah variasi resistivitas bawah permukaan yang berkaitan dengan material tanah dan batuan, tingkat pelapukan, serta kemungkinan diskontinuitas geologi. Hasil interpretasi digunakan untuk membangun model bawah permukaan dan mendukung penilaian area infrastruktur.',
    purpose: 'Mendukung pemahaman kondisi geologi bawah permukaan serta penilaian tanah dan batuan bagi fondasi maupun struktur sipil yang direncanakan.',
    activities: ['Akuisisi data geolistrik di lokasi', 'Interpretasi variasi resistivitas bawah permukaan', 'Identifikasi material tanah, batuan, pelapukan, dan diskontinuitas', 'Penyusunan model geologi bawah permukaan untuk kebutuhan studi'],
    image: '/about-slope-clean.webp', imageAlt: 'Kondisi aliran air dan medan lapangan yang relevan dengan studi fasilitas minihidro', imagePosition: 'center 70%',
  },
  {
    number: '06', slug: 'survei-geomagnetik-terengganu', title: 'Survei geomagnetik bijih besi', client: 'LSI Engineering & Consultants Limited — Bathwall Corporation', location: 'Bukit Besi, Terengganu, Malaysia', category: 'Geofisika & eksplorasi',
    scope: 'Akuisisi dan interpretasi medan magnet untuk mengenali anomali serta sasaran eksplorasi bijih besi.',
    overview: 'Survei geomagnetik di Bukit Besi mengumpulkan dan menafsirkan data medan magnet untuk mengenali anomali bawah permukaan yang dapat berkaitan dengan mineralisasi bijih besi dan struktur geologi. Data diproses dan diinterpretasikan untuk membantu delineasi area anomali, pola geologi, dan target eksplorasi.',
    purpose: 'Menyediakan dasar interpretasi bagi penentuan area prospek serta perencanaan kegiatan eksplorasi dan pengeboran lanjutan.',
    activities: ['Akuisisi data medan magnet', 'Pengolahan dan interpretasi respons magnetik', 'Delineasi area dengan respons anomali', 'Penelaahan tren geologi untuk penentuan sasaran eksplorasi'],
    image: '/about-yard-clean.webp', imageAlt: 'Aktivitas lapangan dan peralatan survei pada area kerja terbuka', imagePosition: 'center 48%',
  },
  {
    number: '07', slug: 'investigasi-washbore-dan-fondasi-sumatera-barat', title: 'Investigasi washbore & fondasi', client: 'PT Supreme Energy Muara Laboh', location: 'Sumatera Barat, Indonesia', category: 'Investigasi bawah permukaan',
    scope: 'Pengeboran washbore dan investigasi fondasi untuk memahami stratigrafi serta kondisi rekayasa bawah permukaan.',
    overview: 'Investigasi ini dilakukan melalui pengeboran washbore dan pencatatan kondisi bawah permukaan. Informasi mengenai stratigrafi tanah dan batuan, kedalaman, karakter material, serta observasi selama pengeboran digunakan untuk membangun model bawah permukaan yang dapat diandalkan bagi kebutuhan fondasi.',
    purpose: 'Menyediakan informasi geoteknik lapangan untuk mendukung solusi fondasi yang lebih aman dan sesuai dengan kondisi tanah setempat.',
    activities: ['Pengeboran washbore untuk investigasi fondasi', 'Pencatatan hasil pengeboran dan observasi bawah permukaan', 'Identifikasi stratigrafi, kedalaman, dan karakter material', 'Penyusunan informasi kondisi tanah untuk pertimbangan desain fondasi'],
    image: '/hero-drilling-clean.webp', imageAlt: 'Pekerja dan rig pengeboran pada kegiatan investigasi lapangan', imagePosition: 'center 56%',
  },
]
