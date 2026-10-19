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

export const projects: Project[] = [
  {
    number: '01', slug: 'kajian-geoteknik-tambang-kalimantan-timur-tahap-1', title: 'Kajian geoteknik tambang — tahap 1', client: 'PT Bina Insan Sukses Mandiri', location: 'Kalimantan Timur, Indonesia', category: 'Geoteknik tambang',
    scope: 'Kajian geoteknik, hidrologi, dan hidrogeologi untuk mendukung perencanaan tambang yang aman dan berkelanjutan.',
    overview: 'Pekerjaan tahap pertama menilai kondisi geologi, geoteknik, air permukaan, dan air tanah pada area tambang. Data geologi serta geoteknik yang tersedia ditinjau dan diinterpretasikan, kemudian dipadukan dengan investigasi lapangan dan penilaian rekayasa untuk membangun dasar teknis perencanaan.',
    purpose: 'Menyediakan dasar teknis untuk perencanaan tambang, desain lereng, pengelolaan air, dan pengendalian risiko geoteknik.',
    activities: ['Tinjauan dan interpretasi data geologi serta geoteknik yang tersedia', 'Karakterisasi massa tanah dan batuan', 'Penilaian stabilitas lereng dan risiko geoteknik', 'Evaluasi kondisi hidrologi dan hidrogeologi'],
    image: '/about-slope-clean.png', imageAlt: 'Kondisi lereng dan aliran air di area lapangan', imagePosition: 'center 58%',
  },
  {
    number: '02', slug: 'kajian-geoteknik-tambang-kalimantan-timur-tahap-2', title: 'Kajian geoteknik tambang — tahap 2', client: 'PT Bina Insan Sukses Mandiri', location: 'Kalimantan Timur, Indonesia', category: 'Geoteknik tambang',
    scope: 'Pendalaman kajian kondisi tanah, batuan, dan risiko terkait air untuk mendukung pengembangan tambang.',
    overview: 'Tahap kedua melanjutkan evaluasi kondisi tanah dan batuan serta risiko yang berkaitan dengan air pada area tambang. Kajian memperdalam analisis informasi geologi dan geoteknik, karakteristik massa tanah dan batuan, stabilitas lereng, serta aspek hidrologi-hidrogeologi untuk kebutuhan pengembangan tambang.',
    purpose: 'Memberikan rekomendasi teknis bagi pengembangan tambang, pengelolaan lereng, pengendalian drainase dan air, serta mitigasi risiko.',
    activities: ['Analisis lanjutan informasi geologi dan geoteknik', 'Evaluasi karakteristik tanah dan batuan', 'Penilaian stabilitas lereng dan risiko kondisi air', 'Penyusunan rekomendasi pengembangan tambang dan pengendalian air'],
    image: '/about-yard-clean.png', imageAlt: 'Area kerja dan peralatan lapangan untuk investigasi geoteknik', imagePosition: 'center 52%',
  },
  {
    number: '03', slug: 'kajian-jalan-angkut-sumatera-selatan', title: 'Kajian jalan angkut tambang', client: 'PT Abadi Ogan Cemerlang', location: 'Sumatera Selatan, Indonesia', category: 'Infrastruktur tambang',
    scope: 'Investigasi tanah dasar, pengujian lapangan, dan evaluasi trase jalan angkut tambang.',
    overview: 'Kajian geoteknik ini mendukung pengembangan dan evaluasi jalan angkut tambang. Investigasi lapangan direncanakan dan diawasi untuk memahami kondisi tanah dasar serta sifat rekayasa material di sepanjang trase, sehingga kebutuhan penyiapan badan jalan dan pengelolaan risiko dapat dirumuskan dengan lebih terukur.',
    purpose: 'Memberi masukan geoteknik untuk penyiapan tanah dasar, struktur perkerasan, geometri jalan, drainase, dan pengelolaan risiko.',
    activities: ['Perencanaan dan pengawasan investigasi lapangan', 'Standard Penetration Test (SPT) dan Cone Penetration Test (CPT)', 'Pengambilan sampel serta pengujian laboratorium tanah', 'Evaluasi tanah dasar, trase jalan, geometri, dan kebutuhan drainase'],
    image: '/about-slope-clean.png', imageAlt: 'Kondisi medan dan akses lapangan yang mewakili konteks pekerjaan jalan angkut', imagePosition: 'center 42%',
  },
  {
    number: '04', slug: 'eksplorasi-batugamping-jawa-barat', title: 'Eksplorasi batugamping', client: 'LSI Engineering & Consultants Limited — Bathwall Corporation', location: 'Jawa Barat, Indonesia', category: 'Eksplorasi geologi',
    scope: 'Pengeboran eksplorasi, pencatatan inti bor, dan dokumentasi kondisi litologi batugamping.',
    overview: 'Program pengeboran eksplorasi batugamping mengumpulkan informasi geologi dan geoteknik melalui pencatatan inti bor, penilaian perolehan inti, penanganan sampel, serta dokumentasi litologi. Informasi tersebut digunakan untuk memahami stratigrafi, sebaran, ketebalan, kualitas, dan kesinambungan batugamping.',
    purpose: 'Mendukung evaluasi sumber daya dan pemahaman awal untuk pengembangan tambang batugamping.',
    activities: ['Pengeboran eksplorasi batugamping', 'Pencatatan geologi dan geoteknik inti bor', 'Penilaian perolehan inti serta penanganan sampel', 'Dokumentasi litologi dan interpretasi kondisi bawah permukaan'],
    image: '/WhatsApp Image 2026-10-18 at 10.53.07 PM.jpeg', imageAlt: 'Sampel inti batuan yang tersusun untuk dokumentasi eksplorasi geologi',
  },
  {
    number: '05', slug: 'survei-geolistrik-pltm-jawa-barat', title: 'Survei geolistrik PLTM', client: 'PT Volta Indo Technology', location: 'Pongkor, Jawa Barat, Indonesia', category: 'Geofisika & energi',
    scope: 'Investigasi geolistrik untuk mengenali struktur geologi bawah permukaan pada studi pembangkit listrik tenaga minihidro.',
    overview: 'Survei geolistrik untuk rencana pembangkit listrik tenaga minihidro menelaah variasi resistivitas bawah permukaan yang berkaitan dengan material tanah dan batuan, tingkat pelapukan, serta kemungkinan diskontinuitas geologi. Hasil interpretasi digunakan untuk membangun model bawah permukaan dan mendukung penilaian area infrastruktur.',
    purpose: 'Mendukung pemahaman kondisi geologi bawah permukaan serta penilaian tanah dan batuan bagi fondasi maupun struktur sipil yang direncanakan.',
    activities: ['Akuisisi data geolistrik di lokasi', 'Interpretasi variasi resistivitas bawah permukaan', 'Identifikasi material tanah, batuan, pelapukan, dan diskontinuitas', 'Penyusunan model geologi bawah permukaan untuk kebutuhan studi'],
    image: '/about-slope-clean.png', imageAlt: 'Kondisi aliran air dan medan lapangan yang relevan dengan studi fasilitas minihidro', imagePosition: 'center 70%',
  },
  {
    number: '06', slug: 'survei-geomagnetik-terengganu', title: 'Survei geomagnetik bijih besi', client: 'LSI Engineering & Consultants Limited — Bathwall Corporation', location: 'Bukit Besi, Terengganu, Malaysia', category: 'Geofisika & eksplorasi',
    scope: 'Akuisisi dan interpretasi medan magnet untuk mengenali anomali serta sasaran eksplorasi bijih besi.',
    overview: 'Survei geomagnetik di Bukit Besi mengumpulkan dan menafsirkan data medan magnet untuk mengenali anomali bawah permukaan yang dapat berkaitan dengan mineralisasi bijih besi dan struktur geologi. Data diproses dan diinterpretasikan untuk membantu delineasi area anomali, pola geologi, dan target eksplorasi.',
    purpose: 'Menyediakan dasar interpretasi bagi penentuan area prospek serta perencanaan kegiatan eksplorasi dan pengeboran lanjutan.',
    activities: ['Akuisisi data medan magnet', 'Pengolahan dan interpretasi respons magnetik', 'Delineasi area dengan respons anomali', 'Penelaahan tren geologi untuk penentuan sasaran eksplorasi'],
    image: '/about-yard-clean.png', imageAlt: 'Aktivitas lapangan dan peralatan survei pada area kerja terbuka', imagePosition: 'center 48%',
  },
  {
    number: '07', slug: 'investigasi-washbore-dan-fondasi-sumatera-barat', title: 'Investigasi washbore & fondasi', client: 'PT Supreme Energy Muara Laboh', location: 'Sumatera Barat, Indonesia', category: 'Investigasi bawah permukaan',
    scope: 'Pengeboran washbore dan investigasi fondasi untuk memahami stratigrafi serta kondisi rekayasa bawah permukaan.',
    overview: 'Investigasi ini dilakukan melalui pengeboran washbore dan pencatatan kondisi bawah permukaan. Informasi mengenai stratigrafi tanah dan batuan, kedalaman, karakter material, serta observasi selama pengeboran digunakan untuk membangun model bawah permukaan yang dapat diandalkan bagi kebutuhan fondasi.',
    purpose: 'Menyediakan informasi geoteknik lapangan untuk mendukung solusi fondasi yang lebih aman dan sesuai dengan kondisi tanah setempat.',
    activities: ['Pengeboran washbore untuk investigasi fondasi', 'Pencatatan hasil pengeboran dan observasi bawah permukaan', 'Identifikasi stratigrafi, kedalaman, dan karakter material', 'Penyusunan informasi kondisi tanah untuk pertimbangan desain fondasi'],
    image: '/hero-drilling-clean.png', imageAlt: 'Pekerja dan rig pengeboran pada kegiatan investigasi lapangan', imagePosition: 'center 56%',
  },
]
