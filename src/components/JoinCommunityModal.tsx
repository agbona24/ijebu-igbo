import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";

const IJEBU_IGBO_CLANS = [
  "Oke-Agbo",
  "Oke-Sopen",
  "Itamarun",
  "Irolu",
  "Oke-Odode",
  "Parakoyi",
  "Oke-Lowo",
  "Ita-Ntebo",
  "Oke-Eri",
  "Ijasi",
  "Imope",
  "Ago",
  "Ogbe",
  "Other",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function JoinCommunityModal({ open, onOpenChange }: Props) {
  const [form, setForm] = useState({ fullName: "", clan: "", location: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = [
      "👋 *REQUEST TO JOIN IID WHATSAPP COMMUNITY*",
      "",
      `*Full Name:* ${form.fullName}`,
      `*Clan / Quarter:* ${form.clan}`,
      `*Location:* ${form.location}`,
      "",
      "_Please add me to the IID Omo Orimolusi WhatsApp community group. Thank you._",
    ].join("\n");

    window.open(
      `https://wa.me/447496933887?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    onOpenChange(false);
    setForm({ fullName: "", clan: "", location: "" });
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
            <Users size={20} className="text-accent" />
            Join Our WhatsApp Community
          </DialogTitle>
        </DialogHeader>

        <div className="bg-green-500/10 border border-green-500/25 rounded-xl p-4 mb-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fill in your details below and we'll add you to the{" "}
            <strong className="text-foreground">IID Omo Orimolusi</strong>{" "}
            WhatsApp community group — connecting Ijebu Igbo descendants across
            the diaspora.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pt-1"
        >
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Full Name *
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Clan / Quarter in Ijebu Igbo *
            </label>
            <select
              name="clan"
              value={form.clan}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select your clan / quarter</option>
              {IJEBU_IGBO_CLANS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Where are you based? *
            </label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select your location</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Other Diaspora">Other Diaspora</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl transition-colors duration-200 touch-manipulation"
          >
            {WA_ICON}
            Send Request via WhatsApp
          </button>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}
