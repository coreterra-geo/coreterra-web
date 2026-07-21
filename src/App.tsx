import React, { useState, useEffect, useCallback, useMemo } from 'react';
import FloatingWhatsApp from "./FloatingWhatsapp.tsx";

// 1. Tipe Data & Kamus Bahasa
type Language = 'ID' | 'EN';

interface ContentDictionary {
    seo: {
        title: string;
        description: string;
        keywords: string;
        ogSiteName: string;
    };
    nav: {
        about: string;
        projects: string;
        advantage: string;
        contact: string;
        cta: string;
    };
    hero: {
        badge: string;
        title: string;
        desc: string;
        cta: string;
    };
    stats: {
        yearsLabel: string;
        yearsSub: string;
        projectsLabel: string;
        projectsSub: string;
        expertsLabel: string;
        expertsSub: string;
        ltiLabel: string;
        ltiSub: string;
    };
    about: {
        subtitle: string;
        title: string;
        desc1: string;
        desc2: string;
        visionTitle: string;
        visionDesc: string;
        missionTitle: string;
        missionDesc: string;
    };
    projects: {
        subtitle: string;
        title: string;
        desc: string;
        items: Array<{
            title: string;
            location: string;
            category: string;
            desc: string;
            image: string;
        }>;
    };
    advantages: {
        subtitle: string;
        title: string;
        items: Array<{
            title: string;
            desc: string;
            icon: string;
        }>;
    };
    contact: {
        subtitle: string;
        title: string;
        desc: string;
        form: {
            name: string;
            email: string;
            company: string;
            message: string;
            submit: string;
        };
        info: {
            addressTitle: string;
            address: string;
            emailTitle: string;
            phoneTitle: string;
        };
    };
    footer: {
        rights: string;
        tagline: string;
    };
}

const content: Record<Language, ContentDictionary> = {
    ID: {
        seo: {
            title: 'PT Coreterra - Konsultan Geoteknik Tambang, Geologi & Geofisika',
            description: 'PT Coreterra menyediakan jasa konsultasi geoteknik tambang, investigasi geologi, geofisika, pengeboran, dan mekanika batuan untuk pertambangan dan teknik sipil di Indonesia.',
            keywords: 'konsultan geoteknik, geoteknik tambang, mekanika batuan, geologi, geofisika, kestabilan lereng, analisis TSF, jasa pengeboran tambang, coreterra geo engineering',
            ogSiteName: 'PT Coreterra Geo Engineering'
        },
        nav: {
            about: 'PROFIL',
            projects: 'PORTOFOLIO',
            advantage: 'KEUNGGULAN',
            contact: 'KONTAK',
            cta: 'KONSULTASI'
        },
        hero: {
            badge: 'CORETERRA GEO ENGINEERING',
            title: 'MEWUJUDKAN VISI ANDA',
            desc: 'Solusi di bidang Teknik Geoteknik, Geologi, Geofisika, Pengeboran, dan Analisis Data untuk Sektor Pertambangan dan Teknik Sipil.',
            cta: 'Konsultasi Sekarang'
        },
        stats: {
            yearsLabel: 'Tahun Pengalaman',
            yearsSub: 'Dedikasi Geoteknik Tambang',
            projectsLabel: 'Proyek Selesai',
            projectsSub: 'Pit Slope, TSF & Disposal',
            expertsLabel: 'Tenaga Ahli',
            expertsSub: 'Bersertifikat PERHAPI & KCMI',
            ltiLabel: 'Rekor Safety',
            ltiSub: 'Zero Accident di Area Tambang'
        },
        about: {
            subtitle: 'PROFIL PERUSAHAAN',
            title: 'Mitra Strategis Kestabilan Tambang & Mitigasi Risiko Geoteknik',
            desc1: 'PT Coreterra hadir sebagai penyedia layanan konsultasi dan investigasi geoteknik tambang terdepan. Kami menggabungkan keahlian lapangan, pengujian laboratorium mekanika batuan, serta pemodelan numerik lanjutan untuk memberikan rekomendasi desain lereng yang aman dan ekonomis.',
            desc2: 'Dengan pendekatan berbasis data dan standar keselamatan tertinggi, kami membantu perusahaan pertambangan memaksimalkan perolehan cadangan (ore recovery) tanpa mengorbankan kestabilan operasional.',
            visionTitle: 'Visi Kami',
            visionDesc: 'Menjadi konsultan geoteknik dan mekanika batuan acuan utama di Asia Tenggara dengan mengedepankan inovasi teknologi dan ketepatan analisis.',
            missionTitle: 'Misi Kami',
            missionDesc: 'Memberikan solusi rekayasa geoteknik yang aplikatif, efisien, serta berstandar internasional guna mendukung pertambangan yang aman dan berkelanjutan.'
        },
        projects: {
            subtitle: 'PORTOFOLIO PROYEK',
            title: 'Rekam Jejak Keberhasilan Rekayasa Geoteknik',
            desc: 'Beberapa studi kasus dan proyek strategis yang telah berhasil diselesaikan oleh tim tenaga ahli kami di berbagai medan pertambangan.',
            items: [
                {
                    title: 'Stabilitas Lereng Highwall 250m',
                    location: 'Kalimantan Timur',
                    category: 'Pit Slope',
                    desc: 'Optimasi sudut kemiringan lereng tambang batubara terbuka menggunakan pemodelan numerik FLAC3D.',
                    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'Audit Geoteknik & Likuifaksi TSF',
                    location: 'Sumbawa, NTB',
                    category: 'TSF Dam',
                    desc: 'Analisis kesetimbangan batas untuk mitigasi kelongsoran dan keamanan bendungan tailing.',
                    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'Investigasi Geofisika & Penirisan Disposal',
                    location: 'Halmahera, Maluku Utara',
                    category: 'Disposal Area',
                    desc: 'Perancangan kapasitas tampung waste dump dan sistem drainase anti-erosi curah hujan tinggi.',
                    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'Geoteknik Terowongan & Underground Mining',
                    location: 'Tembagapura, Papua',
                    category: 'Underground Geotech',
                    desc: 'Analisis tegangan batuan dan perancangan sistem penyanggaan (rock bolting & shotcrete) pada terowongan tambang bawah tanah.',
                    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'Investigasi Kestabilan Lereng Jalan Tambang',
                    location: 'Lahad, Sumatera Selatan',
                    category: 'Haul Road Geotech',
                    desc: 'Evaluasi daya dukung tanah dasar dan mitigasi kelongsoran pada jalur angkut alat berat (haul road) berkapasitas 100 ton.',
                    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80'
                }
            ]
        },
        advantages: {
            subtitle: 'MENGAPA MEMILIH KAMI',
            title: 'Keunggulan Kompetitif PT Coreterra',
            items: [
                {
                    title: 'Tenaga Ahli Bersertifikat KCMI & PERHAPI',
                    desc: 'Didukung oleh jajaran engineer senior dengan sertifikasi kompetensi resmi sebagai Competent Person Indonesia (CPI).',
                    icon: '🎖️'
                },
                {
                    title: 'Teknologi Pemodelan 3D Terkini',
                    desc: 'Menggunakan perangkat lunak geoteknik standar industri global (FLAC3D, RS3, Slide2, RocScience Suite) untuk akurasi presisi tinggi.',
                    icon: '💻'
                },
                {
                    title: 'Laboratorium Mekanika Batuan Terintegrasi',
                    desc: 'Akses langsung ke pengujian sifat fisik dan mekanik batuan (UCS, Triaxial, Direct Shear) dengan standar ASTM dan ISRM.',
                    icon: '🔬'
                },
                {
                    title: 'Fokus pada Optimasi & Efisiensi Biaya',
                    desc: 'Rekomendasi teknis kami dirancang untuk menyeimbangkan faktor keamanan (Safety Factor) dengan stripping ratio yang ekonomis.',
                    icon: '📈'
                }
            ]
        },
        contact: {
            subtitle: 'HUBUNGI KAMI',
            title: 'Diskusikan Kebutuhan Geoteknik Tambang Anda',
            desc: 'Tim ahli kami siap memberikan evaluasi awal dan solusi rekayasa terbaik untuk proyek pertambangan Anda.',
            form: {
                name: 'Nama Lengkap',
                email: 'Alamat Email',
                company: 'Nama Perusahaan / Tambang',
                message: 'Jelaskan Kebutuhan Proyek Anda',
                submit: 'Kirim Pesan Konsultasi'
            },
            info: {
                addressTitle: 'Kantor Pusat',
                address: 'Ciputat, Tangerang Selatan, Banten, Indonesia, Kode Pos 15411',
                emailTitle: 'Email Resmi',
                phoneTitle: 'Telepon / WhatsApp'
            }
        },
        footer: {
            rights: 'Hak Cipta Dilindungi Undang-Undang.',
            tagline: 'Precision Geotechnics for Sustainable Mining.'
        }
    },
    EN: {
        seo: {
            title: 'PT Coreterra - Mining Geotechnics, Geology & Geophysics Consultants',
            description: 'PT Coreterra provides geotechnical engineering, geology, geophysics, drilling, and rock mechanics consulting services for mining and civil engineering.',
            keywords: 'geotechnical consultant, mining geotechnics, rock mechanics, geology, geophysics, slope stability, TSF analysis, drilling services, coreterra geo engineering',
            ogSiteName: 'PT Coreterra Geo Engineering'
        },
        nav: {
            about: 'PROFILE',
            projects: 'PORTFOLIO',
            advantage: 'ADVANTAGES',
            contact: 'CONTACT',
            cta: 'CONSULTING'
        },
        hero: {
            badge: 'CORETERRA GEO ENGINEERING',
            title: 'GROUNDING YOUR VISION',
            desc: 'Solutions in Geotechnical Engineering, Geology, Geophysics, Drilling, and Data Analysis for Mining and Civil Engineering.',
            cta: 'Consult Now'
        },
        stats: {
            yearsLabel: 'Years Experience',
            yearsSub: 'Dedicated Mining Geotechnics',
            projectsLabel: 'Projects Completed',
            projectsSub: 'Pit Slope, TSF & Disposal',
            expertsLabel: 'Expert Engineers',
            expertsSub: 'PERHAPI & KCMI Certified',
            ltiLabel: 'Safety Record',
            ltiSub: 'Zero Accident in Mine Sites'
        },
        about: {
            subtitle: 'COMPANY PROFILE',
            title: 'Your Strategic Partner in Mine Stability & Geotechnical Risk Mitigation',
            desc1: 'PT Coreterra is a premier provider of mining geotechnical consulting and investigation services. We integrate field expertise, rock mechanics laboratory testing, and advanced numerical modeling to deliver safe and economical slope design recommendations.',
            desc2: 'With a data-driven approach and the highest safety standards, we assist mining companies in maximizing ore recovery without compromising operational stability.',
            visionTitle: 'Our Vision',
            visionDesc: 'To be the leading geotechnical and rock mechanics consultancy in Southeast Asia by prioritizing technological innovation and analytical precision.',
            missionTitle: 'Our Mission',
            missionDesc: 'To provide applicable, efficient, and internationally standardized geotechnical engineering solutions to support safe and sustainable mining.'
        },
        projects: {
            subtitle: 'PROJECT PORTFOLIO',
            title: 'Proven Track Record in Geotechnical Engineering',
            desc: 'Selected case studies and strategic projects successfully delivered by our expert engineering team across various mining terrains.',
            items: [
                {
                    title: '250m Deep Highwall Slope Stability',
                    location: 'East Kalimantan',
                    category: 'Pit Slope',
                    desc: 'Optimization of open-pit coal mine slope angles using FLAC3D numerical modeling.',
                    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'TSF Dam Geotechnical & Liquefaction Audit',
                    location: 'Sumbawa, NTB',
                    category: 'TSF Dam',
                    desc: 'Limit equilibrium analysis to mitigate slope failure risks and ensure tailing dam safety.',
                    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'Geophysics & Disposal Drainage Investigation',
                    location: 'Halmahera, North Maluku',
                    category: 'Disposal Area',
                    desc: 'High-capacity waste dump design and anti-erosion drainage under heavy rainfall conditions.',
                    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'Underground Mining & Tunnel Geotechnics',
                    location: 'Tembagapura, Papua',
                    category: 'Underground Geotech',
                    desc: 'Rock stress analysis and ground support system design (rock bolting & shotcrete) in underground mining tunnels.',
                    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
                },
                {
                    title: 'Haul Road Slope Stability Investigation',
                    location: 'Lahad, South Sumatra',
                    category: 'Haul Road Geotech',
                    desc: 'Subgrade bearing capacity evaluation and slope failure mitigation for 100-ton capacity heavy equipment haul roads.',
                    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80'
                }
            ]
        },
        advantages: {
            subtitle: 'WHY CHOOSE US',
            title: 'PT Coreterra Competitive Advantages',
            items: [
                {
                    title: 'KCMI & PERHAPI Certified Experts',
                    desc: 'Supported by senior engineers holding official competency certifications as Indonesian Competent Persons (CPI).',
                    icon: '🎖️'
                },
                {
                    title: 'State-of-the-Art 3D Modeling Tech',
                    desc: 'Utilizing global industry-standard geotechnical software (FLAC3D, RS3, Slide2, RocScience Suite) for high precision.',
                    icon: '💻'
                },
                {
                    title: 'Integrated Rock Mechanics Laboratory',
                    desc: 'Direct access to physical and mechanical rock property testing (UCS, Triaxial, Direct Shear) compliant with ASTM and ISRM.',
                    icon: '🔬'
                },
                {
                    title: 'Focus on Optimization & Cost Efficiency',
                    desc: 'Our technical recommendations are tailored to balance the Factor of Safety (FoS) with an economical stripping ratio.',
                    icon: '📈'
                }
            ]
        },
        contact: {
            subtitle: 'CONTACT US',
            title: 'Discuss Your Mining Geotechnical Needs',
            desc: 'Our engineering team is ready to provide preliminary evaluations and optimal engineering solutions for your mining project.',
            form: {
                name: 'Full Name',
                email: 'Email Address',
                company: 'Company / Mine Name',
                message: 'Describe Your Project Requirements',
                submit: 'Send Consulting Inquiry'
            },
            info: {
                addressTitle: 'Headquarters',
                address: 'Ciputat, South Tangerang, Banteng, Indonesia, ZIP Code 15411',
                emailTitle: 'Official Email',
                phoneTitle: 'Phone / WhatsApp'
            }
        },
        footer: {
            rights: 'All Rights Reserved.',
            tagline: 'Precision Geotechnics for Sustainable Mining.'
        }
    }
};

// 2. Komponen SEO & Schema Markup (Dioptimasi dengan React.memo agar tidak re-render berlebih)
interface SEOProps {
    lang: Language;
    seoData: ContentDictionary['seo'];
}

const SEO: React.FC<SEOProps> = React.memo(({ lang, seoData }) => {
    useEffect(() => {
        document.title = seoData.title;

        const setMetaTag = (attrName: string, attrValue: string, contentStr: string) => {
            let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attrName, attrValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', contentStr);
        };

        setMetaTag('name', 'description', seoData.description);
        setMetaTag('name', 'keywords', seoData.keywords);
        setMetaTag('name', 'robots', 'index, follow');
        setMetaTag('name', 'author', 'PT Coreterra Geo Engineering');
        document.documentElement.lang = lang.toLowerCase();

        setMetaTag('property', 'og:title', seoData.title);
        setMetaTag('property', 'og:description', seoData.description);
        setMetaTag('property', 'og:type', 'website');
        setMetaTag('property', 'og:site_name', seoData.ogSiteName);
        setMetaTag('property', 'og:locale', lang === 'ID' ? 'id_ID' : 'en_US');

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', window.location.href);

        const setHreflang = (hreflang: string, url: string) => {
            let link = document.querySelector(`link[hreflang="${hreflang}"]`);
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'alternate');
                link.setAttribute('hreflang', hreflang);
                document.head.appendChild(link);
            }
            link.setAttribute('href', url);
        };
        const currentUrl = window.location.origin + window.location.pathname;
        setHreflang('id', currentUrl + '?lang=ID');
        setHreflang('en', currentUrl + '?lang=EN');
        setHreflang('x-default', currentUrl);

        const schemaData = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "PT Coreterra Geo Engineering",
            "alternateName": "Coreterra",
            "description": seoData.description,
            "url": window.location.origin,
            "logo": `${window.location.origin}/logo.png`,
            "telephone": "+6281214914641",
            "email": "admin.cge@coreterra-geo.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ciputat",
                "addressLocality": "Tangerang Selatan",
                "addressRegion": "Banten",
                "postalCode": "15411",
                "addressCountry": "ID"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": -6.3121,
                "longitude": 106.7441
            },
            "priceRange": "$$$",
            "areaServed": ["Indonesia", "Southeast Asia"],
            "sameAs": [
                "https://www.linkedin.com/company/coreterra"
            ]
        };

        let scriptTag = document.querySelector('#seo-schema-jsonld') as HTMLScriptElement;
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.id = 'seo-schema-jsonld';
            scriptTag.type = 'application/ld+json';
            document.head.appendChild(scriptTag);
        }
        scriptTag.text = JSON.stringify(schemaData);
    }, [lang, seoData]);

    return null;
});
SEO.displayName = 'SEO';

// 3. Komponen Navbar (Memoized)
interface NavbarProps {
    lang: Language;
    setLang: (lang: Language) => void;
    t: ContentDictionary['nav'];
}

const Navbar: React.FC<NavbarProps> = React.memo(({ lang, setLang, t }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = useMemo(() => [
        { name: t.about, href: '#about' },
        { name: t.projects, href: '#projects' },
        { name: t.advantage, href: '#advantage' },
        { name: t.contact, href: '#contact' },
    ], [t]);

    const handleLangChange = useCallback((newLang: Language) => {
        setLang(newLang);
    }, [setLang]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs transition-all">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <a href="#" className="flex items-center space-x-3 group" aria-label="PT Coreterra Homepage">
                            <img
                                src="/logo.png"
                                alt="PT Coreterra Logo - Geotechnical Engineering"
                                width="48"
                                height="48"
                                decoding="async"
                                className="h-10 sm:h-12 w-auto cursor-pointer transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="text-xl sm:text-2xl font-black tracking-tighter text-coreterra-blue">
                                CORE<span className="text-coreterra-brown">TERRA</span>
                            </span>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-6 mr-4">
                            {navItems.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    className="text-gray-700 hover:text-coreterra-brown px-1 py-2 text-sm font-semibold tracking-wider transition-colors duration-200"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                            <button
                                type="button"
                                onClick={() => handleLangChange('ID')}
                                aria-label="Ganti bahasa ke Bahasa Indonesia"
                                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                                    lang === 'ID' ? 'bg-coreterra-blue text-white shadow-xs' : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                ID
                            </button>
                            <button
                                type="button"
                                onClick={() => handleLangChange('EN')}
                                aria-label="Switch language to English"
                                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                                    lang === 'EN' ? 'bg-coreterra-blue text-white shadow-xs' : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                EN
                            </button>
                        </div>

                        <a
                            href="#contact"
                            className="bg-coreterra-brown text-white px-6 py-2.5 rounded font-bold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-200 shadow-sm hover:shadow"
                        >
                            {t.cta}
                        </a>
                    </div>

                    <div className="flex items-center space-x-3 md:hidden">
                        <button
                            type="button"
                            onClick={() => handleLangChange(lang === 'ID' ? 'EN' : 'ID')}
                            aria-label="Toggle Language"
                            className="bg-gray-100 border border-gray-300 text-gray-800 px-3 py-1.5 rounded text-xs font-bold"
                        >
                            {lang === 'ID' ? '🇮🇩 ID' : '🇬🇧 EN'}
                        </button>

                        <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="text-gray-800 hover:text-coreterra-brown p-2 focus:outline-none"
                            aria-label="Toggle Mobile Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
                    {navItems.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-gray-800 font-semibold text-sm hover:bg-gray-50 rounded-md transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="pt-2">
                        <a
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full block text-center bg-coreterra-brown text-white px-4 py-3 rounded font-bold text-xs tracking-widest uppercase shadow-sm"
                        >
                            {t.cta}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
});
Navbar.displayName = 'Navbar';

// 4. Komponen Hero (Memoized)
interface HeroProps {
    t: ContentDictionary['hero'];
}

const Hero: React.FC<HeroProps> = React.memo(({ t }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section aria-label="Hero Section" className="bg-coreterra-blue text-white pt-12 pb-28 md:pt-16 md:pb-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <style>{`
                @keyframes floatSlow {
                    0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
                    50% { transform: translate3d(0, -12px, 0) rotate(1deg); }
                }
                @keyframes pulseSlow {
                    0%, 100% { opacity: 0.08; transform: scale(1) translate3d(0, -50%, 0); }
                    50% { opacity: 0.12; transform: scale(1.03) translate3d(0, -50%, 0); }
                }
                .animate-float { animation: floatSlow 7s ease-in-out infinite; will-change: transform; }
                .animate-watermark { animation: pulseSlow 5s ease-in-out infinite; will-change: transform, opacity; }
            `}</style>

            <div className="absolute left-0 bottom-0 top-0 w-full md:w-1/2 pointer-events-none opacity-15 animate-float" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-100 600 L200 200 L400 450 L550 150 L800 600 Z" stroke="#ffffff" strokeWidth="2" />
                    <path d="M0 600 L150 350 L300 500 L450 250 L650 600 Z" stroke="#ffffff" strokeWidth="1.5" />
                    <path d="M100 200 L200 400 L350 200 L500 450" stroke="#ffffff" strokeWidth="1" />
                    <line x1="200" y1="200" x2="200" y2="600" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="550" y1="150" x2="550" y2="600" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="450" y1="250" x2="150" y2="600" stroke="#ffffff" strokeWidth="1" />
                </svg>
            </div>

            <div className="absolute -right-10 top-1/2 z-0 pointer-events-none select-none animate-watermark" aria-hidden="true">
                <img
                    src="/logo.png"
                    alt=""
                    width="400"
                    height="400"
                    decoding="async"
                    className="h-[280px] md:h-[400px] w-auto max-w-none grayscale brightness-200"
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
                <div
                    className={`inline-flex items-center space-x-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-widest text-gray-200 uppercase mb-5 backdrop-blur-xs transition-all duration-700 transform ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <span className="w-2 h-2 rounded-full bg-coreterra-brown animate-ping inline-block"></span>
                    <span>{t.badge}</span>
                </div>

                <h1
                    className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-[1.15] mb-5 uppercase text-white transition-all duration-700 delay-150 transform ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    {t.title}
                </h1>

                <p
                    className={`text-sm md:text-lg text-gray-200 mb-8 max-w-2xl font-normal leading-relaxed transition-all duration-700 delay-300 transform ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    {t.desc}
                </p>

                <div
                    className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-700 delay-500 transform ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                >
                    <a
                        href="#contact"
                        className="bg-coreterra-brown text-white px-8 py-3.5 rounded font-bold text-xs md:text-sm tracking-wider uppercase hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 text-center"
                    >
                        {t.cta}
                    </a>
                </div>
            </div>
        </section>
    );
});
Hero.displayName = 'Hero';

// 5. Komponen Stats (Memoized)
interface StatsProps {
    t: ContentDictionary['stats'];
}

const Stats: React.FC<StatsProps> = React.memo(({ t }) => {
    const statsData = useMemo(() => [
        { value: '15+', label: t.yearsLabel, sublabel: t.yearsSub },
        { value: '350+', label: t.projectsLabel, sublabel: t.projectsSub },
        { value: '50+', label: t.expertsLabel, sublabel: t.expertsSub },
        { value: 'ZERO', label: t.ltiLabel, sublabel: t.ltiSub },
    ], [t]);

    return (
        <section aria-label="Company Statistics" className="relative z-20 -mt-16 md:-mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    {statsData.map((item, index) => (
                        <div key={index} className={`text-center ${index > 0 ? 'pt-4 sm:pt-0 sm:px-4' : 'sm:pr-4'}`}>
                            <p className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{item.value}</p>
                            <p className="text-sm font-bold text-gray-800 mt-1 uppercase tracking-wider">{item.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.sublabel}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
Stats.displayName = 'Stats';

// 6. Komponen Profil (About) (Memoized)
interface AboutProps {
    t: ContentDictionary['about'];
}

const About: React.FC<AboutProps> = React.memo(({ t }) => {
    return (
        <section id="about" className="py-20 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <span className="text-xs font-bold tracking-widest text-coreterra-brown uppercase block mb-2">{t.subtitle}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">{t.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4 text-base">{t.desc1}</p>
                    <p className="text-gray-600 leading-relaxed mb-8 text-base">{t.desc2}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-coreterra-blue hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">{t.visionTitle}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{t.visionDesc}</p>
                    </article>
                    <article className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-coreterra-brown hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">{t.missionTitle}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{t.missionDesc}</p>
                    </article>
                </div>
            </div>
        </section>
    );
});
About.displayName = 'About';

// 7. Komponen Portofolio (Projects - Dioptimasi dengan GPU Hardware Acceleration & Debounced Resize)
interface ProjectsProps {
    t: ContentDictionary['projects'];
}

const Projects: React.FC<ProjectsProps> = React.memo(({ t }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [itemsPerView, setItemsPerView] = useState(1);

    // 1. Deteksi responsif layar dengan Debounce agar tidak membebani UI/CPU saat di-resize
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const updateItemsPerView = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setItemsPerView(3);
            } else if (width >= 768) {
                setItemsPerView(2);
            } else {
                setItemsPerView(1);
            }
        };

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateItemsPerView, 150);
        };

        updateItemsPerView();
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const maxIndex = useMemo(() => Math.max(0, t.items.length - itemsPerView), [t.items.length, itemsPerView]);
    const safeIndex = Math.min(currentIndex, maxIndex);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => {
            const currentSafe = Math.min(prev, maxIndex);
            return currentSafe >= maxIndex ? 0 : currentSafe + 1;
        });
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => {
            const currentSafe = Math.min(prev, maxIndex);
            return currentSafe <= 0 ? maxIndex : currentSafe - 1;
        });
    }, [maxIndex]);

    // 2. Timer Auto-Play (Berhenti otomatis saat kursor di atas slider)
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 3500);

        return () => clearInterval(timer);
    }, [isHovered, nextSlide]);

    return (
        <section id="projects" className="py-24 bg-gray-50 border-t border-gray-200 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold tracking-widest text-coreterra-brown uppercase block mb-2">
                            {t.subtitle}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                            {t.title}
                        </h2>
                        <p className="text-gray-600 text-base">{t.desc}</p>
                    </div>

                    <div className="flex items-center space-x-3 mt-6 md:mt-0">
                        <button
                            type="button"
                            onClick={prevSlide}
                            aria-label="Previous Project"
                            className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-coreterra-brown hover:text-white hover:border-coreterra-brown transition-all duration-200 shadow-sm cursor-pointer"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next Project"
                            className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-coreterra-brown hover:text-white hover:border-coreterra-brown transition-all duration-200 shadow-sm cursor-pointer"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* --- SLIDER TRACK (Dioptimasi dengan translate3d untuk Akselerasi GPU 60 FPS) --- */}
                <div
                    className="relative -mx-3"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className="flex transition-transform duration-700 ease-in-out will-change-transform"
                        style={{ transform: `translate3d(-${safeIndex * (100 / itemsPerView)}%, 0, 0)` }}
                    >
                        {t.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 px-3 transition-all duration-300"
                                style={{ width: `${100 / itemsPerView}%` }}
                            >
                                <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between border border-gray-100 hover:-translate-y-2 h-full">
                                    <div>
                                        {/* Gambar Dioptimasi dengan decoding async, fetchPriority, dan Dimensi Eksplisit (Mencegah CLS) */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                loading={idx === 0 ? "eager" : "lazy"}
                                                decoding="async"
                                                fetchPriority={idx === 0 ? "high" : "low"}
                                                width="600"
                                                height="400"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4 bg-coreterra-blue/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow">
                                                {item.category}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="text-xs font-semibold text-coreterra-brown mb-1">📍 {item.location}</p>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-coreterra-blue transition-colors duration-200">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-4">
                                        <span className="text-xs font-bold text-gray-400">Case Study #{idx + 1}</span>
                                        <a
                                            href="#contact"
                                            className="text-xs font-extrabold text-coreterra-brown group-hover:translate-x-1 transition-transform duration-200 inline-block"
                                        >
                                            Detail &rarr;
                                        </a>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- INDIKATOR PAGINATION DOTS --- */}
                <div className="flex justify-center items-center space-x-2 mt-10">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                safeIndex === idx
                                    ? 'w-8 bg-coreterra-brown shadow-sm'
                                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
});
Projects.displayName = 'Projects';

// 8. Komponen Keunggulan (Advantages) (Memoized)
interface AdvantagesProps {
    t: ContentDictionary['advantages'];
}

const Advantages: React.FC<AdvantagesProps> = React.memo(({ t }) => {
    return (
        <section id="advantage" className="py-20 bg-coreterra-blue text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold tracking-widest text-coreterra-brown uppercase block mb-2">{t.subtitle}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t.title}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.items.map((adv, idx) => (
                        <article key={idx} className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-xs hover:bg-white/10 transition-colors duration-200">
                            <div className="text-3xl mb-4" aria-hidden="true">{adv.icon}</div>
                            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide">{adv.title}</h3>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{adv.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
});
Advantages.displayName = 'Advantages';

// 9. Komponen Kontak (Contact) (Memoized)
interface ContactProps {
    t: ContentDictionary['contact'];
}

const Contact: React.FC<ContactProps> = React.memo(({ t }) => {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <span className="text-xs font-bold tracking-widest text-coreterra-brown uppercase block mb-2">{t.subtitle}</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">{t.title}</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">{t.desc}</p>

                        <address className="space-y-6 not-italic">
                            <div className="flex items-start space-x-4">
                                <div className="bg-coreterra-blue text-white p-3 rounded-lg text-lg" aria-hidden="true">🏢</div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t.info.addressTitle}</h3>
                                    <p className="text-gray-600 text-sm mt-0.5">{t.info.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-coreterra-blue text-white p-3 rounded-lg text-lg" aria-hidden="true">✉️</div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t.info.emailTitle}</h3>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        <a href="mailto:admin.cge@coreterra-geo.com" className="hover:text-coreterra-brown underline transition-colors duration-200">
                                            admin.cge@coreterra-geo.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-coreterra-blue text-white p-3 rounded-lg text-lg" aria-hidden="true">📞</div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t.info.phoneTitle}</h3>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        <a href="tel:+6281214914641" className="hover:text-coreterra-brown underline transition-colors duration-200">
                                            +62 812-1491-4641
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </address>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4" aria-label="Contact Form">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">{t.form.name}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-2 focus:ring-coreterra-blue focus:border-transparent outline-none text-sm transition-shadow duration-200"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">{t.form.email}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-2 focus:ring-coreterra-blue focus:border-transparent outline-none text-sm transition-shadow duration-200"
                                        placeholder="john@miningco.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">{t.form.company}</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-2 focus:ring-coreterra-blue focus:border-transparent outline-none text-sm transition-shadow duration-200"
                                        placeholder="PT Tambang Makmur"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">{t.form.message}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-2 focus:ring-coreterra-blue focus:border-transparent outline-none text-sm transition-shadow duration-200"
                                    placeholder="Analisis kestabilan lereng pit / konsultasi TSF..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-coreterra-brown text-white py-3 rounded font-bold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-200 shadow-md cursor-pointer active:scale-[0.99]"
                            >
                                {t.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
});
Contact.displayName = 'Contact';

// 10. Komponen Footer (Memoized)
interface FooterProps {
    t: ContentDictionary['footer'];
}

const Footer: React.FC<FooterProps> = React.memo(({ t }) => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <a href="#" className="text-xl font-black tracking-tighter text-white" aria-label="PT Coreterra Homepage">
                        CORE<span className="text-coreterra-brown">TERRA</span>
                    </a>
                    <p className="text-xs text-gray-400 mt-1">{t.tagline}</p>
                </div>
                <div className="text-xs text-gray-500 text-center md:text-right">
                    &copy; {currentYear} PT Coreterra Geo Engineering. {t.rights}
                </div>
            </div>
        </footer>
    );
});
Footer.displayName = 'Footer';

// 11. Komponen Utama (App)
export default function App() {
    const [lang, setLang] = useState<Language>('EN');
    const currentText = useMemo(() => content[lang], [lang]);

    const handleSetLang = useCallback((newLang: Language) => {
        setLang(newLang);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans antialiased text-gray-900 selection:bg-coreterra-brown selection:text-white">
            <SEO lang={lang} seoData={currentText.seo} />
            <FloatingWhatsApp lang={lang} />
            <Navbar lang={lang} setLang={handleSetLang} t={currentText.nav} />
            <main id="main-content">
                <Hero t={currentText.hero} />
                <Stats t={currentText.stats} />
                <About t={currentText.about} />
                <Projects t={currentText.projects} />
                <Advantages t={currentText.advantages} />
                <Contact t={currentText.contact} />
            </main>
            <Footer t={currentText.footer} />
        </div>
    );
}