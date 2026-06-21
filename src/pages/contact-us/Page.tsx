 
import { HiOutlineShieldCheck } from "react-icons/hi2";
 
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="py-20 ">
      <section className="rounded-3xl max-w-4xl mx-auto border-border">
           {/* ============ HEADER ============ */}
           <div className="text-center mb-8 md:mb-10">
             <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
               <HiOutlineShieldCheck className="w-3.5 h-3.5" />
               Trusted Support
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
               Get in Touch
             </h2>
             <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
               Have questions about buying, selling, or verifying your identity? Our
               team in Wa is ready to help. We respond within 24 hours.
             </p>
           </div>
     
           {/* ============ GRID ============ */}
           <div className="grid md:grid-cols-5 gap-8 md:gap-10">
             {/* ============ LEFT - CONTACT INFO ============ */}
             <ContactInfo />
     
             {/* ============ RIGHT - FORM ============ */}
             <div className="md:col-span-3">
               <ContactForm/>
             </div>
           </div>
         </section>
    </div>
  );
};

export default ContactPage;
