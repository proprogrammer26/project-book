import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Book Project</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li><Link to="/user" className="nav-link">User</Link></li>
                        <li><Link to="/book" className="nav-link">Buku</Link></li>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar