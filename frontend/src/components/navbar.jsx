import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useState } from "react";
import SearchBar from "./SearchBar";

function Navbar() {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const handleNavClick = () => {
        setShowSearch(false);
        closeMenu();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout Successfully");
        handleNavClick();
        navigate("/");
    };

    const token = localStorage.getItem("token");
    let username = "";
    if (token) {
        const decoded = jwtDecode(token);
        username = decoded.username;
    }

    return (
        <>
            {!showSearch && (
                <nav className="navbar navbar-expand-lg sticky-top border-bottom">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/" onClick={handleNavClick}>
                            <i className="fa-regular fa-compass"></i>
                            <span className="brand-text">Wanderlust</span>
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle navigation"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNavAltMarkup">
                            <div className="navbar-nav me-auto">
                                <Link className="nav-link" aria-current="page" to="/" onClick={handleNavClick}>Home</Link>
                                <Link className="nav-link" to="/listings/new" onClick={handleNavClick}>Create Listing</Link>
                                <Link className="nav-link" to="/wishlist" onClick={handleNavClick}>My Wishlist</Link>
                            </div>

                            <div className="d-none d-lg-block m-0-auto navbar-nav search-bar-container">
                                <SearchBar />
                            </div>

                            <div className="d-lg-none navbar-nav ms-auto">
                                <button
                                    className="btn btn-link nav-link mobile-search-toggle"
                                    onClick={() => {
                                        setShowSearch(true);
                                        closeMenu();
                                    }}
                                >
                                  Search
                                </button>
                            </div>

                            <div className="navbar-nav ms-auto align-items-lg-center">
                                {token && (
                                    <span className="username-badge">
                                        Hi, {username}
                                    </span>
                                )}
                                {localStorage.getItem("token") ? (
                                    <button className="nav-link nav-action-btn nav-action-btn-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link className="nav-link  nav-action-btn" to="/signup" onClick={handleNavClick}>Signup</Link>
                                        <Link className="nav-link  nav-action-btn" to="/login" onClick={handleNavClick}>Login</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            {showSearch && <SearchBar mobile={true} closeSearch={() => setShowSearch(false)} />}
        </>
    );
}

export default Navbar;

