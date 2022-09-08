import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Login } from "./pages/login/Login";
import { Categories } from "./pages/categories/Categories";
import { Products } from "./pages/products/Products";
import { Navbar } from "./components/Navbar";

import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:category" element={<Products />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Container>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
