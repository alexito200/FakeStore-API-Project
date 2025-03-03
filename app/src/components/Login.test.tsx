import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import type { RootState } from "../redux/store";
import Login from "../components/Login";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setUser, clearUser } from "../redux/userSlice";
import { getUserProfile } from "../components/userService";
import { vi } from "vitest";
import { AnyAction } from "redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

vi.mock("../firebaseConfig", () => ({ auth: {} }));
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));
vi.mock("../components/userService", () => ({ getUserProfile: vi.fn() }));

const mockStore = configureStore<RootState, AnyAction>();

beforeAll(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});


describe("Login Component", () => {
    let store: MockStoreEnhanced<RootState, AnyAction>;

    beforeEach(() => {
        vi.resetAllMocks();
      
        store = mockStore({
          user: { user: null },
          cart: { items: [] },
        });
      
        vi.spyOn(store, "dispatch");
      });
      

  it("renders login form correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("updates email and password fields on user input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls login function and updates state on success", async () => {
    vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
      user: {
        uid: "123",
        email: "test@example.com",
        displayName: "Test User",
        emailVerified: true,
        isAnonymous: false,
        metadata: {
          creationTime: "2024-01-01T00:00:00Z",
          lastSignInTime: "2024-01-02T00:00:00Z",
        },
        providerData: [],
        refreshToken: "mock-refresh-token",
        tenantId: null,
        photoURL: null,
        phoneNumber: null,
        providerId: "firebase",
        getIdToken: vi.fn().mockResolvedValue("mock-token"),
        getIdTokenResult: vi.fn().mockResolvedValue({ token: "mock-token" }),
        delete: vi.fn().mockResolvedValue(undefined),
        reload: vi.fn().mockResolvedValue(undefined),        
        toJSON: vi.fn().mockReturnValue({}),
      },
      providerId: "password",
      operationType: "signIn",
    });
    
    
    
    vi.mocked(getUserProfile).mockResolvedValue({ fullName: "Test User", address: "123 Street" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, "test@example.com", "password123");
      expect(getUserProfile).toHaveBeenCalledWith("123");
      expect(store.dispatch).toHaveBeenCalledWith(setUser({ uid: "123", email: "test@example.com", fullName: "Test User", address: "123 Street" }));
    });
  });

  it("shows error message on login failure", async () => {
    vi.mocked(signInWithEmailAndPassword).mockRejectedValue(new Error("Invalid credentials"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await expect(screen.findByText("Invalid credentials")).resolves.toBeInTheDocument();
  });

  it("logs out user and clears state on logout button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(clearUser());
    });
  });
});
