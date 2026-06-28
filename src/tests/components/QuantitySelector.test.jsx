import  {screen, render, fireEvent} from "../utils";
import {expect, test, vi} from "vitest";
import QuantitySelector from "../../components/QuantitySelector";

function renderSelector(quantity, setQuantity){
    render(
        <QuantitySelector 
            text="Qty" 
            quantity={quantity}
            setQuantity={setQuantity}
        />
    )
}

test("renders current quantity in input", ()=>{
    renderSelector(3, vi.fn());

    expect(screen.getByRole("textbox")).toHaveValue("3");
});

test("+ button calls setQuantity with quantity + 1", () => {
    const setQuantity = vi.fn();
    renderSelector(3, setQuantity);

    fireEvent.click(screen.getByRole("button", { name: "+" }));

    expect(setQuantity).toHaveBeenCalledWith(4);
});

test("- button calls setQuantity with quantity - 1", () => {
    const setQuantity = vi.fn();
    renderSelector(3, setQuantity);

    fireEvent.click(screen.getByRole("button", { name: "-" }));

    expect(setQuantity).toHaveBeenCalledWith(2);
});

test("- button is disabled when quantity is 1", () => {
    renderSelector(1, vi.fn());
    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
});

test("- button does not go below 1", () => {
    const setQuantity = vi.fn();
    renderSelector(1, setQuantity);

    fireEvent.click(screen.getByRole("button", { name: "-" }));

    expect(setQuantity).toHaveBeenCalledTimes(0);
});

test("typing a non-numeric value does not call setQuantity", () => {
    const setQuantity = vi.fn();
    renderSelector(1, setQuantity);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } });

    expect(setQuantity).not.toHaveBeenCalled();
});

test("blurring the input with empty value resets quantity to 1", () => {
    const setQuantity = vi.fn();
    renderSelector("", setQuantity);

    fireEvent.blur(screen.getByRole("textbox"));

    expect(setQuantity).toHaveBeenCalledWith(1);
});