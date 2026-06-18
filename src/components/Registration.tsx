import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function RegistrationForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    occupation: "",
    membershipType: "regular",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.country.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Registration Submitted!", description: "We'll be in touch shortly. Welcome to the IID family!" });
      setForm({ fullName: "", email: "", phone: "", country: "", occupation: "", membershipType: "regular" });
      onClose();
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className={inputClass} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+44 800 000 0000" className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Country of Residence *</label>
        <input name="country" value={form.country} onChange={handleChange} placeholder="e.g. United Kingdom" className={inputClass} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Occupation</label>
        <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Your profession" className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Membership Type</label>
        <select name="membershipType" value={form.membershipType} onChange={handleChange} className={inputClass}>
          <option value="regular">Regular Member</option>
          <option value="associate">Associate Member</option>
          <option value="patron">Patron</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Register Now"}
      </button>
    </form>
  );
}

export default function Registration() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="register" className="section-padding bg-primary">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <button
              onClick={() => setOpen(true)}
              className="btn-primary text-center"
            >
              Register Now
            </button>
          </motion.div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold">Membership Registration</DialogTitle>
          </DialogHeader>
          <RegistrationForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
