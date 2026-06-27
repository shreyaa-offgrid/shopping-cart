import { useContext, useState } from "react";
import "../styles/components/ProductModal.css"
import QuantitySelector from "./QuantitySelector";
import CartContext from "../CartContext";

export default function ProductModal({ product, onClose}) {
    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useContext(CartContext);
    const [added, setAdded] = useState(false);
    return (
        <div className="modal-overlay" onClick={onClose}>
            <dialog open onClick={(event)=>event.stopPropagation()}>
                <div className="left">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="right">
                    <button onClick={onClose}>X</button>
                    <h1>{product.title}</h1>
                    <p style={{textTransform:"capitalize"}}>
                        Category: {product.category}
                    </p>
                    <p>Product Description: {product.description}</p>
                    <p>Price: Rs {product.price*100}</p>
                    <div className="rating">
                        <p>Rating: &#9733; {product.rating.rate}</p>
                        <p className="count">({product.rating.count})</p>
                    </div>
                    {added && <p>Product Added to Cart!</p>}
                    <div className="buy-action">
                        <QuantitySelector 
                            text = {"Quantity: "}
                            quantity={quantity} 
                            setQuantity={setQuantity}
                        />
                        <button onClick={()=>{
                            addToCart(product, quantity);
                            setAdded(true);
                            setTimeout(()=>{
                                setAdded(false)
                            }, 800)
                        }}>Add to Cart</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}