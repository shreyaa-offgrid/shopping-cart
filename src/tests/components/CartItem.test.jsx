import { screen, render, fireEvent } from "../utils"
import { expect, test, vi } from "vitest";
import CartItem from "../../components/CartItem";

const mockProps = {
    id: 1,
    image: "shirt.jpg",
    title: "Cool shirt",
    price: 5,
    quantity: 2 //5*2*100 = 500
}

test("renders item image, title and price", () => {
    render(<CartItem {...mockProps} />);

    expect(
        screen.getByAltText("Cool shirt")
    ).toBeInTheDocument();
    expect(
        screen.getByText("Cool shirt")
    ).toBeInTheDocument();
    expect(
        screen.getByText("Rs 500")
    ).toBeInTheDocument();
})

test("removes item with correct item id when Remove is clicked", () => {
    const removeFromCart = vi.fn();
    render(<CartItem {...mockProps} />, { removeFromCart });

    fireEvent.click(
        screen.getByRole("button", { name: /remove from cart/i })
    );

    expect(removeFromCart).toHaveBeenCalledWith(1);
    expect(removeFromCart).toHaveBeenCalledTimes(1);
});

test("calls updateQuantity when + clicked", ()=>{
    const updateQuantity = vi.fn(); //mocking call back
    render(<CartItem {...mockProps}/>, {updateQuantity});

    fireEvent.click(
        screen.getByRole("button", {name: "+"})
    );

    expect(updateQuantity).toHaveBeenCalledWith(1,3);
});

test("calls updateQuantity when - is clicked", () => {
    const updateQuantity = vi.fn();
    render(<CartItem {...mockProps} />, { updateQuantity });

    fireEvent.click(screen.getByRole("button", { name: "-" }));

    expect(updateQuantity).toHaveBeenCalledWith(1, 1); // id=1, quantity 2→1
});