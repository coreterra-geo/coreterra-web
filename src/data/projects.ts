export type Project = {
  number: string
  slug: string
  title: string
  location: string
  category: string
  scope: string
  overview: string
  purpose: string
  activities: string[]
  visual: 'slope' | 'road' | 'foundation' | 'resistivity' | 'limestone' | 'magnetic'
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'kajian-geoteknik-tambang-kalimantan-timur',
    title: 'Kajian geoteknik tambang',
    location: 'Kalimantan Timur',
    category: 'Geoteknik tambang',
    scope: 'Kajian geoteknik, hidrologi, dan hidrogeologi untuk perencanaan tambang.',
    overview: 'Pekerjaan tahap pertama dan kedua ini mengkaji kondisi tanah, batuan, air permukaan, dan air tanah pada area tambang. Informasi dari investigasi dan data yang tersedia diintegrasikan untuk mendukung penilaian geoteknik dan pengelolaan air.',
    purpose: 'Menyediakan dasar teknis bagi perencanaan tambang, pengelolaan lereng dan air, serta identifikasi risiko geoteknik.',
    activities: ['Tinjauan data geologi dan geoteknik yang tersedia', 'Karakterisasi massa tanah dan batuan', 'Penilaian stabilitas lereng dan risiko geoteknik', 'Evaluasi hidrologi serta hidrogeologi'],
    visual: 'slope',
  },
  {
    number: '02',
    slug: 'kajian-jalan-angkut-sumatera-selatan',
    title: 'Kajian jalan angkut tambang',
    location: 'Sumatera Selatan',
    category: 'Infrastruktur tambang',
    scope: 'Investigasi tanah dasar, pengujian lapangan, dan evaluasi trase jalan.',
    overview: 'Kajian geoteknik ini mendukung pengembangan dan evaluasi jalan angkut tambang. Investigasi lapangan direncanakan dan diawasi untuk memahami kondisi tanah dasar serta sifat rekayasa material di sepanjang trase.',
    purpose: 'Memberi masukan geoteknik untuk penyiapan tanah dasar, struktur perkerasan, geometri jalan, dan pertimbangan drainase.',
    activities: ['Perencanaan dan pengawasan investigasi lapangan', 'Standard Penetration Test (SPT) dan Cone Penetration Test (CPT)', 'Pengambilan sampel dan pengujian laboratorium tanah', 'Evaluasi kondisi tanah dasar serta trase jalan'],
    visual: 'road',
  },
  {
    number: '03',
    slug: 'investigasi-fondasi-sumatera-barat',
    title: 'Investigasi fondasi',
    location: 'Sumatera Barat',
    category: 'Investigasi bawah permukaan',
    scope: 'Pengeboran washbore dan karakterisasi tanah serta batuan bawah permukaan.',
    overview: 'Investigasi fondasi dilakukan melalui pengeboran washbore untuk memperoleh informasi stratigrafi, kedalaman, dan karakter material bawah permukaan yang relevan bagi perencanaan infrastruktur.',
    purpose: 'Menyediakan informasi geoteknik lapangan untuk penilaian kondisi tanah dan pertimbangan desain fondasi.',
    activities: ['Pengeboran washbore', 'Pencatatan hasil pengeboran dan pengamatan bawah permukaan', 'Karakterisasi lapisan tanah dan batuan', 'Penyusunan informasi kondisi tanah untuk penilaian fondasi'],
    visual: 'foundation',
  },
  {
    number: '04',
    slug: 'survei-geolistrik-pltm-jawa-barat',
    title: 'Survei geolistrik PLTM',
    location: 'Pongkor, Jawa Barat',
    category: 'Geofisika & energi',
    scope: 'Interpretasi resistivitas untuk mendukung penilaian kondisi geologi lokasi.',
    overview: 'Survei geolistrik untuk rencana pembangkit listrik tenaga minihidro ini menelaah variasi resistivitas bawah permukaan yang berkaitan dengan material tanah dan batuan, pelapukan, serta kemungkinan diskontinuitas geologi.',
    purpose: 'Mendukung pemahaman model geologi bawah permukaan dan penilaian kondisi tanah bagi area infrastruktur yang direncanakan.',
    activities: ['Akuisisi data geolistrik di lokasi', 'Interpretasi variasi resistivitas bawah permukaan', 'Identifikasi kondisi geologi yang relevan', 'Penyusunan model geologi bawah permukaan'],
    visual: 'resistivity',
  },
  {
    number: '05',
    slug: 'eksplorasi-batugamping-jawa-barat',
    title: 'Eksplorasi batugamping',
    location: 'Jawa Barat',
    category: 'Eksplorasi geologi',
    scope: 'Pengeboran, pencatatan inti bor, dan dokumentasi kondisi litologi.',
    overview: 'Program pengeboran eksplorasi batugamping mengumpulkan informasi geologi bawah permukaan melalui pengamatan inti bor dan dokumentasi litologi yang dijumpai.',
    purpose: 'Membantu pemahaman stratigrafi, sebaran, ketebalan, dan kesinambungan geologi batugamping untuk evaluasi lebih lanjut.',
    activities: ['Pengeboran eksplorasi', 'Pencatatan geologi dan geoteknik inti bor', 'Penilaian perolehan inti serta penanganan sampel', 'Dokumentasi litologi bawah permukaan'],
    visual: 'limestone',
  },
  {
    number: '06',
    slug: 'survei-geomagnetik-terengganu',
    title: 'Survei geomagnetik bijih besi',
    location: 'Bukit Besi, Terengganu',
    category: 'Geofisika & eksplorasi',
    scope: 'Akuisisi dan interpretasi anomali magnetik untuk sasaran eksplorasi.',
    overview: 'Survei geomagnetik di Bukit Besi, Malaysia, mengumpulkan dan menafsirkan data medan magnet untuk mengenali anomali bawah permukaan yang mungkin berhubungan dengan mineralisasi bijih besi dan struktur geologi.',
    purpose: 'Mendukung identifikasi area prospek dan perencanaan kegiatan eksplorasi lanjutan.',
    activities: ['Akuisisi data medan magnet', 'Pengolahan dan interpretasi respons magnetik', 'Delineasi area dengan respons anomali', 'Penelaahan pola geologi untuk sasaran eksplorasi'],
    visual: 'magnetic',
  },
]
