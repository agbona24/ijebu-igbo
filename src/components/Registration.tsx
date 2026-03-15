import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Registration() {
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
      toast({ title: "Registration Submitted!", description: "We'll be in touch shortly. Welcome to the IJIDD family!" });
      setForm({ fullName: "", email: "", phone: "", country: "", occupation: "", membershipType: "regular" });
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300";

  return (
    <section id="register" className="section-padding bg-primary">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="label-accent !text-accent">Membership</h2>
            <h3 className="heading-section !text-primary-foreground">Become a Member</h3>
            <p className="text-primary-foreground/70 leading-relaxed mt-4 mb-8">
              Join thousands of Ijebu Igbo descendants worldwide. As a member, you'll have access to community events, networking opportunities, and the chance to contribute to the development of our homeland.
            </p>
            <div className="space-y-4">
              {[
                "Access to exclusive community events and networking",
                "Voting rights in organizational decisions",
                "Regular newsletters and cultural updates",
                "Opportunity to contribute to development projects",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                  <p className="text-primary-foreground/80 text-sm">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card p-8 md:p-10 rounded-sm shadow-elevated space-y-5"
          >
            <h4 className="font-display font-bold text-foreground text-xl mb-2">Registration Form</h4>

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
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" className={inputClass} />
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
          </motion.form>
        </div>
      </div>
    </section>
  );
}
