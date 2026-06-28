import { screen, render, fireEvent, waitFor } from "../utils";
import { expect, test, vi, beforeEach, afterEach } from "vitest";
import Shop from "../../pages/Shop";

vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

const mockProducts = [
    { id: 1, title: "Shirt", price: 5, image: "shirt.jpg", rating: { rate: 4.5, count: 120 }, category: "men's clothing", description: "A shirt." },
    { id: 2, title: "Pants", price: 3, image: "pants.jpg", rating: { rate: 4.0, count: 80  }, category: "men's clothing", description: "Pants."  },
];

//we must mock fetch so that real api calls are not made
beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
    vi.unstubAllGlobals();
});

function mockFetchSuccess() {
    fetch.mockResolvedValueOnce({
        json: async () => mockProducts,
    });
}

function mockFetchFailure() {
    fetch.mockRejectedValueOnce(new Error("Network error"));
}

test("shows a loader while fetching products", () => {
    mockFetchSuccess();
    render(<Shop />);

    // The loader renders immediately before the fetch resolves
    expect(document.querySelector(".loading")).toBeInTheDocument();
});

test("renders products after successful fetch", async () => {
    mockFetchSuccess();
    render(<Shop />);

    await waitFor(() => {
        expect(screen.getByText("Shirt")).toBeInTheDocument();
        expect(screen.getByText("Pants")).toBeInTheDocument();
    });
});

test("shows error message when fetch fails", async () => {
    mockFetchFailure();
    render(<Shop />);

    await waitFor(() => {
        expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
    });
});

test("retry button re-fetches products after an error", async () => {
    mockFetchFailure();
    render(<Shop />);

    await waitFor(() => screen.getByRole("button", { name: /retry/i }));

    mockFetchSuccess();
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    await waitFor(() => {
        expect(screen.getByText("Shirt")).toBeInTheDocument();
    });
});

test("opens modal when a product card is clicked", async () => {
    mockFetchSuccess();
    render(<Shop />);

    await waitFor(() => screen.getByText("Shirt"));
    fireEvent.click(screen.getByText("Shirt"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("closes modal when the X button is clicked", async () => {
    mockFetchSuccess();
    render(<Shop />);

    await waitFor(() => screen.getByText("Shirt"));
    fireEvent.click(screen.getByText("Shirt"));
    fireEvent.click(screen.getByRole("button", { name: "X" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
// beforeEach/afterEach — 
// the fetch mock is set up fresh before each test 
// and torn down after, so tests don't interfere 
// with each other.

//waitFor — 
// since loadProducts is async
// the DOM doesn't update instantly