import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, type MockedFunction } from "vitest";
import UpdateProduct from "./UpdateProduct";

import { useParams } from "react-router-dom";
import {
  getDoc,
  deleteDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { updateProduct } from "../components/productService";

const mockedUseParams = useParams as MockedFunction<() => { id?: string }>;
const mockedGetDoc = getDoc as MockedFunction<typeof getDoc>;
const mockedDeleteDoc = deleteDoc as MockedFunction<typeof deleteDoc>;
const mockedUpdateProduct = updateProduct as MockedFunction<typeof updateProduct>;

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
  useNavigate: () => mockNavigate,
}));

const fakeDoc = vi.fn();

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    doc: (...args: unknown[]) => fakeDoc(...args),
    getDoc: vi.fn(),
    deleteDoc: vi.fn(),
  };
});

vi.mock("../components/productService", () => ({
  updateProduct: vi.fn(),
}));

global.alert = vi.fn();


function createFakeDocSnapshot(
  data: DocumentData,
  id: string
): QueryDocumentSnapshot<DocumentData, DocumentData> {
  return {
    exists: () => true,
    id,
    data: () => data,
  } as QueryDocumentSnapshot<DocumentData, DocumentData>;
}


const fakeProduct = {
  id: "123",
  name: "Test Product",
  price: 100,
  imageUrl: "http://example.com/image.png",
  category: "Test Category",
};


describe("UpdateProduct component", () => {
  const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state then fetches and displays product details", async () => {
    mockedUseParams.mockReturnValue({ id: "123" });

    mockedGetDoc.mockResolvedValue(
      createFakeDocSnapshot(
        {
          name: fakeProduct.name,
          price: fakeProduct.price,
          imageUrl: fakeProduct.imageUrl,
          category: fakeProduct.category,
        },
        fakeProduct.id
      )
    );

    render(<UpdateProduct />);

    expect(screen.getByText(/Loading product details/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByDisplayValue(fakeProduct.name)).toBeInTheDocument()
    );

    expect(screen.getByDisplayValue(fakeProduct.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeProduct.price.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeProduct.imageUrl)).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeProduct.category)).toBeInTheDocument();
  });

  it("handles missing product id by alerting and navigating home", async () => {
    mockedUseParams.mockReturnValue({});

    render(<UpdateProduct />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Product ID is missing");
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("updates product successfully when form is submitted", async () => {
    mockedUseParams.mockReturnValue({ id: "123" });

    mockedGetDoc.mockResolvedValue(
      createFakeDocSnapshot(
        {
          name: fakeProduct.name,
          price: fakeProduct.price,
          imageUrl: fakeProduct.imageUrl,
          category: fakeProduct.category,
        },
        fakeProduct.id
      )
    );

    mockedUpdateProduct.mockResolvedValue(true);

    render(<UpdateProduct />);

    await waitFor(() =>
      expect(screen.getByDisplayValue(fakeProduct.name)).toBeInTheDocument()
    );

    const nameInput = screen.getByDisplayValue(fakeProduct.name) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Updated Product" } });

    const updateBtn = screen.getByRole("button", { name: /Update Product/i });
    fireEvent.click(updateBtn);

    await waitFor(() => {
      expect(mockedUpdateProduct).toHaveBeenCalledWith("123", {
        name: "Updated Product",
        price: fakeProduct.price,
        imageUrl: fakeProduct.imageUrl,
        category: fakeProduct.category,
      });
      expect(alertSpy).toHaveBeenCalledWith("Product updated successfully!");
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("alerts if any field is missing when updating product", async () => {
    mockedUseParams.mockReturnValue({ id: "123" });

    mockedGetDoc.mockResolvedValue(
      createFakeDocSnapshot(
        {
          name: fakeProduct.name,
          price: fakeProduct.price,
          imageUrl: fakeProduct.imageUrl,
          category: fakeProduct.category,
        },
        fakeProduct.id
      )
    );

    render(<UpdateProduct />);

    await waitFor(() =>
      expect(screen.getByDisplayValue(fakeProduct.category)).toBeInTheDocument()
    );

    const categoryInput = screen.getByDisplayValue(fakeProduct.category) as HTMLInputElement;
    fireEvent.change(categoryInput, { target: { value: "" } });

    const updateBtn = screen.getByRole("button", { name: /Update Product/i });
    fireEvent.click(updateBtn);

    expect(alertSpy).toHaveBeenCalledWith("Please fill out all fields!");
  });

  it("handles error when updateProduct fails", async () => {
    mockedUseParams.mockReturnValue({ id: "123" });

    mockedGetDoc.mockResolvedValue(
      createFakeDocSnapshot(
        {
          name: fakeProduct.name,
          price: fakeProduct.price,
          imageUrl: fakeProduct.imageUrl,
          category: fakeProduct.category,
        },
        fakeProduct.id
      )
    );

    mockedUpdateProduct.mockRejectedValue(new Error("Update failed"));

    render(<UpdateProduct />);

    await waitFor(() =>
      expect(screen.getByDisplayValue(fakeProduct.name)).toBeInTheDocument()
    );

    const updateBtn = screen.getByRole("button", { name: /Update Product/i });
    fireEvent.click(updateBtn);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Failed to update product");
    });
  });

  it("navigates home after successful product deletion", async () => {
    mockedUseParams.mockReturnValue({ id: "123" });

    mockedGetDoc.mockResolvedValue(
      createFakeDocSnapshot(
        {
          name: fakeProduct.name,
          price: fakeProduct.price,
          imageUrl: fakeProduct.imageUrl,
          category: fakeProduct.category,
        },
        fakeProduct.id
      )
    );

    mockedDeleteDoc.mockResolvedValue(undefined);

    render(<UpdateProduct />);

    await waitFor(() =>
      expect(screen.getByDisplayValue(fakeProduct.name)).toBeInTheDocument()
    );

    const deleteBtn = screen.getByRole("button", { name: /Delete Product/i });
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("displays error message when deletion fails", async () => {
    mockedUseParams.mockReturnValue({ id: "123" });

    mockedGetDoc.mockResolvedValue(
      createFakeDocSnapshot(
        {
          name: fakeProduct.name,
          price: fakeProduct.price,
          imageUrl: fakeProduct.imageUrl,
          category: fakeProduct.category,
        },
        fakeProduct.id
      )
    );

    mockedDeleteDoc.mockRejectedValue(new Error("Delete failed"));

    render(<UpdateProduct />);

    await waitFor(() =>
      expect(screen.getByDisplayValue(fakeProduct.name)).toBeInTheDocument()
    );

    const deleteBtn = screen.getByRole("button", { name: /Delete Product/i });
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Error deleting product. Please try again./i)
      ).toBeInTheDocument();
    });
  });
});
