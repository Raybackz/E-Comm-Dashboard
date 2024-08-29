import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiAlignRight } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Nav = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false)

    const auth = localStorage.getItem("user");
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    const handleToggle = () => [
        setToggle(!toggle)
    ]

    return (
        <div>
            <img
                src="https://www.pngitem.com/pimgs/m/32-323486_logo-letter-r-png-transparent-png.png"
                alt="logoImg"
                className="logoImg"
            />
            {auth ? (
                <ul className="nav-ul">
                    <li className={toggle ? `nav-ul-li` : `nav-ul-li-toggler`}>
                        <NavLink
                            className={`nav-link ${toggle ? 'active nav-ul-li-a' : 'nav-ul-li-a-toggler'}`}
                            aria-current="page"
                            to="/"
                            style={({ isActive }) => {
                                return { color: isActive ? "#646cff" : "black" };
                            }}
                        >
                            Products{" "}
                        </NavLink>
                    </li>
                    <li className={toggle ? `nav-ul-li` : `nav-ul-li-toggler`}>
                        <NavLink
                            className={`nav-link ${toggle ? 'active nav-ul-li-a' : 'nav-ul-li-a-toggler'}`}
                            to="/add"
                            style={({ isActive }) => {
                                return { color: isActive ? "#646cff" : "black" };
                            }}
                        >
                            Add Products
                        </NavLink>
                    </li>
                    <li className={toggle ? `nav-ul-li` : `nav-ul-li-toggler`}>
                        <NavLink
                            className={`nav-link ${toggle ? 'active nav-ul-li-a' : 'nav-ul-li-a-toggler'}`}
                            to="/update"
                            style={({ isActive }) => {
                                return { color: isActive ? "#646cff" : "black" };
                            }}
                        >
                            Update Products
                        </NavLink>
                    </li>

                    <li className={toggle ? `nav-ul-li` : `nav-ul-li-toggler`}>
                        <NavLink
                            className={`nav-link ${toggle ? 'active nav-ul-li-a' : 'nav-ul-li-a-toggler'}`}
                            to="/signup"
                            onClick={logout}
                            style={({ isActive }) => {
                                return { color: isActive ? "#646cff" : "black" };
                            }}
                        >
                            Logout
                        </NavLink>
                    </li>
                    <li className="nav-helloName">Hello, {JSON.parse(auth).name}</li>
                    {toggle ? <IoClose className="togglerClose" onClick={handleToggle} /> : <FiAlignRight className="togglerClose" onClick={handleToggle} />}

                </ul>
            ) : (
                <ul className="nav-ul nav-right">
                    <li>
                        <NavLink className="nav-link active nav-ul-li-a"
                            aria-current="page" to="/signup"
                            style={({ isActive }) => {
                                return { color: isActive ? "#646cff" : "black" };
                            }}>Signup</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-ul-li-a" to="/login" style={({ isActive }) => {
                            return { color: isActive ? "#646cff" : "black" };
                        }}>Login</NavLink>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
