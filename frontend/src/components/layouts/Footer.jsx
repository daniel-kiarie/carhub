import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-slate-900 text-white py-12 mt-20 border-t border-slate-800">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-xl font-bold mb-4">
          CAR<span className="text-blue-500">HUB</span>
        </h3>
        <p className="text-slate-400 text-sm">
          Find the best deals on quality cars in Nairobi.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Quick Links</h4>
        <ul className="text-slate-400 space-y-2 text-sm">
          <li>Home</li>
          <li>Inventory</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Contact</h4>

        <p className="text-slate-400 text-sm flex items-center gap-2">
          <MapPin size={16} /> Nairobi, Kenya
        </p>

        <p className="text-slate-400 text-sm flex items-center gap-2">
          <Phone size={16} /> +254 796 147 140
        </p>

        <p className="text-slate-400 text-sm flex items-center gap-2">
          <Mail size={16} /> info@carhub.com
        </p>
      </div>
    </div>
  </footer>
);
export default Footer;
