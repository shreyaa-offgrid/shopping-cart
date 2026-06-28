import { screen, render, fireEvent, act } from "../utils";
import { expect, test, vi } from "vitest";
import ProductModal from "../../components/ProductModal";

const mockProduct = {
    title: "Cool Shirt",
    image: "shirt.jpg",
    category: "men's clothing",
    description: "A very cool shirt.",
    price: 5,
    rating: { rate: 4.5, count: 120 },
};

test("renders product details correctly", () => {
    render(<ProductModal product={mockProduct} onClose={vi.fn()} />);

    expect(screen.getByAltText("Cool Shirt")).toBeInTheDocument();
    expect(screen.getByText("Cool Shirt")).toBeInTheDocument();
    expect(screen.getByText(/men's clothing/i)).toBeInTheDocument();
    expect(screen.getByText(/A very cool shirt/i)).toBeInTheDocument();
    expect(screen.getByText(/Rs 500/)).toBeInTheDocument();
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
    expect(screen.getByText(/120/)).toBeInTheDocument();
});

test("calls onClose when the X button is clicked", () => {
    const onClose = vi.fn();
    render(<ProductModal product={mockProduct} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "X" }));

    expect(onClose).toHaveBeenCalledTimes(1);
});

test("calls onClose when the overlay is clicked", () => {
    const onClose = vi.fn();
    render(<ProductModal product={mockProduct} onClose={onClose} />);

    fireEvent.click(screen.getByTestId("overlay"));

    expect(onClose).toHaveBeenCalledTimes(1);
});

test("clicking inside the dialog does not close the modal", () => {
    const onClose = vi.fn();
    render(<ProductModal product={mockProduct} onClose={onClose} />);

    fireEvent.click(screen.getByRole("dialog"));

    expect(onClose).not.toHaveBeenCalled();
});

test("calls addToCart with the product and quantity when Add to Cart is clicked", () => {
    const addToCart = vi.fn();
    render(<ProductModal product={mockProduct} onClose={vi.fn()} />, { addToCart });

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(addToCart).toHaveBeenCalledWith(mockProduct, 1);
});

test("shows confirmation message after adding to cart, then hides it", async () => {
    vi.useFakeTimers();
    render(<ProductModal product={mockProduct} onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(screen.getByText(/product added to cart/i)).toBeInTheDocument();

    await act(async () => vi.advanceTimersByTime(800));
    expect(screen.queryByText(/product added to cart/i)).not.toBeInTheDocument();
    //query by test doesnt throw error if something is gone
    vi.useRealTimers();  //imp, so that fake timers dont leak into other tests
});