import "../styles/components/Nav.css";
import searchIcon from "../assets/search-icon.svg";
import cartIcon from "../assets/shopping-cart.svg";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CartContext from "../CartContext";
import SearchContext from "../SearchContext"

function Nav() {
    const { cartItems } = useContext(CartContext);
    const { setSearchQuery, searchInput, setSearchInput} = useContext(SearchContext);
    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        setSearchQuery(searchInput);
        navigate("/shop");
    }

    return (
        <header>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop" onClick={() => {
                        setSearchInput("");
                        setSearchQuery("");
                    }}
                >
                    Shop
                </NavLink>
            </div>


            <form
                className="search-bar"
                onSubmit={handleSubmit}
            >
                <img src={searchIcon} alt="A magnifying glass" />
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit">&#x276F;</button>
            </form>

            <div className='cart'>
                <NavLink to="/cart" aria-label="Cart">
                    <img
                        src={cartIcon}
                        alt="A shopping cart"
                    />
                </NavLink>
                <p>{getTotalItems(cartItems)}</p>
            </div>
        </header >
    );
}

function getTotalItems(cartItems) {
    return cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    );
}

export default Nav;