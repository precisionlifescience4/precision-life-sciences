'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'services', label: 'Services' },
  { id: 'content', label: 'Homepage & About' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'team', label: 'Team' },
  { id: 'settings', label: 'Contact Info' },
  { id: 'images', label: 'Images' },
];
export default function AdminDashboard() {
  const [tab, setTab] = useState('services');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 2500);
  };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-graybg">
      <div className="bg-navy text-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-xl font-bold">Precision Life Sciences — Admin</h1>
          <button onClick={logout} className="bg-cchf text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
            Logout
          </button>
        </div>
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id ? 'border-cyan text-cyan' : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {msg && (
          <div className="bg-flu/10 border border-flu text-flu font-semibold px-4 py-3 rounded-lg mb-6">
            {msg}
          </div>
        )}

        {tab === 'services' && <ServicesTab flash={flash} />}
        {tab === 'content' && <ContentTab flash={flash} />}
        {tab === 'faqs' && <FaqsTab flash={flash} />}
        {tab === 'faqs' && <FaqsTab flash={flash} />}
        {tab === 'team' && <TeamTab flash={flash} />}
        {tab === 'settings' && <SettingsTab flash={flash} />}
        {tab === 'images' && <ImagesTab flash={flash} />}
      </div>
    </div>
  );
}

/* ---------- SERVICES TAB ---------- */
function ServicesTab({ flash }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(setServices);
  }, []);

  const update = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const save = async (s) => {
    await fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s),
    });
    flash(`${s.name} saved`);
  };

  const specFields = [
    { key: 'target_gene', label: 'Target Gene/Pathogen' },
    { key: 'sample_type', label: 'Sample Type' },
    { key: 'turnaround_time', label: 'Turnaround Time' },
    { key: 'reaction_volume', label: 'Reaction Volume' },
    { key: 'storage_condition', label: 'Storage Condition' },
    { key: 'shelf_life', label: 'Shelf Life' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Products & Services</h2>
      <p className="text-sm text-gray-500 mb-6">Edit name, description, price and technical specs for each assay.</p>
      {services.map((s) => (
        <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
          <input
            value={s.name}
            onChange={(e) => update(s.id, 'name', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 font-semibold text-navy"
          />
          <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
          <textarea
            value={s.description}
            onChange={(e) => update(s.id, 'description', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 min-h-[70px]"
          />
          <label className="text-xs font-bold text-gray-400 uppercase">Price</label>
          <input
            value={s.price}
            onChange={(e) => update(s.id, 'price', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4"
          />

          <p className="text-xs font-bold text-navy uppercase mb-2 pt-2 border-t border-gray-100">Technical Specifications</p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {specFields.map((f) => (
              <div key={f.key}>
                <label className="text-xs text-gray-400">{f.label}</label>
                <input
                  value={s[f.key] || ''}
                  onChange={(e) => update(s.id, f.key, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                />
              </div>
            ))}
          </div>

          <button onClick={() => save(s)} className="bg-cyan text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
            Save
          </button>
        </div>
      ))}
    </div>
  );
}
/* ---------- CONTENT TAB ---------- */
function ContentTab({ flash }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(setContent);
  }, []);

   const fields = [
    { key: 'hero_title', label: 'Hero Title (Home page big heading)' },
    { key: 'hero_subtitle', label: 'Hero Subtitle' },
    { key: 'hero_description', label: 'Hero Description', long: true },
    { key: 'stat1_value', label: 'Stat 1 — Value' }, { key: 'stat1_label', label: 'Stat 1 — Label' },
    { key: 'stat2_value', label: 'Stat 2 — Value' }, { key: 'stat2_label', label: 'Stat 2 — Label' },
    { key: 'stat3_value', label: 'Stat 3 — Value' }, { key: 'stat3_label', label: 'Stat 3 — Label' },
    { key: 'stat4_value', label: 'Stat 4 — Value' }, { key: 'stat4_label', label: 'Stat 4 — Label' },
    { key: 'cap1_title', label: 'Capability 1 — Title' }, { key: 'cap1_desc', label: 'Capability 1 — Description', long: true },
    { key: 'cap2_title', label: 'Capability 2 — Title' }, { key: 'cap2_desc', label: 'Capability 2 — Description', long: true },
    { key: 'cap3_title', label: 'Capability 3 — Title' }, { key: 'cap3_desc', label: 'Capability 3 — Description', long: true },
    { key: 'cap4_title', label: 'Capability 4 — Title' }, { key: 'cap4_desc', label: 'Capability 4 — Description', long: true },
    { key: 'why_choose_text', label: 'Home Page — "Why Choose Us" Text', long: true },
    { key: 'about_intro', label: 'About Page — Introduction Paragraph', long: true },
    { key: 'who_serve_text', label: 'About Page — "Who We Serve" Text', long: true },
    { key: 'services_title', label: 'Services Page — Heading' },
    { key: 'services_subtitle', label: 'Services Page — Subheading' },
    { key: 'footer_about', label: 'Footer — About Text', long: true },
    { key: 'company_legal_name', label: 'Company Legal Name (copyright line)' },
    { key: 'cta_title', label: 'Bottom CTA Title' },
    { key: 'cta_description', label: 'Bottom CTA Description', long: true },
  ];

  const save = async () => {
    await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    flash('Website text updated');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Homepage & About Text</h2>
      <p className="text-sm text-gray-500 mb-6">Edit any text shown on the Home and About pages. Click Save at the bottom when done.</p>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-bold text-gray-400 uppercase">{f.label}</label>
            {f.long ? (
              <textarea
                value={content[f.key] || ''}
                onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 min-h-[80px]"
              />
            ) : (
              <input
                value={content[f.key] || ''}
                onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
              />
            )}
          </div>
        ))}
        <button onClick={save} className="bg-cyan text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
          Save All Text
        </button>
      </div>
    </div>
  );
}

/* ---------- FAQS TAB ---------- */
function FaqsTab({ flash }) {
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  const load = () => fetch('/api/faqs').then(r => r.json()).then(setFaqs);
  useEffect(() => { load(); }, []);

  const update = (id, field, value) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const save = async (f) => {
    await fetch('/api/faqs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(f),
    });
    flash('FAQ updated');
  };

  const remove = async (id) => {
    await fetch('/api/faqs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    flash('FAQ deleted');
    load();
  };

  const add = async () => {
    if (!newFaq.question || !newFaq.answer) return;
    await fetch('/api/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newFaq, sort_order: faqs.length + 1 }),
    });
    setNewFaq({ question: '', answer: '' });
    flash('FAQ added');
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Frequently Asked Questions</h2>
      <p className="text-sm text-gray-500 mb-6">Add, edit or remove questions shown on the Services page.</p>

      {faqs.map((f) => (
        <div key={f.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Question</label>
          <input
            value={f.question}
            onChange={(e) => update(f.id, 'question', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 font-semibold text-navy"
          />
          <label className="text-xs font-bold text-gray-400 uppercase">Answer</label>
          <textarea
            value={f.answer}
            onChange={(e) => update(f.id, 'answer', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4 min-h-[70px]"
          />
          <div className="flex gap-3">
            <button onClick={() => save(f)} className="bg-cyan text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
              Save
            </button>
            <button onClick={() => remove(f.id)} className="bg-white border border-cchf text-cchf px-5 py-2 rounded-lg font-semibold hover:bg-cchf hover:text-white transition-colors">
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="bg-white border-2 border-dashed border-cyan rounded-xl p-5">
        <h3 className="font-bold text-navy mb-3">Add New FAQ</h3>
        <input
          placeholder="Question"
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3"
        />
        <textarea
          placeholder="Answer"
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 min-h-[70px]"
        />
        <button onClick={add} className="bg-navy text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
          + Add FAQ
        </button>
      </div>
    </div>
  );
}

/* ---------- SETTINGS TAB ---------- */
function SettingsTab({ flash }) {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings);
  }, []);

  const fieldLabels = {
    email: 'Email Address',
    phone: 'Phone Number',
    whatsapp: 'WhatsApp Number (with country code, no + or spaces, e.g. 923005750123)',
    address: 'Office Address',
    maps_link: 'Google Maps Link',
    facebook: 'Facebook URL',
    instagram: 'Instagram URL',
    youtube: 'YouTube URL',
  };

  const save = async () => {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    flash('Contact info updated');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Contact Information</h2>
      <p className="text-sm text-gray-500 mb-6">Shown in the Footer, Contact page and WhatsApp button.</p>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        {Object.entries(fieldLabels).map(([key, label]) => (
          <div key={key}>
            <label className="text-xs font-bold text-gray-400 uppercase">{label}</label>
            <input
              value={settings[key] || ''}
              onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
            />
          </div>
        ))}
        <button onClick={save} className="bg-cyan text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
          Save Contact Info
        </button>
      </div>
    </div>
  );
}

/* ---------- IMAGES TAB ---------- */
function ImagesTab({ flash }) {
  const [content, setContent] = useState({});
  const [uploading, setUploading] = useState(null);

  const load = () => fetch('/api/content').then(r => r.json()).then(setContent);
  useEffect(() => { load(); }, []);

  const slots = [
    { key: 'img_product_lineup', label: 'Product Lineup Photo (Home page)' },
    { key: 'img_partner_kmu', label: 'KMU Logo' },
    { key: 'img_partner_bq', label: 'BQ Pharma Logo' },
    { key: 'img_partner_dgst', label: 'DGST Logo' },
  ];

  const handleUpload = async (key, file) => {
    if (!file) return;
    setUploading(key);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setUploading(null);
    if (data.url) {
      const updated = { ...content, [key]: data.url };
      setContent(updated);
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: data.url }),
      });
      flash('Image uploaded and saved');
    } else {
      flash('Upload failed: ' + (data.error || 'unknown error'));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Website Images</h2>
      <p className="text-sm text-gray-500 mb-6">Upload a new picture to replace any image on the website — it updates instantly.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {slots.map((s) => (
          <div key={s.key} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="font-semibold text-navy mb-3">{s.label}</p>
            {content[s.key] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content[s.key]} alt={s.label} className="w-full h-32 object-contain bg-graybg rounded-lg mb-3" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(s.key, e.target.files[0])}
              className="text-sm"
            />
            {uploading === s.key && <p className="text-xs text-cyan mt-2">Uploading...</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
/* ---------- TEAM TAB ---------- */
function TeamTab({ flash }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch('/api/team').then(r => r.json()).then(setTeam);
  }, []);

  const update = (id, field, value) => {
    setTeam(team.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const save = async (m) => {
    await fetch('/api/team', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(m),
    });
    flash(`${m.name} saved`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Leadership Team</h2>
      <p className="text-sm text-gray-500 mb-6">Edit names, roles and bios shown on the About page.</p>
      {team.map((m) => (
        <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
          <input
            value={m.name}
            onChange={(e) => update(m.id, 'name', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 font-semibold text-navy"
          />
          <label className="text-xs font-bold text-gray-400 uppercase">Role / Title</label>
          <input
            value={m.role}
            onChange={(e) => update(m.id, 'role', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-3"
          />
          <label className="text-xs font-bold text-gray-400 uppercase">Bio</label>
          <textarea
            value={m.bio}
            onChange={(e) => update(m.id, 'bio', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4 min-h-[70px]"
          />
          <button onClick={() => save(m)} className="bg-cyan text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
            Save
          </button>
        </div>
      ))}
    </div>
  );
}