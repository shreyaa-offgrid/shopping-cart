import "../styles/Cart.css"
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useContext } from "react";
import CartContext from "../CartContext";
import emptyCartIcon from "../assets/empty-cart.png"
import { NavLink } from "react-router-dom";

function Cart() {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            <hr />
            {(isEmpty(cartItems))
                ?
                <div className="empty-cart-ui">
                    <img src={emptyCartIcon} alt="an empty shopping cart" />
                    <p>Uh oh, your cart is empty!</p>
                    <NavLink to="/shop"><button>Shop Now</button></NavLink>
                </div>
                :
                <div className="cart-main">
                    <div className="left">
                        {cartItems.map(
                            item => (<CartItem key={item.id} {...item} />)
                        )}
                    </div>
                    <div className="right">
                        <OrderSummary />
                    </div>
                </div>
            }
        </div>
    )
}
function isEmpty(cartItems) {
    return cartItems.length === 0;
}
export default Cart;