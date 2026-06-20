import "../styles/Nav.css";

import searchIcon from "../assets/search-icon.svg";
import cartIcon from "../assets/shopping-cart.svg";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CartContext from "../CartContext";

function Nav() {
    const {cartItems} = useContext(CartContext);
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
                <p>{getTotalItems(cartItems)}</p>
            </div>
        </header>
    );
}

function getTotalItems(cartItems){
    return cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    );
}

export default Nav;