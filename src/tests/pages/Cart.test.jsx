import { screen, render } from "../utils";
import { expect, test, vi } from "vitest";
import Cart from "../../pages/Cart";

vi.mock("canvas-confetti", () => ({ default: vi.fn() }));
//this will intercept the import in ordersummary
const mockCartItems = [
    { id: 1, title: "Shirt", image: "shirt.jpg", price: 5, quantity: 2 },
    { id: 2, title: "Pants", image: "pants.jpg", price: 3, quantity: 1 },
];

test("renders empty cart UI when cart is empty", () => {
    render(<Cart />, { cartItems: [] });

    expect(screen.getByAltText(/empty shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop now/i })).toBeInTheDocument();
});

test("renders cart items when cart is not empty", () => {
    render(<Cart />, { cartItems: mockCartItems });

    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText("Pants")).toBeInTheDocument();
});

test("renders order summary when cart is not empty", () => {
    render(<Cart />, { cartItems: mockCartItems });

    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
});

test("does not render empty cart UI when cart has items", () => {
    render(<Cart />, { cartItems: mockCartItems });

    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();
});

test("does not render cart items when cart is empty", () => {
    render(<Cart />, { cartItems: [] });

    expect(screen.queryByText("Shirt")).not.toBeInTheDocument();
});