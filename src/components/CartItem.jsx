import "../styles/components/CartItem.css"
import QuantitySelector from "./QuantitySelector"
import CartContext from "../CartContext";
import { useContext } from "react";

export default function CartItem({ id, image, title, price, quantity }) {
    const { removeFromCart, updateQuantity } = useContext(CartContext);
    return (
        <div className="detail-card">
            <img src={image} alt={title} />
            <div className="info">
                <p>{title}</p>
                <p>Rs {price * 100}</p>
            </div>
            <div className="update-actions">
                <QuantitySelector 
                    text="" 
                    quantity={quantity}
                    setQuantity={(newQty)=>updateQuantity(id, newQty)}
                />
                <button type="button" onClick={() => removeFromCart(id)}>Remove from cart</button>
            </div>
        </div>
    )
}