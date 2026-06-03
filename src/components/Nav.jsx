import "../styles/Nav.css";

import searchIcon from "../assets/search-icon.svg";
import cartIcon from "../assets/shopping-cart.svg";

import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <header>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
            </div>
            

            <form className='search-bar'>
                <img src={searchIcon} alt="A magnifying glass" />
                <input 
                    type="text" 
                    placeholder="What are you looking for?" 
                />
                <button>&#x276F;</button>
            </form>

            <div className='cart'>
                <NavLink to="/cart">
                    <img 
                        src={cartIcon} 
                        alt="A shopping cart" 
                    />
                </NavLink>
                <p>0</p>
            </div>
        </header>
    );
}
export default Nav;