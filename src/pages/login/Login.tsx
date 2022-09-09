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
  const [token, setToken] = useLocalStorage<TokenProps>(
    "token",
    {} as TokenProps
  );
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // valid username and password
    // this is a simple validation
    // in production i would use a library like yup

    if (username === "" && password === "") {
      setIsValid(false);
      return;
    }

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
  }, [token, isAuthenticated, setIsAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to="/categories" />;
  }

  return (
    <form onSubmit={handleSubmit} aria-label="login-form">
      <h3>Sign In</h3>
      <div className="mb-3">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="form-control"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      {!isValid && <p>Please Enter username and password</p>}

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
