import "./App.css"
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import CartContext from "./CartContext.js";
import SearchContext from "./SearchContext.js";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    function addToCart(product, quantity) {
        setCartItems(prev => {
            const existing = prev.find(
                item => item.id === product.id
            );
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? {
                            ...item, quantity: item.quantity + quantity
                        }
                        : item
                )
            } else {
                return [
                    ...prev, { ...product, quantity: quantity }
                ];
            }
        })
    }
    function removeFromCart(productId) {
        setCartItems(prev =>
            prev.filter(item => item.id !== productId)
        );
    }
    function updateQuantity(productId, quantity) {
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ?
                    { ...item, quantity: quantity } :
                    item
            ))
    }
    return (
        <SearchContext.Provider value={{
            searchQuery,setSearchQuery,
            searchInput, setSearchInput
        }}>
            <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
                <Nav />
                <Outlet />
                <Footer />
            </CartContext.Provider>
        </SearchContext.Provider>
    )
}

export default App;