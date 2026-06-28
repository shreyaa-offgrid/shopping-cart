import { screen, render, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import ProductCard from "../../components/ProductCard";

const mockProps = {
    title: "Cool Shirt",
    price: 5,
    image: "shirt.jpg",
    rating: { rate: 4.5, count: 120 },
    onClick: vi.fn(),
};

test("renders the title, price, image and rating", () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByAltText("Cool Shirt")).toBeInTheDocument();
    expect(screen.getByText("Cool Shirt")).toBeInTheDocument();
    expect(screen.getByText("Rs 500")).toBeInTheDocument();
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
    expect(screen.getByText(/120/)).toBeInTheDocument();
});

test("calls onClick when the card is clicked", () => {
    render(<ProductCard {...mockProps} />);

    fireEvent.click(screen.getByText("Cool Shirt"));

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
});