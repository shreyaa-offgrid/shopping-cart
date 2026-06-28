import {render} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartContext from "../../CartContext";

export function renderWithProviders(ui, {
    cartItems = [],
    removeFromCart = ()=>{},
    updateQuantity = ()=>{}
} = {}){
    return render(
        <CartContext value={{cartItems, removeFromCart, updateQuantity}}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </CartContext>
    )
}