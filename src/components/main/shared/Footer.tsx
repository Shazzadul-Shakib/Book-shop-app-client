import {
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary px-6 py-12 text-white">
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
        {/* Logo and Description Section */}
        <div className="mb-12 lg:mb-0 lg:w-1/3 lg:pr-6">
          <div className="mb-7 flex justify-center lg:justify-start">
            <h1 className=" text-2xl font-bold">My Bookstore</h1>
          </div>
          <div className="mt-4 flex justify-center space-x-4 lg:justify-start">
            <Link to="#" className=" hover:text-accenttext-green-500">
              <Facebook size={28} />
            </Link>
            <Link to="#" className=" hover:text-accenttext-green-500">
              <Youtube size={28} />
            </Link>
            <Link to="#" className=" hover:text-accenttext-green-500">
              <Linkedin size={28} />
            </Link>
            <Link to="#" className=" hover:text-accenttext-green-500">
              <Instagram size={28} />
            </Link>
          </div>
        </div>

        {/* Other Sections */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 lg:w-2/3 lg:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Link</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className=" hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className=" hover:text-accent"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/blog" className=" hover:text-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className=" hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className=" hover:text-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className=" hover:text-accent"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className=" hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Proof */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Social Proof</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className=" hover:text-accent">
                  Awards
                </Link>
              </li>
              <li>
                <Link to="#" className=" hover:text-accent">
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="#" className=" hover:text-accent">
                  Security
                </Link>
              </li>
              <li>
                <Link to="#" className=" hover:text-accent">
                  Badges
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="" />
                <span className="">Address Placeholder</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={20} className="" />
                <span className="">Phone Placeholder</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={20} className="" />
                <span className="">Email Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm ">
        &copy; {currentYear} My Bookstore. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
