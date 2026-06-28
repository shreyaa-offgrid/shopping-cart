import { screen, render } from "../utils";
import { expect, test } from "vitest";
import Home from "../../pages/Home";

test("renders the hero image", () => {
    render(<Home />);
    expect(screen.getByAltText(/fashion model/i)).toBeInTheDocument();
});

test("renders the hero text content", () => {
    render(<Home />);
    expect(screen.getByText(/discover more/i)).toBeInTheDocument();
    expect(screen.getByText(/thoughtfully curated/i)).toBeInTheDocument();
});

test("renders a link to the shop page", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /shop collection/i })).toBeInTheDocument();
});

test("shop link points to /shop", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /shop collection/i })).toHaveAttribute("href", "/shop");
});