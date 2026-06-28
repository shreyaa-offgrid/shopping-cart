import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Footer from "../../components/Footer";

test("renders the author credit", () => {
    render(<Footer />);
    expect(screen.getByText(/made with/i)).toBeInTheDocument();
});

test("renders the current year in the copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
});

test("renders a link to FakeStoreAPI with the correct href", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /fakestoreapi/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://fakestoreapi.com/");
});
