import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import Home from "./Home";
import ShoppingCart from "./ShoppingCart";
import { store } from "../redux/store";
import type { Product } from "../types/types";

vi.mock("../components/productService", () => ({
  fetchProducts: vi.fn().mockResolvedValue([
    {
      id: "p1",
      name: "Product 1",
      price: 20,
      imageUrl: "http://example.com/p1.png",
      category: "electronics",
    },
  ]),
  saveOrder: vi.fn(),
  updateProduct: vi.fn(),
}));

vi.mock("./ProductCard", () => ({
    default: ({
      product,
      onAddToCart,
    }: {
      product: Product;
      onAddToCart: (p: Product) => void;
    }) => (
      <div data-testid={`product-${product.id}`}>
        <p>{product.name}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    ),
  }));


describe("Shopping Cart Integration", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("updates the cart when a product is added and displays it in the ShoppingCart", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const productName = await screen.findByText("Product 1");
    expect(productName).toBeInTheDocument();

    const addToCartBtn = screen.getByText("Add to Cart");
    fireEvent.click(addToCartBtn);

    const cartBadge = await screen.findByText("1");
    expect(cartBadge).toBeInTheDocument();

    const cartLink = screen.getByRole("link", { name: "1" });
    fireEvent.click(cartLink);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    expect(screen.getByText(/Total Items: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Price: \$20\.00/i)).toBeInTheDocument();
  });
});
