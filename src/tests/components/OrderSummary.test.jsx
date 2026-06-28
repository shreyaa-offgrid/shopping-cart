import {screen, render, fireEvent} from "../utils";
import {expect, test, vi} from "vitest";
import OrderSummary from "../../components/OrderSummary";
import confetti from "canvas-confetti";

vi.mock("canvas-confetti",()=>({default: vi.fn()}));
//need to mock it or it being a browser animation
//library function will crash in test environment

const mockCartItems = [
    { id: 1, title: "Shirt", price: 5, quantity: 2 },   // 5 * 2 * 100 = 1000
    { id: 2, title: "Pants", price: 3, quantity: 1 },   // 3 * 1 * 100 = 300
]; 

test("renders the correct number of items", () => {
    render(<OrderSummary />, { cartItems: mockCartItems });

    expect(screen.getByText("3 item(s)")).toBeInTheDocument();
});

test("renders the correct cart value", () => {
    render(<OrderSummary />, { cartItems: mockCartItems });

    // appears twice: once in Item's Total, once in Order Total
    const totals = screen.getAllByText("Rs 1300");
    expect(totals).toHaveLength(2);
});

test("calls confetti when Checkout is clicked", () => {
    render(<OrderSummary />, { cartItems: mockCartItems });

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));

    expect(confetti).toHaveBeenCalledTimes(1);
});