import "../styles/components/OrderSummary.css"
import { useContext } from "react"
import CartContext from "../CartContext.js"
import voucherIcon from "../assets/voucher.svg";
import giftIcon from "../assets/gift.svg"
import confetti from "canvas-confetti";

export default function OrderSummary() {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="summary-container">
            <div className="summary-card">
                <div className="heading">
                    <h2>Order summary</h2>
                    <h2>{getTotalItems(cartItems)} item(s)</h2>
                </div>
                <hr />
                <div className="item-total">
                    <p>Item's Total</p>
                    <p>Rs {getCartValue(cartItems)}</p>
                </div>
                <div className="shipping">
                    <p>Shipping</p>
                    <p><strike>Rs 120</strike></p>
                </div>
                <hr />
                <div className="order-total">
                    <p>Order Total</p>
                    <p>Rs {getCartValue(cartItems)}</p>
                </div>
            </div>
            <div className="voucher">
                <img src={voucherIcon} alt="Discount ticket icon" />
                <p>Voucher</p>
                <p className="chevron">&#8250;</p>
            </div>
            <div className="gift-option">
                <img src={giftIcon} alt="Gift box with bow, top view" />
                <p>Gift Option</p>
                <p className="chevron">&#8250;</p>
            </div>
            <p className="shipping">Eligible for free shipping!</p>
            <button onClick={handleCheckout} type="button">Checkout</button>
        </div>
    )
}

function getTotalItems(cartItems) {
    return cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    );
}

function getCartValue(cartItems) {
    return cartItems.reduce(
        (total, item) =>
            total + item.quantity * item.price * 100, 0
    );
}

function handleCheckout() {
    confetti({
        particleCount: 100,
        spread: 150,
        origin: { y: 0.7 }
    });
}