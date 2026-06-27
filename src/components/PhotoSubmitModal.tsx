import { useState } from "react";
import { X, Camera, Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "Community Event", "AGM / Meeting", "Cultural Festival",
  "Ojude Oba", "Charity / Fundraiser", "Family / Personal", "Homeland Visit", "Other",
];

export default function PhotoSubmitModal({ open, onClose }: Props) {
  const [name,     setName]     = useState("");
  const [caption,  setCaption]  = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `📸 *Photo Submission — Connect Ijebu Roots Gallery*\n\n` +
      `*Name:* ${name}\n` +
      `*Category:* ${category || "Not specified"}\n` +
      `*Caption:* ${caption || "None"}\n\n` +
      `_(Please attach your photo to this WhatsApp message)_`;
    const url = `https://wa.me/447496933887?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
    setName(""); setCaption(""); setCategory("");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md w-full rounded-2xl p-0 overflow-hidden gap-0">
        {/* Header */}
        <div className="bg-primary px-6 py-5 flex items-start justify-between">
          <div>
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mb-3">
              <Camera size={20} className="text-accent" />
            </div>
            <h2 className="font-display font-black text-primary-foreground text-xl">Submit a Photo</h2>
            <p className="text-primary-foreground/60 text-sm mt-1">
              Your photo may be added to the community gallery.
            </p>
          </div>
          <button onClick={onClose} className="text-primary-foreground/50 hover:text-primary-foreground mt-1">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 bg-background">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Photo Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Caption (optional)</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe the photo — event, date, people, location…"
              rows={3}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-700">
            Clicking submit will open WhatsApp. Attach your photo to the message before sending.
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors"
          >
            <Upload size={16} /> Open WhatsApp to Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
