import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar: React.FC = () => (
    <header className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo">
                SKIN STUDIO
            </Link>
            <nav className="navbar-links">
                <Link to="/quiz">Quiz-uri</Link>
                <Link to="/home-recipes">Blog</Link>
                {/* Adaugă alte secțiuni dacă vrei */}
            </nav>
        </div>
    </header>
);

export default Navbar;
