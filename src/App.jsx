import "./App.css"
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import CartContext from "./CartContext.js";

function App() {
    const [cartItems, setCartItems] = useState([]);
    function addToCart(product, quantity) {
        setCartItems(prev => {
            const existing = prev.find(
                item => item.id === product.id
            );
            if(existing){
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
    function updateQuantity(product, quantity) {
        setCartItems(prev => prev.map(
            item => item.id === product.id ?
                { ...item, quantity: quantity } :
                item
        ))
    }
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity}}>
            <Nav />
            <Outlet />
            <Footer />
        </CartContext.Provider>
    )
}

export default App;