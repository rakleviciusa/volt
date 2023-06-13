import React, { useContext } from 'react'
import './NavbarStyle.scss'
import AuthContext from '../context/AuthContext'

const Navbar = ({children}) => {
    const{user} = useContext(AuthContext)
    return (
        <nav>
            <ul className="nav-links">
                <div className="menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/register">Register</a></li>
                    {!user && <li><a href="/login">Login</a></li>}
                    {user && <li><a href="#">{user.sub}</a></li>}
                </div>
            </ul>
        </nav>
    )
}

export default Navbar