import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Copy, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  "Food & Catering",
  "Fashion & Beauty",
  "Real Estate",
  "Professional Services",
  "Technology",
  "Health & Wellness",
  "Retail & Trade",
  "Other",
];

interface ListBusinessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-1.5 text-muted-foreground hover:text-primary transition-colors"
      aria-label="Copy"
    >
      {copied ? <CheckCircle2 size={13} className="text-green-500" /> : <Copy size={13} />}
    </button>
  );
}

export default function ListBusinessModal({ open, onOpenChange }: ListBusinessModalProps) {
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    tagline: "",
    description: "",
    location: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    ownerName: "",
    paymentRef: "",
    paymentBank: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const msg = [
      "🏢 *BUSINESS DIRECTORY LISTING REQUEST*",
      "",
      `*Business Name:* ${form.businessName}`,
      `*Category:* ${form.category}`,
      form.tagline ? `*Tagline:* ${form.tagline}` : "",
      `*Description:* ${form.description}`,
      `*Location:* ${form.location}`,
      form.phone ? `*Phone:* ${form.phone}` : "",
      form.whatsapp ? `*WhatsApp:* ${form.whatsapp}` : "",
      form.email ? `*Email:* ${form.email}` : "",
      form.website ? `*Website:* ${form.website}` : "",
      `*Owner Name:* ${form.ownerName}`,
      "",
      "💳 *PAYMENT DETAILS*",
      `*Bank:* ${form.paymentBank}`,
      `*Payment Reference:* ${form.paymentRef}`,
      "",
      "_(Please attach your payment screenshot to this message)_",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/447496933887?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitting(false);
    onOpenChange(false);
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
            <Building2 size={20} className="text-accent" />
            List Your Business
          </DialogTitle>
        </DialogHeader>

        {/* Payment instructions */}
        <div className="bg-accent/8 border border-accent/25 rounded-xl p-4 mb-2">
          <p className="text-sm font-semibold text-foreground mb-1">Step 1 — Make Payment</p>
          <p className="text-xs text-muted-foreground mb-3">
            Pay your yearly subscription, then fill in your business details below and submit via WhatsApp.
            Attach your payment screenshot in the WhatsApp chat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* UK */}
            <div className="bg-background rounded-lg border border-border p-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">🇬🇧 UK — Natwest</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Account No.</span>
                  <span className="font-bold text-foreground flex items-center">21598770 <CopyButton value="21598770" /></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sort Code</span>
                  <span className="font-bold text-foreground flex items-center">501029 <CopyButton value="501029" /></span>
                </div>
              </div>
            </div>
            {/* Nigeria */}
            <div className="bg-background rounded-lg border border-border p-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">🇳🇬 Nigeria — FCMB</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Account No.</span>
                  <span className="font-bold text-foreground flex items-center">4052231013 <CopyButton value="4052231013" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3 font-medium">Step 2 — Fill in your business details</p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Business Name *</label>
              <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="e.g. Topawo Enterprises" className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass} required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Tagline</label>
            <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="One-line description of your business" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="What does your business do?" className={inputClass + " resize-none"} rows={3} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Location *</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="City, Country" className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Owner Name *</label>
              <input name="ownerName" value={form.ownerName} onChange={handleChange} placeholder="Your full name" className={inputClass} required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7000 000000" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">WhatsApp</label>
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+44 7000 000000" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="business@email.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Website</label>
              <input name="website" value={form.website} onChange={handleChange} placeholder="www.yourbusiness.com" className={inputClass} />
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <p className="text-xs font-semibold text-foreground mb-2">Payment Confirmation</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Bank Paid To *</label>
                <select name="paymentBank" value={form.paymentBank} onChange={handleChange} className={inputClass} required>
                  <option value="">Select bank</option>
                  <option value="Natwest (UK)">Natwest (UK)</option>
                  <option value="FCMB (Nigeria)">FCMB (Nigeria)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Payment Reference *</label>
                <input name="paymentRef" value={form.paymentRef} onChange={handleChange} placeholder="Transaction ID / reference" className={inputClass} required />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              After submitting, attach your payment screenshot in the WhatsApp chat.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-center disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Submit via WhatsApp
          </button>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}
