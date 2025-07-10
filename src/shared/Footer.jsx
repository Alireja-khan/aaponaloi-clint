import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import AaponaloiLogo from './AaponaloiLogo2';

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] text-white px-6 lg:px-20 py-12">
            <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
                {/* Logo and Intro */}
                <div>
                    <div className='flex flex-col '>
                        <AaponaloiLogo></AaponaloiLogo>
                        <p className='-mt-5 text-xl'>Aaponaloi</p>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Aaponaloi helps you manage your building efficiently. Join us to
                        make your property smarter and smoother.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/apartments" className="hover:text-white transition">Apartments</a></li>
                        <li><a href="/agreements" className="hover:text-white transition">Agreements</a></li>
                        <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
                        <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* Newsletter + Socials */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                    <form className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="px-4 py-2 rounded-md bg-white text-black text-sm focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primaryHover transition px-4 py-2 rounded-md text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="hover:text-primaryLight">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-primaryLight">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-primaryLight">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-primaryLight">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Aaponaloi. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
