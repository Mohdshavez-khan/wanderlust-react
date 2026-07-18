import { Link } from "react-router-dom";
import "./footer.css";

const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "About", to: "/" },
    { label: "Contact", to: "/" },
];

const supportLinks = [
    { label: "Help Center", to: "/" },
    { label: "FAQs", to: "/" },
    { label: "Privacy Policy", to: "/" },
    { label: "Terms & Conditions", to: "/" },
    { label: "Refund Policy", to: "/" },
];

const socialLinks = [
    { icon: "fa-brands fa-facebook-f", label: "Facebook", href: "https://facebook.com" },
    { icon: "fa-brands fa-instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "fa-brands fa-linkedin-in", label: "LinkedIn", href: "https://linkedin.com" },
    { icon: "fa-brands fa-github", label: "GitHub", href: "https://github.com" },
    { icon: "fa-brands fa-x-twitter", label: "Twitter", href: "https://twitter.com" },
];

function Footer() {
    return (
        <footer className="footer-section mt-5 border-top shadow-sm">
            <div className="container py-5">
                <div className="row g-4 g-lg-5">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="d-flex align-items-center m-0 mb-3">
                            <div className="footer-brand-icon d-flex align-items-center justify-content-center rounded-circle">
                                <i className="fa-regular fa-compass"></i>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-0">Wanderlust</h5>
                                <small className="text-muted">Stay somewhere special</small>
                            </div>
                        </div>

                        <p className="text-muted mb-3">
                            Discover unique stays and unforgettable experiences around the world.
                        </p>

                        <div className="d-flex flex-wrap gap-2">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={item.label}
                                    className="footer-social-link d-inline-flex align-items-center justify-content-center rounded-circle"
                                >
                                    <i className={item.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="col-6 col-sm-6 col-lg-3">
                        <h6 className="fw-semibold mb-3">Quick Links</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to} className="footer-link text-decoration-none">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-6 col-sm-6 col-lg-3">
                        <h6 className="fw-semibold mb-3">Support</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2">
                            {supportLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to} className="footer-link text-decoration-none">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <h6 className="fw-semibold mb-3">Contact</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 text-muted">
                            <li className="d-flex align-items-start gap-2">
                                <i className="fa-solid fa-envelope mt-1"></i>
                                <span>support@wanderlust.com</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                                <i className="fa-solid fa-phone mt-1"></i>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                                <i className="fa-solid fa-location-dot mt-1"></i>
                                <span>145 Market Street, San Francisco, CA</span>
                            </li>
                            <li className="d-flex align-items-start gap-2">
                                <i className="fa-solid fa-clock mt-1"></i>
                                <span>Available 24/7 for your bookings</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="border-top py-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <p className="mb-0 text-muted small">
                        &copy; 2026 Wanderlust Private Limited. All rights reserved.
                    </p>
                    <p className="mb-0 text-muted small">
                        Made with React, Bootstrap, Node.js & MongoDB
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;