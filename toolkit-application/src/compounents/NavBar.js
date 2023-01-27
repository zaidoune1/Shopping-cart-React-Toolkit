    import "./NavBar.css"
    import { Link, useParams} from "react-router-dom"
    import { useSelector } from "react-redux"
    import { FaShoppingCart } from "react-icons/fa";
    import { AiTwotoneHome } from "react-icons/ai";
    import { createContext, useEffect, useState } from "react";
    import AllProducts from "./All-products";

    
    function NavBar() {

        const stateNav = useSelector((stateNav) => stateNav.cards)


    return (
        <>
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand navLink" to="/">About</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link logo navLink" aria-current="page" to="/">Home {<AiTwotoneHome className="icnon-card"/>} </Link>
            </li>
            <li className="nav-item">
            {stateNav.length > 0  ? <Link className="nav-link navLink" to="/cards">Card { <FaShoppingCart className="icnon-card navLinkRelative"/>}<span className="itemInCard">{stateNav.length}</span></Link> : <Link className="nav-link logo navLink">Card { <FaShoppingCart className="icnon-card navLinkRelative "/>}  </Link>  }
            </li>
        </ul>
        </div>
    </div>
    </nav>
    </>


    )
    }

    export default NavBar