import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../../components/Nav";
import { expect, test} from "vitest";
import CartContext from "../../CartContext";

//render Nav with the providers it needs
//cartItems will default to []
//any test can simulate a filled cart
function renderNav(cartItems = []) {
    return render(
        <CartContext value={{ cartItems }}>
            <MemoryRouter>
                <Nav />
            </MemoryRouter>
        </CartContext>
    )
}

test("renders home, shop, and cart navigation links", () => {
    renderNav();

    expect(
        screen.getByRole("link", { name: /home/i })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("link", { name: /shop/i })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("link", { name: /cart/i })
    ).toBeInTheDocument();
});

test("renders search input with placeholder text", () => {
    renderNav();

    expect(
        screen.getByPlaceholderText(/what are you looking for/i)
    ).toBeInTheDocument();
});

test("shows 0 when cart empty", () => {
    renderNav();
    //any element whose text matches 
    expect(screen.getByText("0")).toBeInTheDocument();
});

test("shows cart total correctly when cart is not empty", () => {
    renderNav( //4+2=6
        [
            { id: 1, name: "Shirt", quantity: 4 },
            { id: 2, name: "Pants", quantity: 2 },
        ]
    );
    expect(screen.getByText("6")).toBeInTheDocument();
})

test("updates cart total when quanitities are modified", () => {
    const { rerender } = renderNav([{ id: 1, name: "Shoes", quantity: 1 }]);
    expect(screen.getByText("1")).toBeInTheDocument();

    //user added more shoes
    rerender(
        <CartContext value={{ cartItems: [{ id: 1, name: "Shoes", quantity: 2 }] }}>
            <MemoryRouter>
                <Nav />
            </MemoryRouter>
        </CartContext>
    )
    expect(screen.getByText("2")).toBeInTheDocument();
})


//key concepts

//we need to wrap render in provider whenever a component uses it

//when we use a router component like Link or NavLink 
//it needs to know current url, memoryrouter stores this url state in memory

//rerender is returned by render()
//it is used to test ui changes