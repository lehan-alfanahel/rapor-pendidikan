import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  BarChart2, 
  AlertTriangle, 
  CheckSquare, 
  FileText, 
  User, 
  Bell, 
  Plus, 
  Edit2, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ChevronRight,
  ChevronDown,
  LogOut,
  Settings,
  Shield,
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  X,
  RefreshCw,
  Download
} from 'lucide-react';

const INITIAL_RAPOR = [
  { id: 1, indikator: 'Kemampuan Literasi Murid', kondisi: 'Baik', perubahan: 'Nilai tidak berubah dari tahun 2024', tren: 'STABIL', deskripsi: 'Membaca dan memahami teks nonfiksi seperti surat dan artikel serta teks fiksi seperti dongeng dan novel.', prioritas: 'Normal', inspirasi: '' },
  { id: 2, indikator: 'Kemampuan Numerasi Murid', kondisi: 'Baik', perubahan: 'Nilai tidak berubah dari tahun 2024', tren: 'STABIL', deskripsi: 'Memahami dan menggunakan konsep bilangan, aljabar, geometri, dan data.', prioritas: 'Normal', inspirasi: '' },
  { id: 3, indikator: 'Kondisi Keamanan Sekolah', kondisi: 'Baik', perubahan: 'Nilai turun dari tahun 2024', tren: 'MENURUN', deskripsi: 'Tidak ada perundungan, hukuman fisik, kekerasan seksual, dan zat berbahaya.', prioritas: 'Perlu perhatian', inspirasi: '' },
  { id: 4, indikator: 'Kondisi Kebinekaan Sekolah', kondisi: 'Baik', perubahan: 'Nilai turun dari tahun 2024', tren: 'MENURUN', deskripsi: 'Toleransi terhadap beragam agama dan budaya serta adanya kesetaraan antar siswa.', prioritas: 'Perlu perhatian', inspirasi: '' },
  { id: 5, indikator: 'Karakter Murid', kondisi: 'Baik', perubahan: 'Nilai turun dari tahun 2024', tren: 'MENURUN', deskripsi: 'Beriman, berakhlak, bergotong royong, kreatif, kritis, menghargai keberagaman, dan mandiri.', prioritas: 'PALING PERLU DITINGKATKAN', inspirasi: 'Sebagai orang tua/wali, kita dapat mengajarkan dan membiasakan anak untuk berperilaku sesuai nilai-nilai Profil Pelajar Pancasila dalam lingkungan keluarga, sekolah, dan masyarakat.' },
  { id: 6, indikator: 'Kualitas Pembelajaran', kondisi: 'Baik', perubahan: 'Nilai naik dari tahun 2024', tren: 'MENINGKAT', deskripsi: 'Suasana kelas yang teratur serta perhatian dan dukungan dari pendidik.', prioritas: 'CAPAIAN & PENINGKATAN TERTINGGI', inspirasi: '' },
];

const INITIAL_MASALAH = [
  {
    id: 1,
    raporId: 5, // Karakter Murid
    judul: 'Penurunan Nilai Karakter Murid dalam Kolaborasi',
    deskripsi: 'Kurangnya inisiatif siswa dalam kegiatan gotong royong dan kemandirian saat tugas kelompok.',
    penyebab: 'Minimnya pembiasaan kolaborasi positif di luar jam pelajaran inti.',
    dampak: 'Siswa cenderung individualis dan kurang menghargai pendapat teman.',
    status: 'Aktif',
    rekomendasi: {
      judul: 'Penguatan Karakter Murid melalui 15 Menit Kolaborasi Positif',
      tujuan: 'Meningkatkan gotong royong, kemandirian, komunikasi positif, tanggung jawab, dan penghargaan terhadap keberagaman.',
      langkah: 'Melaksanakan kegiatan kolaboratif selama 15 menit sebelum pembelajaran.',
      target: '100% siswa kelas 1-6 berpartisipasi',
      pj: 'Wali Kelas masing-masing',
      waktu: 'Setiap Pagi (07.00 - 07.15)',
      indikatorHasil: 'Peningkatan observasi perilaku gotong royong oleh guru',
      status: 'Berjalan'
    }
  },
  {
    id: 2,
    raporId: 3, // Kondisi Keamanan Sekolah (Perlu Perhatian)
    judul: 'Peningkatan Kesadaran Keamanan dan Pencegahan Perundungan',
    deskripsi: 'Terdapat indikasi penurunan pada indeks keamanan sekolah, khususnya terkait pemahaman siswa mengenai bentuk-bentuk perundungan secara verbal.',
    penyebab: 'Belum adanya program sosialisasi yang masif dan sistem pelaporan perundungan anonim yang mudah diakses oleh siswa.',
    dampak: 'Siswa mungkin merasa kurang nyaman dan enggan melaporkan jika terjadi indikasi perundungan di lingkungan sekolah.',
    status: 'Aktif',
    rekomendasi: {
      judul: 'Pembentukan Satgas Anti-Perundungan & Kampanye Sekolah Aman',
      tujuan: 'Menciptakan lingkungan sekolah yang 100% aman, nyaman, dan bebas dari segala bentuk perundungan.',
      langkah: 'Membentuk satgas keamanan dari unsur perwakilan siswa dan guru, serta menyediakan Kotak Suara Aman untuk pelaporan.',
      target: 'Seluruh warga sekolah',
      pj: 'Guru Kesiswaan / Guru BK',
      waktu: 'Setiap Awal Bulan (Minggu Pertama)',
      indikatorHasil: 'Nihilnya kasus perundungan dan meningkatnya partisipasi siswa dalam kampanye keamanan.',
      status: 'Direncanakan'
    }
  },
  {
    id: 3,
    raporId: 4, // Kondisi Kebinekaan Sekolah (Perlu Perhatian)
    judul: 'Optimalisasi Penanaman Nilai Toleransi dan Kebinekaan',
    deskripsi: 'Interaksi antar siswa dengan latar belakang berbeda masih kurang berbaur, terlihat dari kecenderungan berkelompok di jam istirahat.',
    penyebab: 'Kurangnya ruang aktivitas kolaboratif yang secara spesifik dirancang untuk membaurkan siswa lintas kelas dan latar belakang.',
    dampak: 'Berpotensi memunculkan sekat sosial antar siswa dan menurunkan rasa persatuan serta toleransi dalam keseharian.',
    status: 'Aktif',
    rekomendasi: {
      judul: 'Festival Budaya Nusantara & Proyek Kolaborasi Lintas Kelas',
      tujuan: 'Meningkatkan penghargaan terhadap keberagaman, toleransi, dan kesetaraan antar siswa di sekolah.',
      langkah: 'Menugaskan proyek kolaboratif (P5) dengan pembagian kelompok acak lintas kelas, dan mengadakan pameran budaya.',
      target: 'Siswa Kelas 4, 5, dan 6',
      pj: 'Koordinator P5 & Wali Kelas',
      waktu: 'Semester Genap',
      indikatorHasil: 'Terciptanya interaksi positif, hilangnya eksklusivitas kelompok, dan karya kolaborasi lintas budaya.',
      status: 'Direncanakan'
    }
  }
];

export default function SipenaApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('ADMIN'); // ADMIN or GURU
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Data States
  const [raporData, setRaporData] = useState(INITIAL_RAPOR);
  const [masalahData, setMasalahData] = useState(INITIAL_MASALAH);

  // Modal States
  const [modalType, setModalType] = useState(null); // 'edit_rapor', 'add_rapor', 'add_masalah', 'detail_masalah'
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [selectedRaporId, setSelectedRaporId] = useState(INITIAL_RAPOR[0]?.id || '');

  useEffect(() => {
    // Set Document Title
    document.title = "SIPENA - SD Negeri 2 Sendang Ayu | Sistem Pengelolaan Pengetahuan & Inovasi Pendidikan";

    // Set Dynamic Favicon
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'shortcut icon';
      document.head.appendChild(favicon);
    }
    favicon.type = 'image/png';
    favicon.href = './favicon.png';

    // Define SEO Meta Tags
    const metaTags = [
      { name: 'description', content: 'SIPENA (Sistem Pengelolaan Pengetahuan & Inovasi Pendidikan) SD Negeri 2 Sendang Ayu, Kecamatan Padang Ratu, Lampung Tengah. Platform analisis Rapor Pendidikan, identifikasi masalah, dan perencanaan tindak lanjut mutu sekolah.' },
      { name: 'keywords', content: 'SIPENA, SD Negeri 2 Sendang Ayu, Rapor Pendidikan, Lampung Tengah, Padang Ratu, Manajemen Pengetahuan, Mutu Pendidikan, Rekomendasi Sekolah' },
      { name: 'author', content: 'SD Negeri 2 Sendang Ayu' },
      { name: 'theme-color', content: '#123E7A' },

      // Open Graph / Facebook / WhatsApp Share
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'SIPENA - SD Negeri 2 Sendang Ayu' },
      { property: 'og:description', content: 'Sistem Pengelolaan Pengetahuan & Inovasi Pendidikan SD Negeri 2 Sendang Ayu, Kec. Padang Ratu, Kab. Lampung Tengah. Analisis Rapor Pendidikan & Rekomendasi Mutu Sekolah.' },
      { property: 'og:image', content: './thumbnail.png' },
      { property: 'og:image:alt', content: 'Dashboard SIPENA SD Negeri 2 Sendang Ayu' },
      { property: 'og:site_name', content: 'SIPENA SDN 2 Sendang Ayu' },

      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'SIPENA - SD Negeri 2 Sendang Ayu' },
      { name: 'twitter:description', content: 'Sistem Pengelolaan Pengetahuan & Inovasi Pendidikan SD Negeri 2 Sendang Ayu, Lampung Tengah.' },
      { name: 'twitter:image', content: './thumbnail.png' }
    ];

    // Dynamically insert or update meta tags in <head>
    metaTags.forEach(tag => {
      let el;
      if (tag.name) {
        el = document.querySelector(`meta[name='${tag.name}']`);
      } else if (tag.property) {
        el = document.querySelector(`meta[property='${tag.property}']`);
      }

      if (!el) {
        el = document.createElement('meta');
        if (tag.name) el.setAttribute('name', tag.name);
        if (tag.property) el.setAttribute('property', tag.property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });
  }, []);

  const getTrendIcon = (tren) => {
    switch (tren) {
      case 'MENINGKAT': return <TrendingUp className="text-emerald-500 w-5 h-5" />;
      case 'MENURUN': return <TrendingDown className="text-rose-500 w-5 h-5" />;
      default: return <Minus className="text-slate-400 w-5 h-5" />;
    }
  };

  const getPriorityColor = (prioritas) => {
    if (prioritas === 'PALING PERLU DITINGKATKAN') return 'bg-rose-100 text-rose-700 border-rose-200';
    if (prioritas === 'CAPAIAN & PENINGKATAN TERTINGGI') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (prioritas === 'Perlu perhatian') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  const handleSaveRapor = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      id: selectedItem?.id || Date.now(),
      indikator: formData.get('indikator'),
      kondisi: formData.get('kondisi'),
      perubahan: formData.get('perubahan'),
      tren: formData.get('tren'),
      deskripsi: formData.get('deskripsi'),
      prioritas: formData.get('prioritas'),
      inspirasi: formData.get('inspirasi') || '',
    };

    if (modalType === 'edit_rapor') {
      setRaporData(raporData.map(r => r.id === newData.id ? newData : r));
    } else {
      setRaporData([...raporData, newData]);
    }
    closeModal();
  };

  const handleSaveMasalah = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMasalah = {
      id: Date.now(),
      raporId: parseInt(formData.get('raporId')),
      judul: formData.get('judul'),
      deskripsi: formData.get('deskripsi'),
      penyebab: formData.get('penyebab'),
      dampak: formData.get('dampak'),
      status: formData.get('status'),
      rekomendasi: {
        judul: formData.get('rek_judul') || '',
        tujuan: formData.get('rek_tujuan') || '',
        langkah: formData.get('rek_langkah') || '',
        target: formData.get('rek_target') || '',
        pj: formData.get('rek_pj') || '',
        waktu: formData.get('rek_waktu') || '',
        indikatorHasil: formData.get('rek_indikator') || '',
        status: 'Direncanakan'
      }
    };
    setMasalahData([newMasalah, ...masalahData]);
    closeModal();
  };

  const stats = useMemo(() => {
    return {
      totalRapor: raporData.length,
      totalMasalah: masalahData.length,
      totalRekomendasi: masalahData.filter(m => m.rekomendasi?.judul).length,
      tindakLanjutBerjalan: masalahData.filter(m => m.rekomendasi?.status === 'Berjalan').length
    };
  }, [raporData, masalahData]);

  const priorityItem = raporData.find(r => r.prioritas === 'PALING PERLU DITINGKATKAN');
  const bestItem = raporData.find(r => r.prioritas === 'CAPAIAN & PENINGKATAN TERTINGGI');

  const handleDownloadPDF = () => {
    const element = document.getElementById('report-content');
    
    // Pastikan elemen ditemukan sebelum memproses
    if (!element) return;
    
    // Menambahkan library html2pdf secara dinamis ke dalam document head
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
       // Konfigurasi opsi untuk html2pdf
       const opt = {
          margin:       10, // Margin halaman dalam milimeter
          filename:     'Laporan_SIPENA_2025.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, logging: false },
          jsPDF:        { unit: 'mm', format: 'legal', orientation: 'portrait' }
       };

       // Buat PDF
       window.html2pdf().set(opt).from(element).save();
    };
    document.head.appendChild(script);
  };

  const renderModals = () => {
    if (!modalType) return null;

    // Derived states extracted from IIFEs to maintain clean React render patterns
    const currentRaporId = selectedRaporId || raporData[0]?.id;
    const addMasalahRapor = raporData.find(r => r.id === parseInt(currentRaporId));
    const detailMasalahRapor = selectedItem ? raporData.find(r => r.id === selectedItem.raporId) : null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-[#123E7A] text-lg">
              {modalType === 'add_rapor' && 'Tambah Indikator Rapor'}
              {modalType === 'edit_rapor' && 'Edit Indikator Rapor'}
              {modalType === 'add_masalah' && 'Identifikasi Masalah Baru'}
              {modalType === 'detail_masalah' && 'Detail Masalah & Rekomendasi'}
            </h3>
            <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar">
            {/* Form Rapor */}
            {(modalType === 'add_rapor' || modalType === 'edit_rapor') && (
              <form id="rapor-form" onSubmit={handleSaveRapor} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Indikator</label>
                  <input required name="indikator" defaultValue={selectedItem?.indikator} className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-[#123E7A]/20 focus:border-[#123E7A] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Kondisi</label>
                    <select name="kondisi" defaultValue={selectedItem?.kondisi || 'Baik'} className="w-full border border-slate-300 rounded-xl p-3 bg-white outline-none">
                      <option value="Baik">Baik</option>
                      <option value="Cukup">Cukup</option>
                      <option value="Kurang">Kurang</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tren</label>
                    <select name="tren" defaultValue={selectedItem?.tren || 'STABIL'} className="w-full border border-slate-300 rounded-xl p-3 bg-white outline-none">
                      <option value="MENINGKAT">Meningkat</option>
                      <option value="STABIL">Stabil</option>
                      <option value="MENURUN">Menurun</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Perubahan</label>
                  <input required name="perubahan" defaultValue={selectedItem?.perubahan} placeholder="Cth: Nilai turun dari tahun 2024" className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-[#123E7A]/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Prioritas</label>
                  <select name="prioritas" defaultValue={selectedItem?.prioritas || 'Normal'} className="w-full border border-slate-300 rounded-xl p-3 bg-white outline-none">
                    <option value="Normal">Normal</option>
                    <option value="Perlu perhatian">Perlu Perhatian</option>
                    <option value="PALING PERLU DITINGKATKAN">Paling Perlu Ditingkatkan</option>
                    <option value="CAPAIAN & PENINGKATAN TERTINGGI">Capaian & Peningkatan Tertinggi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label>
                  <textarea required name="deskripsi" defaultValue={selectedItem?.deskripsi} rows="3" className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Inspirasi / Rekomendasi Sistem (Opsional)</label>
                  <textarea name="inspirasi" defaultValue={selectedItem?.inspirasi} rows="2" className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none" />
                </div>
              </form>
            )}

            {/* Form Masalah */}
            {modalType === 'add_masalah' && (
                <form id="masalah-form" onSubmit={handleSaveMasalah} className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-sm font-bold text-[#123E7A] mb-2">Pilih Indikator Rapor Pendidikan</label>
                    <select 
                      name="raporId" 
                      value={currentRaporId} 
                      onChange={(e) => setSelectedRaporId(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 bg-white outline-none mb-3 font-semibold"
                    >
                      {raporData.map(r => (
                        <option key={r.id} value={r.id}>{r.indikator}</option>
                      ))}
                    </select>
                    
                    {addMasalahRapor && (
                      <div className="flex flex-wrap gap-2 text-xs">
                         <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-medium text-slate-600">
                           Kondisi: {addMasalahRapor.kondisi}
                         </span>
                         <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-medium text-slate-600">
                           Tren: {addMasalahRapor.tren}
                         </span>
                         <span className={`px-2 py-1 border rounded-md font-bold ${getPriorityColor(addMasalahRapor.prioritas)}`}>
                           {addMasalahRapor.prioritas}
                         </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 border-b pb-2">Detail Identifikasi Masalah</h4>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Masalah</label>
                      <input required name="judul" className="w-full border border-slate-300 rounded-xl p-3 outline-none" placeholder="Cth: Kurangnya partisipasi dalam diskusi..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Masalah</label>
                      <textarea required name="deskripsi" rows="2" className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Penyebab yang Diduga</label>
                        <textarea required name="penyebab" rows="2" className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Dampak pada Siswa</label>
                        <textarea required name="dampak" rows="2" className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Status Awal</label>
                      <select name="status" className="w-full border border-slate-300 rounded-xl p-3 bg-white outline-none">
                        <option value="Draft">Draft</option>
                        <option value="Aktif">Aktif</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-slate-800 border-b pb-2">Rekomendasi Tindak Lanjut (Opsional)</h4>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Rekomendasi/Program</label>
                      <input name="rek_judul" className="w-full border border-slate-300 rounded-xl p-3 outline-none" placeholder="Masukkan judul solusi..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Langkah Perbaikan Konkrit</label>
                      <textarea name="rek_langkah" rows="2" className="w-full border border-slate-300 rounded-xl p-3 outline-none resize-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Target Peserta</label>
                        <input name="rek_target" className="w-full border border-slate-300 rounded-xl p-3 outline-none" />
                      </div>
                       <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Penanggung Jawab</label>
                        <input name="rek_pj" className="w-full border border-slate-300 rounded-xl p-3 outline-none" />
                      </div>
                    </div>
                  </div>
                </form>
            )}

            {/* Detail Masalah & Rekomendasi (Read Only view inside modal) */}
            {modalType === 'detail_masalah' && selectedItem && (
                <div className="space-y-6 text-slate-800">
                  <div className="bg-[#123E7A]/5 p-4 rounded-xl border border-[#123E7A]/10">
                    <h4 className="text-sm font-bold text-[#123E7A] mb-1">Terkait Indikator:</h4>
                    <p className="font-semibold text-lg">{detailMasalahRapor?.indikator}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-white rounded shadow-sm">Status: {detailMasalahRapor?.kondisi}</span>
                      <span className="text-xs px-2 py-1 bg-white rounded shadow-sm">{detailMasalahRapor?.tren}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-2">{selectedItem.judul}</h2>
                    <p className="text-slate-600 text-sm">{selectedItem.deskripsi}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                      <h5 className="text-xs font-bold text-orange-800 mb-1 uppercase tracking-wider">Akar Penyebab</h5>
                      <p className="text-sm text-orange-900/80">{selectedItem.penyebab}</p>
                    </div>
                    <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                      <h5 className="text-xs font-bold text-rose-800 mb-1 uppercase tracking-wider">Dampak</h5>
                      <p className="text-sm text-rose-900/80">{selectedItem.dampak}</p>
                    </div>
                  </div>

                  {selectedItem.rekomendasi?.judul && (
                    <div className="mt-6 border-t border-slate-200 pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="text-[#F59E0B] w-5 h-5" />
                        <h3 className="font-bold text-lg">Rekomendasi Tindak Lanjut</h3>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                        <div>
                          <h4 className="font-bold text-slate-800">{selectedItem.rekomendasi.judul}</h4>
                          <span className="inline-block px-2 py-1 bg-[#123E7A] text-white text-[10px] font-bold rounded-full mt-1">
                            {selectedItem.rekomendasi.status}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 space-y-2">
                           <p><strong>Langkah:</strong> {selectedItem.rekomendasi.langkah}</p>
                           <p><strong>Tujuan:</strong> {selectedItem.rekomendasi.tujuan}</p>
                           <div className="grid grid-cols-2 gap-2 mt-2 p-3 bg-slate-50 rounded-lg">
                             <p><strong>Target : </strong><br/>{selectedItem.rekomendasi.target}</p>
                             <p><strong>PJ : </strong><br/>{selectedItem.rekomendasi.pj}</p>
                             <p><strong>Waktu : </strong><br/>{selectedItem.rekomendasi.waktu}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
            <button onClick={closeModal} className="px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
              {modalType === 'detail_masalah' ? 'Tutup' : 'Batal'}
            </button>
            {(modalType === 'add_rapor' || modalType === 'edit_rapor') && (
              <button form="rapor-form" type="submit" className="px-5 py-2.5 font-bold bg-[#F59E0B] text-white hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/30 transition-colors">
                Simpan Indikator
              </button>
            )}
            {modalType === 'add_masalah' && (
              <button form="masalah-form" type="submit" className="px-5 py-2.5 font-bold bg-[#123E7A] text-white hover:bg-blue-900 rounded-xl shadow-lg shadow-blue-900/30 transition-colors">
                Simpan Identifikasi
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6 pb-24 md:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Banner */}
      <div className="bg-[#123E7A] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -right-10 -top-10 opacity-10">
          <BookOpen className="w-64 h-64 transform rotate-12" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang,</h2>
          
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#F59E0B] tracking-tight mb-1">SD NEGERI 2 SENDANG AYU</h1>
            <p className="text-xs md:text-sm text-blue-100 mb-5">
              Kecamatan Padang Ratu Kabupaten Lampung Tengah
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold">
              <Clock className="w-4 h-4 text-[#F59E0B]" /> Rapor Pendidikan Tahun : 2025
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Indikator', val: stats.totalRapor, icon: BarChart2, color: 'bg-blue-50 text-[#123E7A]' },
          { label: 'Masalah Diidentifikasi', val: stats.totalMasalah, icon: AlertTriangle, color: 'bg-rose-50 text-rose-600' },
          { label: 'Rekomendasi Aktif', val: stats.totalRekomendasi, icon: CheckSquare, color: 'bg-amber-50 text-[#F59E0B]' },
          { label: 'Tindak Lanjut Berjalan', val: stats.tindakLanjutBerjalan, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
             </div>
             <div>
               <p className="text-3xl font-black text-slate-800">{stat.val}</p>
               <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">{stat.label}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Highlights */}
        {priorityItem && (
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-rose-500 text-white p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-rose-900 text-lg">Prioritas Perbaikan Utama</h3>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-rose-100">
               <span className="text-[10px] font-bold px-2 py-1 bg-rose-100 text-rose-700 rounded-full uppercase tracking-wider mb-2 inline-block">
                 Paling Perlu Ditingkatkan
               </span>
               <h4 className="text-xl font-bold text-slate-900 mb-2">{priorityItem.indikator}</h4>
               <p className="text-sm text-slate-700 mb-4">{priorityItem.deskripsi}</p>
               
               <button 
                  onClick={() => {
                    const existingMasalah = masalahData.find(m => m.raporId === priorityItem.id);
                    if(existingMasalah) {
                       setSelectedItem(existingMasalah);
                       setModalType('detail_masalah');
                    } else {
                       setActiveTab('masalah');
                       if (role === 'GURU' || role === 'ADMIN') setModalType('add_masalah');
                    }
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
               >
                 Lihat & Buat Rekomendasi <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        )}

        {/* Highest Achievement */}
        {bestItem && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-500 text-white p-2 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-emerald-900 text-lg">Capaian & Peningkatan Tertinggi</h3>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-emerald-100 h-[calc(100%-3rem)] flex flex-col justify-center">
               <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-wider mb-2 inline-block w-fit">
                 {bestItem.prioritas}
               </span>
               <h4 className="text-xl font-bold text-slate-900 mb-2">{bestItem.indikator}</h4>
               <p className="text-sm text-slate-700">{bestItem.deskripsi}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderRapor = () => (
    <div className="space-y-6 pb-24 md:pb-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-[#123E7A] tracking-tight">Rapor Pendidikan</h2>
          <p className="text-slate-500 text-sm mt-1">Kondisi capaian SD Negeri 2 Sendang Ayu Tahun 2025.</p>
        </div>
        {role === 'ADMIN' && (
          <button 
            onClick={() => { setSelectedItem(null); setModalType('add_rapor'); }}
            className="w-full md:w-auto px-5 py-2.5 bg-[#F59E0B] hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Tambah Indikator
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {raporData.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-3">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getPriorityColor(item.prioritas)}`}>
                {item.prioritas}
              </span>
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2 leading-snug">{item.indikator}</h3>
            
            <div className="flex gap-4 items-center mb-4 text-sm bg-slate-50 p-2.5 rounded-xl border border-slate-100 w-fit">
               <div className="flex flex-col">
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Kondisi</span>
                 <span className="font-semibold text-slate-700">{item.kondisi}</span>
               </div>
               <div className="w-px h-8 bg-slate-200"></div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Tren</span>
                 <div className="flex items-center gap-1 font-semibold text-slate-700">
                   {getTrendIcon(item.tren)} <span className="text-xs">{item.tren}</span>
                 </div>
               </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 flex-grow">{item.deskripsi}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
              <button 
                onClick={() => {
                   const m = masalahData.find(m => m.raporId === item.id);
                   if (m) {
                      setSelectedItem(m);
                      setModalType('detail_masalah');
                   } else {
                      // Just show info or redirect to add masalah
                      setActiveTab('masalah');
                   }
                }}
                className="text-sm font-bold text-[#123E7A] hover:text-blue-800 flex items-center gap-1"
              >
                Lihat Identifikasi <ChevronRight className="w-4 h-4" />
              </button>

              {role === 'ADMIN' && (
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedItem(item); setModalType('edit_rapor'); }} className="p-1.5 text-slate-400 hover:text-[#F59E0B] hover:bg-orange-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setRaporData(raporData.filter(r => r.id !== item.id))} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMasalah = () => (
    <div className="space-y-6 pb-24 md:pb-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-[#123E7A] tracking-tight">Identifikasi Masalah & Tindak Lanjut</h2>
          <p className="text-slate-500 text-sm mt-1">Daftar analisis dari hasil Rapor Pendidikan.</p>
        </div>
        <button 
          onClick={() => { setModalType('add_masalah'); }}
          className="w-full md:w-auto px-5 py-2.5 bg-[#123E7A] hover:bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Identifikasi Masalah
        </button>
      </div>

      {masalahData.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <AlertTriangle className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">Belum ada masalah teridentifikasi</h3>
          <p className="text-slate-500 text-sm">Mulai identifikasi berdasarkan data Rapor Pendidikan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {masalahData.map(m => {
            const raporTerikat = raporData.find(r => r.id === m.raporId);
            return (
              <div key={m.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider
                    ${m.status === 'Aktif' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    Status: {m.status}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md truncate max-w-[150px]" title={raporTerikat?.indikator}>
                    {raporTerikat?.indikator}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 mb-2 leading-snug">{m.judul}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">{m.deskripsi}</p>
                
                {m.rekomendasi?.judul ? (
                  <div className="bg-emerald-50 rounded-xl p-3 mb-4 border border-emerald-100/50">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Rekomendasi Tersedia</span>
                    </div>
                    <p className="text-sm font-semibold text-emerald-900 truncate" title={m.rekomendasi.judul}>{m.rekomendasi.judul}</p>
                  </div>
                ) : (
                  <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100/50 flex items-center justify-between">
                     <span className="text-xs font-bold text-amber-800">Belum ada tindak lanjut</span>
                     <button className="text-xs font-bold text-[#F59E0B] hover:underline">Tambah</button>
                  </div>
                )}

                <button 
                  onClick={() => { setSelectedItem(m); setModalType('detail_masalah'); }}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#123E7A] font-bold text-sm rounded-xl transition-colors border border-slate-200 mt-auto"
                >
                  Lihat Detail
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderLaporan = () => (
    <div className="space-y-6 pb-24 md:pb-8 animate-in fade-in duration-300">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#123E7A] tracking-tight">Laporan Hasil Analisis</h2>
          <p className="text-slate-500 text-sm mt-1">Generate otomatis dari data identifikasi dan rekomendasi.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 md:flex-none px-5 py-2.5 bg-[#123E7A] text-white hover:bg-blue-900 font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>
      </div>

      {/* Menambahkan id 'report-content' sebagai target html2pdf */}
      <div id="report-content" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0 text-slate-800 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
        <div className="text-center border-b-2 border-[#123E7A] pb-4 mb-6">
          <h1 className="text-xl font-bold uppercase tracking-widest mb-1 text-[#123E7A]">LAPORAN IDENTIFIKASI & TINDAK LANJUT</h1>
          <h2 className="text-lg font-bold uppercase mb-2">RAPOR PENDIDIKAN TAHUN 2025</h2>
          <h3 className="text-base font-bold uppercase">SD NEGERI 2 SENDANG AYU</h3>
        </div>

        <div className="space-y-6">
           {masalahData.map((m, idx) => {
             const r = raporData.find(rap => rap.id === m.raporId);
             return (
               <div key={m.id} className="border border-slate-300 rounded-xl p-5 print:border-slate-800 print:rounded-none">
                 <h4 className="font-bold text-lg mb-3 border-b border-slate-200 pb-2 text-[#123E7A]">
                   {idx + 1}. Indikator : {r?.indikator}
                 </h4>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                   <div>
                     <h5 className="font-bold text-xs text-[#123E7A] uppercase tracking-wider mb-2">Identifikasi Masalah</h5>
                     <div className="space-y-2 text-xs">
                       <p><strong>Kondisi Rapor : </strong> {r?.kondisi} ({r?.tren})</p>
                       <p><strong>Judul Masalah : </strong> {m.judul}</p>
                       <p><strong>Deskripsi : </strong> {m.deskripsi}</p>
                       <p><strong>Penyebab : </strong> {m.penyebab}</p>
                       <p><strong>Dampak : </strong> {m.dampak}</p>
                     </div>
                   </div>
                   
                   <div>
                     <h5 className="font-bold text-xs text-[#123E7A] uppercase tracking-wider mb-2">Tindak Lanjut / Rekomendasi</h5>
                     {m.rekomendasi?.judul ? (
                       <div className="space-y-2 text-xs">
                         <p><strong>Program : </strong> {m.rekomendasi.judul}</p>
                         <p><strong>Tujuan : </strong> {m.rekomendasi.tujuan}</p>
                         <p><strong>Langkah : </strong> {m.rekomendasi.langkah}</p>
                         <p><strong>Target & Waktu : </strong> {m.rekomendasi.target} | {m.rekomendasi.waktu}</p>
                         <p><strong>Penanggung Jawab : </strong> {m.rekomendasi.pj}</p>
                       </div>
                     ) : (
                       <p className="text-xs italic text-slate-400">Belum ada tindak lanjut yang direncanakan.</p>
                     )}
                   </div>
                 </div>
               </div>
             )
           })}
           
           {masalahData.length === 0 && (
             <p className="text-center italic text-slate-500 py-10 text-xs">Data laporan kosong. Silakan identifikasi masalah terlebih dahulu.</p>
           )}
        </div>
        
        <div className="mt-12 flex justify-end text-xs print:block hidden">
          <div className="text-center w-72 float-right">
             <p>Sendang Ayu, {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
             <p className="mb-20">Kepala Sekolah,</p>
             <p className="font-bold border-b border-black inline-block w-56 mb-1">(.......................................)</p>
             <p>NIP. </p>
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
    </div>
  );

  const renderRelevansi = () => (
    <div className="space-y-6 pb-24 md:pb-8 animate-in fade-in duration-300">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold text-[#123E7A] tracking-tight">Relevansi Analisis</h2>
        <p className="text-slate-500 text-sm">Hubungan analisis data Rapor Pendidikan dengan konsep Manajemen Pengetahuan.</p>
      </div>
      
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4 text-slate-700 text-lg leading-relaxed text-justify">
        <p>
          Berdasarkan Rapor Pendidikan SD Negeri 2 Sendang Ayu tahun 2025, terlihat bahwa sekolah memiliki beberapa capaian yang sudah baik, yaitu kemampuan literasi, numerasi, karakter murid, dan kualitas pembelajaran. Namun demikian, terdapat penurunan dibandingkan tahun 2024 pada kondisi keamanan sekolah, kebinekaan sekolah, dan karakter murid. Temuan ini menunjukkan bahwa data pendidikan tidak cukup hanya dibaca sebagai hasil akhir, tetapi perlu dikelola menjadi pengetahuan yang dapat digunakan untuk memahami kondisi sekolah, menemukan masalah, dan menentukan langkah perbaikan. 
        </p>
        <p>
          Hal tersebut sejalan dengan konsep manajemen pengetahuan dalam makalah, yaitu bagaimana informasi dan data dikumpulkan, dianalisis, dibagikan, serta dimanfaatkan menjadi pengetahuan untuk mendukung pengambilan keputusan dan peningkatan kinerja organisasi. Rapor Pendidikan sendiri memang dirancang sebagai sumber evaluasi yang digunakan untuk mengidentifikasi masalah, merefleksikan akar masalah, dan menentukan pembenahan secara berkelanjutan.
        </p>
        <p>
          Dengan demikian, Rapor Pendidikan dapat dipandang sebagai salah satu sumber pengetahuan strategis bagi sekolah. Data tentang literasi dan numerasi yang tetap baik dapat dipertahankan dan dikembangkan, sementara penurunan pada keamanan, kebinekaan, dan karakter perlu menjadi bahan refleksi bersama bagi kepala sekolah, guru, tenaga kependidikan, peserta didik, serta orang tua. 
        </p>
        <p>
          Hasil analisis tersebut kemudian dapat diterjemahkan menjadi program nyata, misalnya penguatan budaya sekolah yang aman dan inklusif, pembinaan karakter, peningkatan kualitas interaksi pembelajaran, serta dokumentasi dan berbagi praktik baik antarpendidik. Dengan pola data → informasi → pengetahuan → tindakan → evaluasi, sekolah tidak hanya memiliki laporan capaian, tetapi membangun siklus pembelajaran organisasi yang mendukung perencanaan berbasis data dan peningkatan mutu secara berkelanjutan.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Import Inter Font and minimal custom CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
        
        @media print {
          @page { size: A4 portrait; margin: 20mm; }
          body { background: white !important; }
          .print\\:hidden, header, nav { display: none !important; }
          .print\\:block { display: block !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:p-0 { padding: 0 !important; }
        }
      `}} />

      {/* Header (Sticky Top) */}
      <header className="sticky top-0 z-40 bg-[#123E7A] border-b border-[#123E7A]/20 print:hidden shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl shadow-inner backdrop-blur-sm border border-white/10">
              <GraduationCap className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-black text-xl text-white leading-none tracking-tight">SIPENA</h1>
              <span className="hidden md:block text-[9px] font-bold text-blue-200 uppercase tracking-widest mt-0.5">Sistem Pengelolaan Pengetahuan & Inovasi Pendidikan</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-blue-200 hover:text-white transition-colors rounded-full hover:bg-white/10 hidden md:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#123E7A]"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 hover:bg-white/10 p-1.5 md:px-3 md:py-1.5 rounded-full transition-colors border border-transparent hover:border-white/20"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F59E0B] to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {role === 'ADMIN' ? 'A' : 'G'}
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-bold text-white leading-none">{role === 'ADMIN' ? 'Administrator' : 'Guru Kelas'}</span>
                  <span className="text-[10px] font-semibold text-[#F59E0B]">{role}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-blue-200 hidden md:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 mb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ganti Role (Demo)</p>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                      <button 
                        onClick={() => { setRole('ADMIN'); setShowProfileMenu(false); }}
                        className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-colors ${role === 'ADMIN' ? 'bg-white text-[#123E7A] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Admin
                      </button>
                      <button 
                        onClick={() => { setRole('GURU'); setShowProfileMenu(false); }}
                        className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-colors ${role === 'GURU' ? 'bg-white text-[#123E7A] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Guru
                      </button>
                    </div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#123E7A] flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Pengaturan
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full">
        {/* Main Content Area */}
        <main className="p-4 md:p-8 pt-6 mb-24 md:mb-28">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'rapor' && renderRapor()}
          {activeTab === 'masalah' && renderMasalah()}
          {activeTab === 'laporan' && renderLaporan()}
          {activeTab === 'relevansi' && renderRelevansi()}
        </main>
      </div>

      {/* Bottom Navigation (All Devices) */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 print:hidden pb-safe">
        <div className="max-w-3xl mx-auto flex justify-around items-center h-16 md:h-20 px-2 md:px-6">
          {[
            { id: 'dashboard', label: 'Beranda', icon: Home },
            { id: 'rapor', label: 'Rapor', icon: BarChart2 },
            { id: 'masalah', label: 'Masalah', icon: AlertTriangle },
            { id: 'laporan', label: 'Laporan', icon: FileText },
            { id: 'relevansi', label: 'Relevansi', icon: RefreshCw },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                activeTab === item.id ? 'text-[#123E7A]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-1.5 md:p-2 rounded-full transition-all duration-300 ${activeTab === item.id ? 'bg-blue-50 scale-110' : 'bg-transparent scale-100'}`}>
                 <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${activeTab === item.id ? 'text-[#123E7A] fill-blue-900/10' : ''}`} />
              </div>
              <span className={`text-[10px] md:text-xs font-bold ${activeTab === item.id ? 'text-[#123E7A]' : ''}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Render Modals globally */}
      {renderModals()}

    </div>
  );
}