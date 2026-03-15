import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, MessageCircle, Heart } from "lucide-react";

interface JoinModalProps {
  children: React.ReactNode;
}

export default function JoinModal({ children }: JoinModalProps) {
  const [open, setOpen] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+44 07723953174",
      href: "tel:+4407723953174",
      color: "bg-green-600",
      description: "Speak directly with our team",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "info@ijebuigbodescendants.org",
      href: "mailto:info@ijebuigbodescendants.org",
      color: "bg-blue-600",
      description: "Send us your details",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+44 07723953174",
      href: "https://wa.me/4407723953174",
      color: "bg-emerald-600",
      description: "Chat with us instantly",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {/* Welcome icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <Heart className="w-8 h-8 text-accent" fill="currentColor" />
          </div>

          <DialogTitle className="text-2xl sm:text-3xl font-display text-center">
            Ẹ̀ wẹ̀ sọ̀ọ́ Ọmọ Alárè! 
          </DialogTitle>
          
          <DialogDescription className="text-center text-base sm:text-lg !mt-2">
            <span className="block text-foreground/80 mb-4">
              Welcome, proud son or daughter of Ijebu Igbo!
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Warm message */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-5">
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              We are thrilled that you want to join the{" "}
              <strong className="text-primary font-semibold">
                Ijebu Igbo Descendants in Diaspora (IID), UK
              </strong>
              . Together, we're building a stronger community, preserving our heritage, 
              and driving development back home.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg">Why Join IID UK?</h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Connect with Ijebu Igbo descendants worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Contribute to meaningful community development projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Preserve and celebrate our rich cultural heritage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Access exclusive events and networking opportunities</span>
              </li>
            </ul>
          </div>

          {/* Contact methods */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg">Get in Touch</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Reach out to us through any of these channels to start your membership journey:
            </p>
            
            <div className="space-y-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.label === "WhatsApp" ? "_blank" : undefined}
                  rel={method.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 active:scale-[0.98] transition-all duration-200 touch-manipulation group"
                >
                  <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center flex-shrink-0`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors text-sm sm:text-base">
                      {method.label}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
                      {method.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer message */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
            <p className="text-sm text-foreground/70 italic">
              "United by heritage, driven by purpose, building a greater Ijebu Igbo for all."
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
