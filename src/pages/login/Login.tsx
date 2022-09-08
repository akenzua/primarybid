import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type TokenProps = {
  token: string;
  setToken: (token: string) => void;
};

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useLocalStorage<TokenProps>("token", {} as TokenProps);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => setToken(result))
      .then(() => setIsAuthenticated(true))
      .catch((error) => console.log("error", error));

    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      const token: { token: string } = JSON.parse(
        localStorage.getItem("token") || "{}"
      );

      if (token.token) {
        setIsAuthenticated(true);
      }
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to="/categories" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <div className="d-grid">
        <p>username: mor_2314</p>
        <p>password: 83r5^_</p>
      </div>
    </form>
  );
}
