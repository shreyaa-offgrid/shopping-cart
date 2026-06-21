import "../styles/Cart.css"
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useContext } from "react";
import CartContext from "../CartContext";

function Cart(){
    const {cartItems} = useContext(CartContext);
    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            <hr />
            <div className="cart-main">
                <div className="left">
                    {cartItems.map(
                        item => (<CartItem key = {item.id} {...item}/>)
                    )}
                </div>
                <div className="right">
                    <OrderSummary/>
                </div>
            </div>
        </div>
    )
}

export default Cart;