import {render} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartContext from "../../CartContext";

export function renderWithProviders(ui, {
    cartItems = [],
    removeFromCart = ()=>{},
    updateQuantity = ()=>{},
    addToCart = ()=>{}
} = {}){
    return render(
        <CartContext value={
            {
                cartItems, removeFromCart,
                 updateQuantity, addToCart
            }}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </CartContext>
    )
}