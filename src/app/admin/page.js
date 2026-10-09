'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'inquiries', label: 'Enquiries' },
  { id: 'services', label: 'Services' },
  { id: 'content', label: 'Homepage & About' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'team', label: 'Team' },
  { id: 'badges', label: 'Trust Badges' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'settings', label: 'Contact Info' },
  { id: 'images', label: 'Images' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
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

        {tab === 'overview' && <OverviewTab setTab={setTab} />}
        {tab === 'inquiries' && <InquiriesTab flash={flash} />}
        {tab === 'services' && <ServicesTab flash={flash} />}
        {tab === 'content' && <ContentTab flash={flash} />}
        {tab === 'faqs' && <FaqsTab flash={flash} />}
        {tab === 'team' && <TeamTab flash={flash} />}
        {tab === 'badges' && <BadgesTab flash={flash} />}
        {tab === 'gallery' && <GalleryTab flash={flash} />}
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
    const res = await fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s),
    });
    if (res.ok) {
      flash(`${s.name} saved`);
    } else {
      const data = await res.json().catch(() => ({}));
      flash('Save failed: ' + (data.error || 'unknown error'));
    }
  };

  const emptyProduct = { name: '', slug: '', color: 'navy', description: '', price: 'On request' };
  const [newProduct, setNewProduct] = useState(emptyProduct);

  const addProduct = async () => {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      setNewProduct(emptyProduct);
      flash('Product added');
      fetch('/api/services').then(r => r.json()).then(setServices);
    } else {
      const data = await res.json().catch(() => ({}));
      flash('Could not add: ' + (data.error || 'unknown error'));
    }
  };

  const colorOptions = [
    { value: 'hbv', label: 'Gold' },
    { value: 'hcv', label: 'Pink' },
    { value: 'hiv', label: 'Purple' },
    { value: 'flu', label: 'Teal' },
    { value: 'cchf', label: 'Orange' },
    { value: 'navy', label: 'Navy' },
  ];

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
      <p className="text-sm text-gray-500 mb-6">Edit name, card label, colour, description, price and technical specs for each assay.</p>
      <div className="bg-white border-2 border-dashed border-cyan rounded-xl p-5 mb-6">
        <h3 className="font-bold text-navy mb-3">Add a new product</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <input
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2"
          />
          <input
            placeholder="Home page card label (e.g. BLOOD CANCER)"
            value={newProduct.slug}
            maxLength={24}
            onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2"
          />
          <select
            value={newProduct.color}
            onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            {colorOptions.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input
            placeholder="Price text (e.g. On request)"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2"
          />
        </div>
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 min-h-[70px]"
        />
        <button onClick={addProduct} className="bg-navy text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-navylight transition-colors">
          Add Product
        </button>
        <p className="text-xs text-gray-400 mt-2">It appears on the Services page and the home page. Fill in its technical specs below after adding it.</p>
      </div>

      {services.map((s) => (
        <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
          <input
            value={s.name}
            onChange={(e) => update(s.id, 'name', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 font-semibold text-navy"
          />
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Home page card label</label>
              <input
                value={s.slug || ''}
                maxLength={24}
                disabled={s.slug === 'support'}
                onChange={(e) => update(s.id, 'slug', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 disabled:bg-gray-50 disabled:text-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">Small tag above the product name, e.g. HBV &amp; HCV or DENGUE.</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Card colour</label>
              <select
                value={s.color || 'navy'}
                onChange={(e) => update(s.id, 'color', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 bg-white"
              >
                {colorOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
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
    { key: 'ceo_name', label: 'CEO Section — Name' },
    { key: 'ceo_title', label: 'CEO Section — Job Title' },
    { key: 'ceo_credentials', label: 'CEO Section — Qualifications line (optional, shown under the title)' },
    { key: 'ceo_bio', label: 'CEO Section — Profile (leave a blank line between paragraphs)', long: true },
    { key: 'ceo_message', label: 'CEO Section — Message from the CEO (blank line between paragraphs)', long: true },
    { key: 'prelaunch_notice', label: 'Pre-launch notice (slim banner at the top of every page; clear it to hide at launch)', long: true },
    { key: 'company_reg_number', label: 'SECP Company Registration Number (shown in the footer when filled in)' },
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
    { key: 'ceo_photo', label: 'CEO Photo (About page; square portrait works best)' },
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
            <label
              htmlFor={`img-${s.key}`}
              className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-navylight transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              {content[s.key] ? 'Replace Image' : 'Upload Image'}
              <input
                id={`img-${s.key}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(s.key, e.target.files[0])}
                className="hidden"
              />
            </label>
            {uploading === s.key && <p className="text-xs text-cyan mt-2">Uploading...</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
/* ---------- TEAM TAB ---------- */
function UploadButton({ id, onChange }) {
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-navylight transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      Upload Photo
      <input id={id} type="file" accept="image/*" onChange={onChange} className="hidden" />
    </label>
  );
}

function TeamTab({ flash }) {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', photo_url: '' });
  const [uploading, setUploading] = useState(null);

  const load = () => fetch('/api/team').then(r => r.json()).then(setTeam);
  useEffect(() => { load(); }, []);

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

  const remove = async (id) => {
    await fetch('/api/team', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    flash('Team member removed');
    load();
  };

  const add = async () => {
    if (!newMember.name || !newMember.role) return;
    await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newMember, sort_order: team.length + 1 }),
    });
    setNewMember({ name: '', role: '', bio: '', photo_url: '' });
    flash('Team member added');
    load();
  };

  const uploadPhoto = async (file, onDone) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      onDone(data.url);
      flash('Photo uploaded');
    } else {
      flash('Upload failed: ' + (data.error || 'unknown error'));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Leadership Team</h2>
      <p className="text-sm text-gray-500 mb-6">Add, edit or remove team members shown on the About page.</p>

      {team.map((m) => (
        <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            {m.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.photo_url} alt={m.name} className="w-16 h-16 rounded-full object-cover border-2 border-cyan flex-shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-graybg flex items-center justify-center text-gray-400 text-[10px] text-center flex-shrink-0">
                No Photo
              </div>
            )}
            <UploadButton
              id={`photo-${m.id}`}
              onChange={(e) => uploadPhoto(e.target.files[0], (url) => {
                update(m.id, 'photo_url', url);
                save({ ...m, photo_url: url });
              })}
            />
          </div>

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
          <div className="flex gap-3">
            <button onClick={() => save(m)} className="bg-cyan text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
              Save
            </button>
            <button onClick={() => remove(m.id)} className="bg-white border border-cchf text-cchf px-5 py-2 rounded-lg font-semibold hover:bg-cchf hover:text-white transition-colors">
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="bg-white border-2 border-dashed border-cyan rounded-xl p-5">
        <h3 className="font-bold text-navy mb-3">Add New Team Member</h3>
        <div className="flex items-center gap-4 mb-4">
          {newMember.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={newMember.photo_url} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-cyan flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-graybg flex items-center justify-center text-gray-400 text-[10px] text-center flex-shrink-0">
              No Photo
            </div>
          )}
          <UploadButton
            id="photo-new"
            onChange={(e) => uploadPhoto(e.target.files[0], (url) => setNewMember({ ...newMember, photo_url: url }))}
          />
        </div>
        <input
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3"
        />
        <input
          placeholder="Role / Title"
          value={newMember.role}
          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3"
        />
        <textarea
          placeholder="Bio"
          value={newMember.bio}
          onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 min-h-[70px]"
        />
        <button onClick={add} className="bg-navy text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
          + Add Team Member
        </button>
        {uploading && <p className="text-xs text-cyan mt-2">Uploading photo...</p>}
      </div>
    </div>
  );
}
/* ---------- BADGES TAB ---------- */
function BadgesTab({ flash }) {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetch('/api/trust-badges').then(r => r.json()).then(setBadges);
  }, []);

  const update = (id, field, value) => {
    setBadges(badges.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const save = async (b) => {
    await fetch('/api/trust-badges', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(b),
    });
    flash(`${b.title} saved`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Trust Badges</h2>
      <p className="text-sm text-gray-500 mb-6">These credibility points appear on the Home page.</p>
      {badges.map((b) => (
        <div key={b.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
          <input
            value={b.title}
            onChange={(e) => update(b.id, 'title', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-3 font-semibold text-navy"
          />
          <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
          <textarea
            value={b.description}
            onChange={(e) => update(b.id, 'description', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4 min-h-[60px]"
          />
          <button onClick={() => save(b)} className="bg-cyan text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
            Save
          </button>
        </div>
      ))}
    </div>
  );
}
/* ---------- INQUIRIES TAB ---------- */
function InquiriesTab({ flash }) {
  const [inquiries, setInquiries] = useState([]);

  const load = () => fetch('/api/inquiries').then(r => r.json()).then(setInquiries);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await fetch('/api/inquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    flash('Status updated');
    load();
  };

  const remove = async (id) => {
    await fetch('/api/inquiries', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    flash('Enquiry deleted');
    load();
  };

  const statusColors = {
    New: 'bg-cyan/10 text-cyan',
    'In Progress': 'bg-hbv/10 text-hbv',
    Closed: 'bg-gray-200 text-gray-500',
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Website Enquiries</h2>
      <p className="text-sm text-gray-500 mb-6">Messages submitted through the Contact page form.</p>

      {inquiries.length === 0 && (
        <p className="text-gray-400 text-sm bg-white border border-gray-200 rounded-xl p-6 text-center">No enquiries yet.</p>
      )}

      {inquiries.map((inq) => (
        <div key={inq.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
          <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
            <div>
              <p className="font-bold text-navy">{inq.name} {inq.organization && <span className="text-gray-400 font-normal">— {inq.organization}</span>}</p>
              <p className="text-xs text-gray-400">{new Date(inq.created_at).toLocaleString()}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[inq.status] || statusColors.New}`}>
              {inq.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1 mb-3">
            <p><span className="font-semibold text-navy">Type:</span> {inq.inquiry_type}</p>
            <p><span className="font-semibold text-navy">Email:</span> {inq.email}</p>
            {inq.phone && <p><span className="font-semibold text-navy">Phone:</span> {inq.phone}</p>}
            <p className="pt-2 border-t border-gray-100 mt-2">{inq.message}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={inq.status}
              onChange={(e) => updateStatus(inq.id, e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
            <button onClick={() => remove(inq.id)} className="text-cchf text-sm font-semibold hover:underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
/* ---------- OVERVIEW TAB ---------- */
function OverviewTab({ setTab }) {
  const [stats, setStats] = useState({ inquiries: [], services: 0, faqs: 0, team: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/inquiries').then(r => r.json()),
      fetch('/api/services').then(r => r.json()),
      fetch('/api/faqs').then(r => r.json()),
      fetch('/api/team').then(r => r.json()),
    ]).then(([inquiries, services, faqs, team]) => {
      setStats({ inquiries, services: services.length, faqs: faqs.length, team: team.length });
    });
  }, []);

  const newCount = stats.inquiries.filter(i => i.status === 'New').length;
  const recent = stats.inquiries.slice(0, 5);

  const cards = [
    { label: 'New Enquiries', value: newCount, color: 'text-cchf', bg: 'bg-cchf/10', tab: 'inquiries' },
    { label: 'Total Enquiries', value: stats.inquiries.length, color: 'text-cyan', bg: 'bg-cyan/10', tab: 'inquiries' },
    { label: 'Services Listed', value: stats.services, color: 'text-hiv', bg: 'bg-hiv/10', tab: 'services' },
    { label: 'FAQs Published', value: stats.faqs, color: 'text-flu', bg: 'bg-flu/10', tab: 'faqs' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Dashboard Overview</h2>
      <p className="text-sm text-gray-500 mb-6">Quick snapshot of your website activity.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => setTab(c.tab)}
            className={`${c.bg} rounded-xl p-5 text-left hover:scale-[1.02] transition-transform`}
          >
            <p className={`text-3xl font-extrabold ${c.color}`}>{c.value}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">{c.label}</p>
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-navy">Recent Enquiries</h3>
          <button onClick={() => setTab('inquiries')} className="text-cyan text-sm font-semibold hover:underline">
            View all →
          </button>
        </div>
        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((inq) => (
              <div key={inq.id} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-navy text-sm">{inq.name}</p>
                  <p className="text-xs text-gray-400">{inq.inquiry_type} — {new Date(inq.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${inq.status === 'New' ? 'bg-cyan/10 text-cyan' : 'bg-gray-100 text-gray-500'}`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
/* ---------- GALLERY TAB ---------- */
function GalleryTab({ flash }) {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = () => fetch('/api/gallery').then(r => r.json()).then(setImages);
  useEffect(() => { load(); }, []);

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (data.url) {
      const galleryRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: data.url, caption, sort_order: images.length + 1 }),
      });
      const galleryData = await galleryRes.json();
      if (galleryRes.ok) {
        setCaption('');
        flash('Image added to gallery');
        load();
      } else {
        flash('Gallery save failed: ' + (galleryData.error || 'unknown error'));
      }
    } else {
      flash('Upload failed: ' + (data.error || 'unknown error'));
    }
    setUploading(false);
  };

  const remove = async (id) => {
    await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    flash('Image removed');
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-1">Image Gallery</h2>
      <p className="text-sm text-gray-500 mb-6">Add or remove photos shown in the Home page gallery.</p>

      <div className="bg-white border-2 border-dashed border-cyan rounded-xl p-5 mb-6">
        <h3 className="font-bold text-navy mb-3">Add New Image</h3>
        <input
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3"
        />
        <label
          htmlFor="gallery-upload"
          className="inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-navylight transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Image
          <input id="gallery-upload" type="file" accept="image/*" onChange={(e) => upload(e.target.files[0])} className="hidden" />
        </label>
        {uploading && <p className="text-xs text-cyan mt-2">Uploading...</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.image_url} alt={img.caption} className="w-full h-28 object-cover" />
            <div className="p-2">
              <p className="text-xs text-gray-500 truncate mb-2">{img.caption || 'No caption'}</p>
              <button onClick={() => remove(img.id)} className="text-cchf text-xs font-semibold hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
